"""Manual de Dermatologia (HTML) -> JSON por capítulo + imagens principais.

Uso (na raiz do repositório):
  python3 tools/dermatologia/convert.py <manual.html> src/dermatologia public/derm
Ignora questões (quiz) e o simulado; mantém todo o texto clínico.
"""
import base64, json, os, re, sys
from bs4 import BeautifulSoup, NavigableString, Tag

src, out_src, out_pub = sys.argv[1:4]
raw = open(src, encoding='utf-8').read()

# Imagens: window.__IMG = {"chave": "data:image/webp;base64,..."}
m = re.search(r'window\.__IMG\s*=\s*(\{.*?\})\s*;?\s*</script>', raw, re.S)
IMG = json.loads(m.group(1))
soup = BeautifulSoup(re.sub(r'window\.__IMG\s*=\s*\{.*?\}\s*;?(?=\s*</script>)', '', raw, flags=re.S), 'html.parser')

INLINE_OK = {'strong', 'b', 'em', 'i', 'sup', 'sub', 'br', 'u', 'small', 'mark', 'code', 'abbr', 'q', 's'}


def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')


def inline(node):
    """HTML inline seguro: só formatação + <dfn title> (definição do glossário)."""
    out = []
    for c in node.children:
        if isinstance(c, NavigableString):
            out.append(esc(str(c)))
        elif isinstance(c, Tag):
            if c.name == 'dfn':
                d = c.get('data-def', '').replace('"', '&quot;')
                out.append(f'<dfn title="{esc(d)}">{inline(c)}</dfn>')
            elif c.name == 'br':
                out.append('<br>')
            elif c.name in INLINE_OK:
                tag = 'strong' if c.name == 'b' else 'em' if c.name == 'i' else c.name
                out.append(f'<{tag}>{inline(c)}</{tag}>')
            elif c.name == 'span' and 'sl' in c.get('class', []):
                continue  # referência de slide nas legendas
            else:
                out.append(inline(c))  # a, span e outros: só o conteúdo
    return re.sub(r'\s+', ' ', ''.join(out))


def text(node):
    return re.sub(r'\s+', ' ', node.get_text(' ', strip=True))


def table(div):
    tb = div.find('table')
    cap = tb.find('caption')
    head = [inline(th).strip() for th in tb.select('thead th')]
    rows = []
    for tr in tb.select('tbody tr') or [tr for tr in tb.find_all('tr') if not tr.find_parent('thead')]:
        rows.append([inline(td).strip() for td in tr.find_all(['td', 'th'], recursive=False)])
    b = {'t': 'table', 'rows': rows}
    if head:
        b['head'] = head
    if cap:
        b['caption'] = inline(cap).strip()
    if 'plain' in div.get('class', []):
        b['plain'] = True
    return b


def kv(div):
    pairs, key = [], None
    for c in div.children:
        if isinstance(c, Tag):
            if c.name == 'b':
                key = inline(c).strip()
            elif key is not None:
                pairs.append([key, inline(c).strip()])
                key = None
    return {'t': 'kv', 'pairs': pairs}


def flow(div):
    steps = []
    for d in div.find_all('div', recursive=False):
        b = d.find('b')
        title = inline(b).strip() if b else ''
        if b:
            b.extract()
        steps.append([title, inline(d).strip()])
    return {'t': 'flow', 'steps': steps}


def figure(f):
    img = f.find('img')
    cap = f.find('figcaption')
    return {
        'key': img.get('data-k'),
        'alt': img.get('alt', ''),
        'w': int(img.get('width') or 0),
        'h': int(img.get('height') or 0),
        'cap': inline(cap).strip() if cap else '',
    }


def src_chip(div):
    g = lambda c: text(div.select_one('.' + c)) if div.select_one('.' + c) else ''
    kind = [c for c in div.get('class', []) if c != 'src']
    return {'t': 'src', 'kind': kind[0] if kind else '', 'k': g('k'), 'v': g('v'), 's': g('s')}


def lst(el):
    return {'t': el.name, 'items': [inline(li).strip() for li in el.find_all('li', recursive=False)]}


def box(el):
    kind = [c for c in el.get('class', []) if c != 'box'][0]
    lbl = el.select_one('.lbl')
    blocks = []
    for c in el.find_all(recursive=False):
        if c is lbl:
            continue
        if c.name == 'p':
            blocks.append({'t': 'p', 'h': inline(c).strip()})
        elif c.name in ('ul', 'ol'):
            blocks.append(lst(c))
    return {'t': 'box', 'kind': kind, 'label': text(lbl) if lbl else '', 'blocks': blocks}


