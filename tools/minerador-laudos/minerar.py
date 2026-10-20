#!/usr/bin/env python3
"""Minerador de modelos de laudos laboratoriais.

Subcomandos:
  baixar <urls.txt>     baixa as URLs para amostras/ (dedup por sha256)
  catalogar <pasta>     gera catalogo.jsonl (laboratório, formato, exames, dados pessoais)
  anonimizar <pasta>    gera anonimizados/<arquivo>.json com as linhas sem dados pessoais
  resumo                tabela por laboratório/formato e laboratórios que ainda faltam

Dependências: pypdf (obrigatória para PDF), pillow (opcional, só para dimensões de imagem).
"""
import hashlib
import json
import re
import sys
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

BASE = Path(__file__).resolve().parent
AMOSTRAS = BASE / "amostras"
ANONIMIZADOS = BASE / "anonimizados"
CATALOGO = BASE / "catalogo.jsonl"

IMAGEM_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".tif", ".tiff"}
TEXTO_EXT = {".txt", ".json", ".md", ".csv"}

# Ordem importa: o primeiro que casar vence (laboratório de apoio aparece depois do principal).
LABORATORIOS = [
    ("Fleury", r"\bfleury\b"),
    ("a+ Medicina Diagnóstica", r"\ba\+\s*medicina|\blabs\s*a\+|amaissaude"),
    ("Weinmann", r"\bweinmann\b"),
    ("Alliança", r"\ballian[çc]a\b"),
    ("DB Diagnósticos", r"\bdb\s+diagn[óo]sticos|diagn[óo]sticos\s+do\s+brasil"),
    ("Delboni", r"\bdelboni\b"),
    ("Lavoisier", r"\blavoisier\b"),
    ("Sérgio Franco", r"s[ée]rgio\s+franco"),
    ("Alta Diagnósticos", r"\balta\s+(diagn[óo]sticos|excel[êe]ncia)"),
    ("Sabin", r"\bsabin\b"),
    ("Tommasi", r"\btommasi\b"),
    ("Biosul", r"\bbiosul\b"),
    ("Unilab", r"\bunilab\b"),
    ("LACEN", r"\blacen\b|\bgal\b.*\bsus\b"),
    ("Santa Casa", r"santa\s+casa"),
    ("Hospital das Clínicas", r"hospital\s+das\s+cl[íi]nicas|\bhcfm"),
    ("Dasa", r"\bdasa\b|diagn[óo]sticos\s+da\s+am[ée]rica"),
    ("Unimed", r"\bunimed\b"),
    ("Hermes Pardini", r"\bpardini\b"),
]
FALTANDO_PRIORITARIOS = [
    "Fleury", "a+ Medicina Diagnóstica", "Weinmann", "Alliança", "DB Diagnósticos",
    "Delboni", "Sérgio Franco", "Alta Diagnósticos", "Tommasi", "LACEN",
    "Santa Casa", "Hospital das Clínicas",
]

EXAMES = {
    "hemograma": r"hemograma|eritrograma|leucograma|hemoglobina|plaquetas",
    "bioquimica": r"creatinina|ur[ée]ia|glicose|glicemia|s[óo]dio|pot[áa]ssio",
    "lipidios": r"colesterol|triglic[ée]r|\bhdl\b|\bldl\b",
    "hepatico": r"\btgo\b|\btgp\b|\bast\b|\balt\b|bilirrubina|gama[\s-]?gt|fosfatase",
    "tireoide": r"\btsh\b|t4\s*livre|\bt3\b",
    "coagulacao": r"\btap\b|\binr\b|ttpa|protrombina|fibrinog",
    "urina": r"urina|\beas\b|sedimentoscopia|urocultura",
    "glicada": r"glicada|hba1c",
    "inflamatorio": r"\bpcr\b|prote[íi]na\s+c\s+reativa|\bvhs\b",
    "vitaminas_ferro": r"ferritina|ferro\s+s[ée]rico|vitamina\s+(d|b12)|[áa]cido\s+f[óo]lico",
    "gasometria": r"gasometria|\bpco2\b|\bpo2\b|bicarbonato",
}

