# Direção visual — papel claro, leitura generosa e peças táteis

> Atualização implementada em 25/09/2026: [refinamento de puzzles](refinement.md). Essa decisão substitui os trechos anteriores sobre seis famílias, todos os blocos obrigatórios e ausência absoluta de digitação. O percurso padrão segue por toque.

**Status**: proposta documentada para revisão de Lucas. Não há mockup renderizado ou aprovação visual/editorial humana registrada. Base: direção fornecida pelo usuário, organizada com a skill Impeccable; nenhum código de UI nesta etapa.

## Intenção e público

Participantes do piloto local precisam reconhecer a próxima ação, ler com conforto e entender a correção sem ajuda. Modo predominante: operar uma tarefa; leitura ganha prioridade no cartão e no contexto. Personalidade em ilustrações próprias e estados táteis, mantendo texto bíblico como foco. Referência de comportamento educacional: Duolingo, sem copiar marca, mascote ou layout.

## Tokens

| Token | Valor e uso |
|---|---|
| paper | #F7F5ED, fundo geral |
| surface | #FFFFFF, cartões e peças |
| ink | #203A30, texto principal |
| brand | #245B43, CTA e contornos ativos; texto branco |
| sprout | #B7D77A, destaque com ink; nunca texto branco pequeno |
| selected | #EAF2DF, fundo de seleção com borda brand |
| correction-bg | #FFF1E8, correção |
| correction-ink | #8B3D28, texto/ícone de correção |
| focus | #315FAD, contorno de foco com afastamento |
| radius-piece / panel | 12 / 20 px |
| spacing | 4, 8, 12, 16, 24, 32 px |

Nunito Sans 400/600/800 local, fallback system-ui/sans-serif, font-display swap; preservar arquivo OFL e copyright. [Licença SIL OFL 1.1](https://raw.githubusercontent.com/google/fonts/main/ofl/nunitosans/OFL.txt). Fonte ainda não baixada. Versículos 24–28 px, entrelinha 1,45; UI 16–18 px, sem reduzir para caber. Texto longo aumenta altura. Contrastes serão medidos na implementação, não aprovados por inspeção nominal dos hexadecimais.

Botões sólidos com relevo inferior discreto, peças com borda visível. Seleção usa borda/fundo/ícone; desabilitado permanece legível. Estado de foco não depende de hover. Alvos mínimos 48 px.

## Seleção de jornada

Largura máxima 960 px, margem móvel de 16–24 px. Marca compacta, pergunta “Qual jornada vamos praticar?” e dois painéis. Mobile: empilhados. Desktop: lado a lado; sem navegação lateral.

Primeiros versículos: páginas abertas e pequenos caminhos, desenho SVG original em verde broto. Confiança e cuidado: copa de árvore oferecendo abrigo, desenho SVG original em verde profundo. Ilustrações são decorativas e não fingem representar passagem ou contexto bíblico.

Cada painel: ilustração → título → descrição original da base → “6 textos” → “2 de 6 textos apresentados” (valor real) → ação contextual. Sessão ativa ganha Retomar; vencidos, Revisar; sem pendências, Praticar de novo identificado como prática livre. Novos ainda disponíveis usam Continuar jornada. Rodapé discreto com fonte/licença; sem cards das 14 jornadas futuras.

```text
GravaTexto
Qual jornada vamos praticar?

[ páginas e caminhos ]       [ copa e abrigo ]
Primeiros versículos         Confiança e cuidado
Descrição da base            Descrição da base
6 textos · X apresentados    6 textos · X apresentados
[ Começar / Retomar ]        [ Começar / Revisar ]

Sobre os textos · BLIVRE
```

Esquema estrutural, não mockup aprovado. No celular, o segundo painel fica abaixo do primeiro.

## Leitura e puzzle

Coluna até 640 px; uma tarefa por vez. Header com Sair, modo e barra/contagem. Versículo maior que a instrução auxiliar. Footer de ação respeita safe area e reserva espaço pela sua altura real, inclusive quando feedback cresce.

```text
Sair       [ progresso ]       3 de 8
Onde está escrito?

Texto exato da base

[ Referência A                       ]
[ Referência B               seleção ]
[ Referência C                       ]

[ Verificar                          ]
```

Localização não traz referência correta no cabeçalho, título da página, aria-label ou alt. Escolhas não têm numeração que codifique resposta. Ordenação tem área montada acima do banco; tocar usado devolve. Pares têm dois grupos e permitem toque/teclado, empilhados em viewport estreito/zoom, sem arrastar obrigatório. Instrução explica “Toque em um texto e depois em sua referência”.

Leitura apresenta referência, nota editorial e fonte; Ler contexto expande painel legível, com foco devolvido ao fechar. Feedback ocupa área inferior: check/texto no acerto, correção acolhedora no erro, CTA Continuar. Nunca depender apenas de verde/vermelho. Feedback não some automaticamente.

## Resultado

Coluna confortável, ilustração pequena de páginas que se assentam, sem troféu. “Prática de hoje concluída”; textos praticados; primeira tentativa com numerador/denominador; reforços separados; revisões por texto/referência. Sem percentuais de domínio.

```text
[ páginas assentadas ]
Prática de hoje concluída

X de Y respostas corretas na primeira tentativa
Textos praticados: ...
No reforço: ...
Próximas revisões: ...

[ Voltar às jornadas ]
```

Celebração até 800 ms, sem bloquear CTA. Mensagem não associa resultado ao valor espiritual da pessoa.

## Estados, movimento e acessibilidade

| Ação | Movimento |
|---|---|
| Pressionar | 2–3 px, 80–120 ms |
| Selecionar | Borda/fundo, 120–160 ms |
| Inserir/remover peça | Posição, 160–220 ms |
| Resolver par | Destaque/assentamento, até 200 ms |
| Feedback | 8 px + fade, 180 ms |
| Progresso | Preenchimento, 250 ms |
| Concluir | Páginas assentando, até 800 ms |

prefers-reduced-motion remove deslocamentos, partículas e bounce; estados estáticos ou fade curto. Não sacudir tela. Estados obrigatórios: leitura, aguardando, parcial, pronto, feedback correto/incorreto, assistido, reforço, pausa, concluído, falha de persistência e rota inválida.

Validar 360/390/1440 px e zoom 200%, orientação móvel, textos maiores, safe areas, Tab/Enter/Espaço/Esc, ordem/foco e leitor de tela. As cores e ilustrações propostas não substituem validação renderizada futura.
