# Minerador de laudos

Ferramenta para juntar modelos de laudos laboratoriais de vários laboratórios e
transformá-los em casos de teste anonimizados para o Extrator de Exames.

- `SKILL.md`: a missão completa para um agente (Hermes, Claude Code ou outro) executar:
  onde procurar, regras de LGPD e passo a passo.
- `vocabulario.md`: tabela de termos para variar as buscas.
- `minerar.py`: baixa, cataloga, anonimiza e resume.

```bash
pip install pypdf
python minerar.py baixar urls.txt        # URLs achadas -> amostras/
python minerar.py catalogar amostras/    # -> catalogo.jsonl
python minerar.py anonimizar amostras/   # -> anonimizados/*.json (avisa se sobrar nome)
python minerar.py resumo                 # tabela por laboratório e o que falta
```

`amostras/`, `catalogo.jsonl`, `urls.txt` e `anonimizados/` ficam fora do Git
(`.gitignore`). Um arquivo de `anonimizados/` só entra no repositório depois de
revisado à mão.