# O valor depois destes rótulos é trocado por ANONIMO.
# Fortes: aceitos mesmo sem ":" ("Nome  FULANO  Idade"); fracos: só com ":" para não
# apagar texto comum do laudo ("os resultados", "código do exame").
ROTULOS_PII_FORTES = (
    r"paciente|nome(\s+social)?|cpf|data\s+(de\s+)?nasc(imento)?|nascimento"
    r"|solicitante|m[ée]dico(\s+solicitante)?(\s+dr\(a\)\.?)?|dr\(a\)\.?|requisitante|conv[êe]nio"
)
ROTULOS_PII_FRACOS = (
    r"rg|documento|dn|dra?\.?|atendimento|prontu[áa]rio|c[óo]digo|pedido|ordem\s+de\s+servi[çc]o"
    r"|cart[ãa]o|matr[íi]cula|endere[çc]o|telefone|fone|celular|e-?mail|c[ée]dula|passaporte|fap|carteirinha"
)
RE_ROTULO_PII = re.compile(
    rf"(?i)(?<![\w/])(?:(?:{ROTULOS_PII_FORTES})(?:[ \t]*[:.]+[ \t]*|[ \t]{{2,}})"
    rf"|(?:{ROTULOS_PII_FRACOS})[ \t]*[:.]*[ \t]*:[ \t]*)"
)
# Onde termina o valor de um rótulo: outro rótulo do cabeçalho ("Idade", "Sexo/Idade:", "Código ...").
RE_FIM_VALOR = re.compile(
    r"(?i)[ \t]{2,}(?=(idade|sexo|c[óo]digo|data|origem|entrada|entrega|destino|conv[êe]nio|unidade)\b)"
    r"|[ \t]+(?=[A-ZÀ-Ýa-zà-ÿ/()]+[ \t]*:)"
)
# Assinatura do profissional: "assinado eletronicamente por: Dra. FULANA - CRBM 123"
RE_ASSINATURA = re.compile(
    r"(?i)((?:(?:assinad[oa]|conferid[oa]|liberad[oa]|validad[oa]).{0,40}?por|resp(?:ons[áa]vel)?\.?[ \t]*t[ée]c(?:nic[oa])?\.?)[ \t]*:?[ \t]*)"
    r"(.+?)(?=[ \t]*[-–—][ \t]*CR[A-Z]{1,3}\b|$)"
)
# Nome depois de título: "Dr. FULANO DE TAL", "Dra. Fulana Tal"
RE_TITULO_NOME = re.compile(
    r"\b((?i:dra?|dr\(a\))\.?[ \t]+)([A-ZÀ-Ý][A-Za-zÀ-ÿ'.]+(?: (?:d[aeo]s?|D[AEO]S?|[A-ZÀ-Ý][A-Za-zÀ-ÿ'.]+))*)"
)
# Palavras comuns que aparecem depois de rótulos no corpo do laudo e não são nomes.
PALAVRAS_COMUNS = {
    "ANONIMO", "SOCIAL", "MASCULINO", "FEMININO", "PARTICULAR", "RESULTADO", "RESULTADOS", "ANOS",
    "MESES", "RISCO", "SEGUNDOS", "INTERPRETAÇÃO", "INTERPRETACAO", "MÉDICO", "MEDICO", "SOLICITANTE",
    "NASCIMENTO", "ANTERIORES", "ABAIXO", "ACIMA", "IDADE", "SEXO", "DATA", "CÓDIGO", "CODIGO",
    "CRBM", "CRF", "CRM", "ADULTOS", "PRONTUÁRIO", "PRONTUARIO",
}
RE_CPF = re.compile(r"\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b")
RE_TELEFONE = re.compile(r"\(?\b\d{2}\)?\s?9?\d{4}[-\s]?\d{4}\b")
# Nome em maiúsculas logo após "Paciente:"/"Nome:" (sem atravessar linha; ANONIMO não conta).
RE_NOME_PACIENTE = re.compile(r"\b(?i:paciente|nome)\b[ \t]*[:.]+[ \t]*(?!ANONIMO\b)([A-ZÀ-Ý][A-ZÀ-Ý']+([ \t]+[A-ZÀ-Ý][A-ZÀ-Ý']+)+)\b")
RE_DATA_NASC = re.compile(r"(?i)(data[ \t]+(de[ \t]+)?nasc\w*|\bdn\b|nascimento)[ \t]*[:.]*[ \t]*\d{2}/\d{2}/\d{2,4}")
RE_DATA = re.compile(r"\b(\d{2})/(\d{2})/(\d{2,4})\b")


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for bloco in iter(lambda: f.read(1 << 16), b""):
            h.update(bloco)
    return h.hexdigest()