def chapter(sec):
    head = sec.select_one('header.ch-head')
    eb = text(head.select_one('.ch-eyebrow'))
    num = int(re.search(r'Capítulo (\d+)', eb).group(1))
    part = re.search(r'Parte ([IVX]+) — (.+)$', eb)
    lead = head.select_one('.ch-lead')
    goals = head.select('.goals li')
    blocks, figs_by_section, cur = [], [], []
    for c in sec.find_all(recursive=False):
        cls = c.get('class', [])
        if c.name == 'header' or 'quiz' in cls or 'ch-end' in cls:
            continue
        if c.name == 'h2':
            n = c.select_one('.num')
            num_txt = text(n) if n else ''
            if n:
                n.extract()
            blocks.append({'t': 'h2', 'id': c.get('id'), 'num': num_txt, 'text': text(c)})
            figs_by_section.append(cur)
            cur = []
        elif c.name == 'h3':
            blocks.append({'t': 'h3', 'text': text(c)})
        elif c.name == 'p':
            blocks.append({'t': 'p', 'h': inline(c).strip()})
        elif c.name in ('ul', 'ol'):
            blocks.append(lst(c))
        elif 'tbl' in cls:
            blocks.append(table(c))
        elif 'kv' in cls:
            blocks.append(kv(c))
        elif 'flow' in cls:
            blocks.append(flow(c))
        elif 'box' in cls:
            blocks.append(box(c))
        elif 'src' in cls:
            blocks.append(src_chip(c))
        elif c.name == 'figure' or 'figs' in cls:
            fl = [figure(f) for f in ([c] if c.name == 'figure' else c.find_all('figure'))]
            b = {'t': 'figs', 'figs': fl}
            blocks.append(b)
            cur.append(b)
        else:
            raise SystemExit(f'bloco desconhecido em {sec["id"]}: {c.name} {cls}')
    figs_by_section.append(cur)

    # Imagens principais: 1 por seção (2 quando a seção tem 4 ou mais).
    keep = set()
    for group in figs_by_section:
        allf = [f for b in group for f in b['figs']]
        quota = 1 if len(allf) < 4 else 2
        if len(allf) >= 4:
            # espalha: a primeira e uma do meio da seção
            chosen = [allf[0], allf[len(allf) // 2]]
        else:
            chosen = allf[:quota]
        keep.update(f['key'] for f in chosen)
    final = []
    for b in blocks:
        if b['t'] == 'figs':
            b['figs'] = [f for f in b['figs'] if f['key'] in keep]
            if not b['figs']:
                continue
        final.append(b)

    return {
        'num': num,
        'id': f'derm-cap-{num:02d}',
        'part': part.group(1) if part else '',
        'partName': part.group(2) if part else '',
        'kind': 'pratica' if sec.get('data-kind') == 'p' else 'teorica',
        'short': sec.get('data-short'),
        'title': text(head.find('h1')),
        'lead': inline(lead).strip() if lead else '',
        'goals': [inline(g).strip() for g in goals],
        'blocks': final,
    }, keep


os.makedirs(os.path.join(out_src, 'capitulos'), exist_ok=True)
os.makedirs(out_pub, exist_ok=True)
manifest, all_keep = [], set()
for sec in soup.select('section.chapter'):
    if sec['id'] in ('glossario', 'simulado'):
        continue
    ch, keep = chapter(sec)
    all_keep |= keep
    with open(os.path.join(out_src, 'capitulos', f'{ch["id"]}.json'), 'w', encoding='utf-8') as fh:
        json.dump(ch, fh, ensure_ascii=False, separators=(',', ':'))
    entry = {k: ch[k] for k in ('num', 'id', 'part', 'partName', 'kind', 'short', 'title')}
    # Títulos das seções: alimentam a busca do app.
    entry['topics'] = '; '.join(b['text'] for b in ch['blocks'] if b['t'] in ('h2', 'h3'))
    manifest.append(entry)

# Glossário
# Glossário: [termo, definição, nº do capítulo onde o termo aparece]
sec_num = {}
for sec in soup.select('section.chapter'):
    eb = sec.select_one('.ch-eyebrow')
    mm = re.search(r'Capítulo (\d+)', text(eb)) if eb else None
    if mm:
        sec_num[sec['id']] = int(mm.group(1))
gl = soup.select_one('#glossario dl.gl')
terms = []
for dt in gl.find_all('dt'):
    dd = dt.find_next_sibling('dd')
    link = dt.find('a')
    num = None
    if link:
        mm = re.match(r'#t-(c\d+)-', link.get('href', ''))
        num = sec_num.get(mm.group(1)) if mm else None
        link.extract()
    terms.append([text(dt), inline(dd).strip() if dd else '', num])
with open(os.path.join(out_src, 'capitulos', 'glossario.json'), 'w', encoding='utf-8') as fh:
    json.dump(terms, fh, ensure_ascii=False, separators=(',', ':'))

# Imagens selecionadas -> public/derm/<chave>.webp
total = 0
for key in sorted(all_keep):
    uri = IMG[key]
    data = base64.b64decode(uri.split(',', 1)[1])
    path = os.path.join(out_pub, key + '.webp')
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'wb').write(data)
    total += len(data)

manifest.sort(key=lambda x: x['num'])
with open(os.path.join(out_src, 'manifest.json'), 'w', encoding='utf-8') as fh:
    json.dump(manifest, fh, ensure_ascii=False, indent=1)
print(f'{len(manifest)} capítulos, {len(terms)} termos, {len(all_keep)} imagens ({total/1e6:.1f} MB)')
