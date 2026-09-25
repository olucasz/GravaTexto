# Pesquisa e decisões — 001-playable-prototype

Data: 2026-09-25. Pesquisa documental e inspeção local; não representa avaliação pedagógica.

| Decisão | Razão | Alternativa descartada |
|---|---|---|
| Spec Kit 1.0.11 instalado da tag oficial | Versão fixada pelo documento; CLI e templates bundled são 1.0.11 | Copiar SKILL.md avulso ou atualizar versão sem necessidade |
| Frontend React/TS/Vite + Router, CSS, npm | Projeto sem código existente; padrão definido pelo usuário | Backend, framework full-stack e bibliotecas antecipadas |
| JSON pequeno mais contexto extraído no build | Bundle de 104.358 bytes, 12 textos/60 questões; 55 IDs válidos | Carregar SQLite ou catálogo de 31.102 versos no cliente |
| Adaptação separada e fonte intacta | Revisão editorial continua pendente; hashes reproduzíveis | Reescrever textos/distratores por memória |
| identify_text agenda referência | Evidência é associação; evita progresso duplicado | Propagar text_reference como dois acertos |
| Famílias de pares normalizadas, IDs preservados | Há quatro fixtures, dois tipos nomeados repetidos entre jornadas | Usar kind como identidade única |
| Avaliar antes de registrar exposição do feedback | Evita tornar todos os acertos assistidos | Registrar solução antes de avaliar |
| Passo zero corresponde a um dia | Novo/erro amanhã; próximo avanço independente é três dias | Incrementar datas cumulativamente ou avançar repetidamente no dia |
| Intervalo de reforço por telas concluídas após correção | Uma tela de pares é um desafio, não três intervalos | Contar a própria tela corrigida ou leitura como espera |
| Relógio capturado como configuração | Preserva retomada sem congelar a data civil | Regenerar sessão à meia-noite ou modificar clock ativo pelo painel |
| Nunito Sans local e CSS motion | Direção fornecida, SIL OFL 1.1 verificada; não depende de CDN na prática | Fonte remota obrigatória ou biblioteca extra de movimento |
| Sem geração de mockups nesta etapa | Entrega solicitada é proposta documentada para revisão | Tratar texto como mockup aprovado ou implementar telas antecipadamente |

## Evidências locais

Base inspecionada em Downloads e copiada sem modificar originais. Os 26 checksums coincidem. Bundle: 12 locate_reference, 12 identify_text, 12 fill_gap, 10 choose_continuation, 10 order_fragments e quatro conjuntos de pares. Recortes, referências, hashes e reconstruções dos 12 itens/60 questões foram verificados por leitura e script somente de validação. Os 55 contextos existem no catálogo.

1 Tessalonicenses 5:16 tem duas palavras; 5:17 não tem ordenação/continuação. Nenhum dos 12 versos se repete entre as duas jornadas atuais, portanto compartilhamento de progresso precisa de fixture sintética usando um verso existente, sem inventar texto.

A revisão auxiliar de contratos, prevista pela skill speckit-plan, confirmou: ordem de exposição, step=0, espaçamento por telas, fechamento exclusivo do par do texto escolhido e captura da configuração do relógio. Recomendações incorporadas nos contratos.

## Fontes de ferramenta e tipografia

- [Instalação oficial](https://github.github.io/spec-kit/installation.html)
- [Projeto existente](https://github.github.io/spec-kit/guides/existing-projects.html)
- [Release fixada](https://github.com/github/spec-kit/releases/tag/v1.0.11)
- [Licença Nunito Sans](https://raw.githubusercontent.com/google/fonts/main/ofl/nunitosans/OFL.txt)

A ajuda instalada confirmou que a inicialização usa assets bundled, sem baixar template de outra release. A documentação online é móvel; para a execução prevaleceu `specify init --help` da versão fixada. Fontes bíblicas são somente os arquivos fornecidos, não a web.