def extrair_paginas(path: Path) -> list[list[str]]:
    """Linhas de texto por página. PDF via pypdf (modo layout quando disponível)."""
    suf = path.suffix.lower()
    if suf == ".pdf":
        from pypdf import PdfReader

        paginas = []
        for pagina in PdfReader(str(path)).pages:
            try:
                texto = pagina.extract_text(extraction_mode="layout")
            except TypeError:  # pypdf antigo
                texto = pagina.extract_text()
            linhas = [re.sub(r"\s{2,}", "  ", l).strip() for l in (texto or "").splitlines()]
            paginas.append([l for l in linhas if l])
        return paginas
    if suf in TEXTO_EXT:
        texto = path.read_text(encoding="utf-8", errors="replace")
        if suf == ".json":
            try:
                dados = json.loads(texto)
                if isinstance(dados, dict) and "pages" in dados:
                    return [p.get("lines", []) for p in dados["pages"]]
            except json.JSONDecodeError:
                pass
        return [[l.strip() for l in texto.splitlines() if l.strip()]]
    return []


def detectar_formato(path: Path, paginas: list[list[str]]) -> str:
    suf = path.suffix.lower()
    if suf in IMAGEM_EXT:
        return "imagem"
    if suf in TEXTO_EXT:
        return "texto"
    if suf == ".pdf":
        chars = sum(len(l) for p in paginas for l in p)
        return "pdf-texto" if paginas and chars / len(paginas) >= 80 else "pdf-escaneado"
    return "outro"


def detectar_laboratorio(texto: str, nome_arquivo: str) -> str:
    """Laboratório mais citado; menções no nome do arquivo e no cabeçalho valem mais.

    Evita confundir o emissor com um laboratório de apoio ou uma citação solta no rodapé.
    """
    linhas = texto.lower().splitlines()
    cabecalho = "\n".join(linhas[:15])
    corpo = "\n".join(linhas)
    melhor, melhor_pontos = "desconhecido", 0
    for nome, padrao in LABORATORIOS:
        pontos = (
            len(re.findall(padrao, corpo))
            + 3 * len(re.findall(padrao, cabecalho))
            + 5 * len(re.findall(padrao, nome_arquivo.lower()))
        )
        if pontos > melhor_pontos:
            melhor, melhor_pontos = nome, pontos
    return melhor


def detectar_pii(texto: str) -> bool:
    return bool(RE_CPF.search(texto) or RE_NOME_PACIENTE.search(texto) or RE_DATA_NASC.search(texto))


def data_coleta(texto: str) -> str | None:
    m = re.search(r"(?i)(coleta|colhido|data\s+atend|entrada|recebimento)[^\d]{0,40}(\d{2}/\d{2}/\d{2,4})", texto)
    return m.group(2) if m else None


def anonimizar_linha(linha: str) -> str:
    linha = RE_CPF.sub("000.000.000-00", linha)
    linha = RE_TELEFONE.sub("(00) 0000-0000", linha)
    # "Rótulo: valor  Outro rótulo: valor" -> troca cada valor até o próximo rótulo conhecido
    pos = 0
    saida = []
    for m in RE_ROTULO_PII.finditer(linha):
        if m.start() < pos:
            continue
        saida.append(linha[pos:m.end()])
        fins = [x.start() for x in (RE_ROTULO_PII.search(linha, m.end()), RE_FIM_VALOR.search(linha, m.end())) if x]
        fim = min(fins) if fins else len(linha)
        valor = linha[m.end():fim]
        saida.append("ANONIMO" if valor.strip() else valor)
        pos = fim
    saida.append(linha[pos:])
    linha = "".join(saida).strip()
    linha = RE_ASSINATURA.sub(lambda m: m.group(1) + "ANONIMO", linha)
    return RE_TITULO_NOME.sub(lambda m: m.group(0) if m.group(2) == "ANONIMO" else m.group(1) + "ANONIMO", linha)


