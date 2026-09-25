# GravaTexto — Base de conteúdo v0.1

Base inicial para criar a seleção de jornadas e testar puzzles e sessões diárias. Gerada em 25/09/2026 UTC (24/09 no Brasil).

## Decisão de tradução

Usar **Bíblia Livre (BLIVRE), edição Textus Receptus, release 2018.2.0**, obtida diretamente do repositório dos autores. A licença associada a essa fonte é **Creative Commons Atribuição 3.0 Brasil (CC BY 3.0 BR)**. Permite copiar, redistribuir e adaptar, inclusive comercialmente, cumprindo a atribuição e os demais termos. Não há tarifa de API: os textos estão no pacote e podem ser servidos pela infraestrutura do app.

A escolha é uma proposta operacional para o MVP: edição completa, arquivos abertos e licença identificada. Não é uma declaração de superioridade teológica. O projeto também disponibiliza uma edição Nestle 1904 (N4); este pacote não mistura as duas.

A BLIVRE mantém linguagem tradicional em diversas passagens (por exemplo, “vós”, “sois” e “Orai”). Não a trate como uma tradução integralmente em linguagem contemporânea. O arquivo distribuído é de fevereiro de 2018, não uma revisão nova de 2026. O texto difere dos exemplos aproximados do blueprint anterior: a base deste pacote prevalece nos puzzles.

Há divergência com os metadados do eBible, que citam “4.0 Brasil”. Por isso este pacote **não** usa o arquivo daquela distribuição e preserva a licença 3.0 BR e os arquivos da release oficial dos autores.

Fontes conferidas:
- Projeto dos autores: https://github.com/blivre/BibliaLivre
- Release utilizada: https://github.com/blivre/BibliaLivre/releases/tag/2018.2.0
- Licença da release: https://github.com/blivre/BibliaLivre/blob/2018.2.0/LICENCA.md
- Resumo oficial da licença: https://creativecommons.org/licenses/by/3.0/br/deed.pt-br
- Página dos autores sobre uso: https://sites.google.com/site/biblialivre/perguntas-e-respostas/posso-usar-a-b%C3%ADblia-livre

## O que foi preparado

- 66 livros, 1.189 capítulos e 31.102 versículos: texto canônico importado integralmente.
- 4 coleções, 16 jornadas e 48 etapas, com 96 versículos selecionados.
- Duas jornadas de protótipo, com 6 versículos cada; demais jornadas planejadas.
- 60 questões de exemplo cobrindo seis famílias de puzzles (com formatos compatíveis com o tamanho do texto).
- 6 exemplos de sessões, regras de feedback imediato e retomada posterior de erros.
- JSON para o frontend, banco SQLite com chaves estrangeiras, fonte original, licença, script de reconstrução e relatório de validação.

As 16 jornadas são uma **curadoria inicial**, não uma classificação exaustiva dos 31.102 versículos. O catálogo completo e as seleções são camadas separadas. Todos os itens editoriais estão em `draft`; as duas jornadas `prototype` podem alimentar a validação local, mas ainda não são um catálogo aprovado para produção.

## Começar pelo protótipo

1. Carregar `data/mvp-bundle.json`: contém só as 2 jornadas, os 12 textos, itens de aprendizagem, questões e política inicial.
2. Renderizar as jornadas, ordenadas por `position`.
3. Usar `examples/sessions.json` para simular os três primeiros dias de cada jornada.
4. Antes do primeiro exercício de um texto novo, apresentar seu cartão de leitura e contexto.
5. Embaralhar as alternativas no cliente com uma seed por sessão. A lista de dados mantém uma ordem estável; **não** mostrá-la sem embaralhar, pois a resposta correta vem primeiro no arquivo.
6. Ao confirmar, mostrar acerto/erro e correção imediatamente. Guardar a habilidade que falhou. Reapresentar no fim após pelo menos dois outros exercícios, até três reforços. Se não couber intervalo, agendar para a próxima sessão.
7. Não obrigar digitação; não implementar voz nesta fase.

`examples/sessions.json` é uma amostra declarativa, não um motor adaptativo já implementado. A regra real de vencimento precisará consultar histórico e fuso do usuário.

## Organização dos arquivos

| Arquivo | Uso |
|---|---|
| `gravatexto.sqlite` | Banco de conteúdo completo, consultável localmente |
| `schema.sql` | DDL SQLite, com relacionamentos e índices |
| `data/mvp-bundle.json` | Fixture pequena para a primeira tela e os puzzles |
| `data/verses.json` | Texto canônico completo, referências e hashes |
| `data/books.json` | Livros, abreviações e testamentos |
| `data/translation.json` | Edição, procedência, atribuição e hashes da fonte |
| `data/collections.json` | Quatro grandes coleções |
| `data/journeys.json` | Jornadas, ordem, dificuldade e disponibilidade |
| `data/units.json` | Etapas de cada jornada |
| `data/unit_verses.json` | Associação ordenada entre etapas e versículos |
| `data/learning_items.json` | Texto exibido, recortes, tokens, contexto e transformações |
| `data/puzzles-mvp.json` | Questões com opções e respostas |
| `data/session-policy.json` | Política inicial proposta |
| `docs/jornadas.md` | Catálogo legível com todos os textos selecionados |
| `docs/modelo-e-regras.md` | Decisões de organização e progresso |
| `docs/licenca-e-atribuicao.md` | Crédito para o app e distinção entre fonte e apresentação |
| `docs/revisao-editorial.md` | Pendências concretas antes de publicar |
| `examples/queries.sql` | Consultas de exemplo |
| `examples/sessions.json` | Sessões ilustrativas |
| `scripts/build.py` | Reconstrução offline e validação, Python 3.10+ |
| `scripts/curation.py` | Lista editável de jornadas e referências |
| `validation-report.json` | Contagens e resultado das verificações |
| `source/bliv-tr_vpl.zip` | Arquivo original da release, sem modificação |
| `licenses/BLIVRE-CC-BY-3.0-BR.md` | Licença original preservada |

## Recriar após alterar a curadoria

Executar, a partir da raiz deste pacote:

```bash
python3 scripts/build.py
```

O comando recria os JSONs, o banco SQLite, o catálogo Markdown e o relatório. Não acessa a internet e não contém dados de usuários. **Substitui o banco de conteúdo gerado**; não use esse arquivo SQLite para armazenar progresso real. A base de usuários deverá ser separada.

O SQL é SQLite, não um seed PostgreSQL pronto. Para a futura API, importar os JSONs para o ORM escolhido, mantendo IDs e chaves. Não há dependência obrigatória de provedor bíblico externo.