def nomes_do_original(linhas: list[str]) -> set[str]:
    """Palavras dos valores de rótulos pessoais e assinaturas, para conferir a anonimização."""
    valores = []
    for linha in linhas:
        for m in RE_ROTULO_PII.finditer(linha):
            fins = [x.start() for x in (RE_ROTULO_PII.search(linha, m.end()), RE_FIM_VALOR.search(linha, m.end())) if x]
            valores.append(linha[m.end():min(fins) if fins else len(linha)])
        valores += [m.group(2) for m in RE_ASSINATURA.finditer(linha)]
        valores += [m.group(2) for m in RE_TITULO_NOME.finditer(linha)]
    # Nomes são palavras com inicial maiúscula num valor curto.
    palavras = {p.upper() for v in valores if len(v) <= 60 for p in re.findall(r"\b[A-ZÀ-Ý][A-Za-zÀ-ÿ]{3,}", v)}
    return palavras - PALAVRAS_COMUNS


def cmd_baixar(arquivo_urls: str) -> None:
    AMOSTRAS.mkdir(exist_ok=True)
    origens = AMOSTRAS / "_origens.jsonl"
    vistos = {json.loads(l)["sha256"] for l in origens.read_text().splitlines()} if origens.exists() else set()
    comentario = ""
    for linha in Path(arquivo_urls).read_text(encoding="utf-8").splitlines():
        linha = linha.strip()
        if not linha:
            continue
        if linha.startswith("#"):
            comentario = linha.lstrip("# ").strip()
            continue
        try:
            req = urllib.request.Request(linha, headers={"User-Agent": "Mozilla/5.0 minerador-laudos"})
            with urllib.request.urlopen(req, timeout=60) as resp:
                dados = resp.read()
                tipo = resp.headers.get("Content-Type", "")
        except Exception as e:  # noqa: BLE001 - seguimos para a próxima URL
            print(f"ERRO  {linha}  ({e})")
            continue
        h = hashlib.sha256(dados).hexdigest()
        if h in vistos:
            print(f"DUPL  {linha}")
            continue
        ext = Path(linha.split("?")[0]).suffix.lower()
        if ext not in IMAGEM_EXT | TEXTO_EXT | {".pdf"}:
            ext = ".pdf" if "pdf" in tipo else ".jpg" if "jpeg" in tipo else ".png" if "png" in tipo else ".bin"
        destino = AMOSTRAS / f"{h[:12]}{ext}"
        destino.write_bytes(dados)
        vistos.add(h)
        with origens.open("a", encoding="utf-8") as f:
            f.write(json.dumps({"arquivo": destino.name, "url": linha, "nota": comentario, "sha256": h}, ensure_ascii=False) + "\n")
        print(f"OK    {destino.name}  <- {linha}")


def iterar_arquivos(pasta: str):
    for p in sorted(Path(pasta).rglob("*")):
        if p.is_file() and not p.name.startswith("_") and p.suffix.lower() in IMAGEM_EXT | TEXTO_EXT | {".pdf"}:
            yield p


def cmd_catalogar(pasta: str) -> None:
    origens = {}
    arq_origens = Path(pasta) / "_origens.jsonl"
    if arq_origens.exists():
        for l in arq_origens.read_text(encoding="utf-8").splitlines():
            o = json.loads(l)
            origens[o["arquivo"]] = o
    vistos = set()
    registros = []
    for p in iterar_arquivos(pasta):
        h = sha256(p)
        if h in vistos:
            continue
        vistos.add(h)
        try:
            paginas = extrair_paginas(p)
        except Exception as e:  # noqa: BLE001 - PDF corrompido não derruba o catálogo
            print(f"ERRO ao ler {p.name}: {e}")
            paginas = []
        texto = "\n".join(l for pg in paginas for l in pg)
        registros.append({
            "arquivo": str(p.relative_to(BASE)) if p.is_relative_to(BASE) else str(p),
            "sha256": h,
            "formato": detectar_formato(p, paginas),
            "laboratorio": detectar_laboratorio(texto, p.name),
            "paginas": len(paginas) or None,
            "exames": [nome for nome, padrao in EXAMES.items() if re.search(padrao, texto, re.I)],
            "data_coleta": data_coleta(texto),
            "tem_dados_pessoais": detectar_pii(texto) if texto else None,
            "origem": origens.get(p.name, {}).get("url"),
            "nota": origens.get(p.name, {}).get("nota"),
        })
    with CATALOGO.open("w", encoding="utf-8") as f:
        for r in registros:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"{len(registros)} arquivos catalogados em {CATALOGO.name}")


def cmd_anonimizar(pasta: str) -> None:
    ANONIMIZADOS.mkdir(exist_ok=True)
    feitos = 0
    for p in iterar_arquivos(pasta):
        if p.suffix.lower() in IMAGEM_EXT:
            print(f"PULA  {p.name} (imagem: anonimizar manualmente)")
            continue
        paginas = extrair_paginas(p)
        if not any(paginas):
            print(f"PULA  {p.name} (sem texto: provavelmente escaneado)")
            continue
        saida = {
            "fonte": p.name,
            "laboratorio": detectar_laboratorio("\n".join(l for pg in paginas for l in pg), p.name),
            "aviso": "Anonimização automática: revise antes de versionar.",
            "pages": [{"page": i + 1, "lines": [anonimizar_linha(l) for l in pg]} for i, pg in enumerate(paginas)],
        }
        restante = "\n".join(l for pg in saida["pages"] for l in pg["lines"])
        vazados = [n for n in nomes_do_original([l for pg in paginas for l in pg]) if re.search(rf"\b{re.escape(n)}\b", restante.upper())]
        if detectar_pii(restante) or vazados:
            print(f"ATENÇÃO {p.name}: ainda parece ter dados pessoais ({len(vazados)} palavras de nomes), revise o JSON")
        destino = ANONIMIZADOS / f"{p.stem}.json"
        destino.write_text(json.dumps(saida, ensure_ascii=False, indent=1), encoding="utf-8")
        feitos += 1
        print(f"OK    {destino.name}")
    print(f"{feitos} fixtures anonimizadas em {ANONIMIZADOS.name}/")


def cmd_resumo() -> None:
    if not CATALOGO.exists():
        sys.exit("Rode primeiro: python minerar.py catalogar amostras/")
    registros = [json.loads(l) for l in CATALOGO.read_text(encoding="utf-8").splitlines()]
    tabela = defaultdict(Counter)
    pii = Counter()
    for r in registros:
        tabela[r["laboratorio"]][r["formato"]] += 1
        pii[r["laboratorio"]] += bool(r["tem_dados_pessoais"])
    formatos = sorted({f for c in tabela.values() for f in c})
    print("| Laboratório | " + " | ".join(formatos) + " | Total | Com dados pessoais |")
    print("|---|" + "---|" * (len(formatos) + 2))
    for lab in sorted(tabela, key=lambda k: -sum(tabela[k].values())):
        c = tabela[lab]
        print(f"| {lab} | " + " | ".join(str(c.get(f, 0)) for f in formatos) + f" | {sum(c.values())} | {pii[lab]} |")
    faltando = [lab for lab in FALTANDO_PRIORITARIOS if lab not in tabela]
    print(f"\nTotal: {len(registros)} arquivos, {len(tabela)} laboratórios")
    print("Ainda faltam: " + (", ".join(faltando) if faltando else "nenhum dos prioritários"))


def main() -> None:
    if len(sys.argv) < 2 or sys.argv[1] not in {"baixar", "catalogar", "anonimizar", "resumo"}:
        sys.exit(__doc__)
    cmd, args = sys.argv[1], sys.argv[2:]
    if cmd == "resumo":
        cmd_resumo()
    elif not args:
        sys.exit(f"Uso: python minerar.py {cmd} <{'urls.txt' if cmd == 'baixar' else 'pasta'}>")
    else:
        {"baixar": cmd_baixar, "catalogar": cmd_catalogar, "anonimizar": cmd_anonimizar}[cmd](args[0])


if __name__ == "__main__":
    main()
