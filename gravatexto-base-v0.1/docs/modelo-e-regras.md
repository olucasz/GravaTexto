# Modelo e regras

## Camadas

1. `translations`: uma edição imutável identificada por versão e fonte.
2. `books` e `verses`: referência e texto-fonte integral. `book_id + chapter + verse + translation_id` é único.
3. `collections → journeys → units`: organização editorial, separada dos textos.
4. `unit_verses`: associação ordenada. Um versículo pode aparecer em mais de uma jornada sem copiar seu texto.
5. `learning_items`: versão do recorte exibido para um versículo. Guarda transformações, contexto e tokens.
6. `puzzles`: exercícios associados ao item, com resposta verificável.

O recorte inicial trabalha com um versículo por item. Passagens com vários versículos poderão usar uma futura tabela `learning_item_verses`; não concatenar referências fingindo que são um único versículo. A ordem de jornadas na coleção é editorial. As 3 etapas de 2 versículos organizam o catálogo; não equivalem a 3 dias fixos.

## Identidade e atualizações

Exemplo: `blivre-tr-2018.2.0:ROM.8.1` identifica o texto dessa edição. A referência é montada com o nome do livro e números, nunca comparada apenas por uma string livre. Os códigos de livro são os da fonte VPL; não presumir que todos seguem USFM (Filipenses = PHI, João = JOH, 1 João = 1JO).

Uma atualização da tradução cria novo `translation_id`; não sobrescrever silenciosamente um texto que o usuário já memorizou. O `text_sha256` ajuda a detectar alterações. Tokens têm IDs próprios por ocorrência, inclusive quando palavras se repetem.

Os offsets `start/end` são índices de **pontos de código Unicode**, fim exclusivo. Em JavaScript, use `Array.from(text).slice(start,end).join('')`; `String.slice` usa unidades UTF-16 e não é uma regra geral equivalente.

## Progresso futuro: separado do catálogo

Chave recomendada: `(user_id, translation_id, verse_id, target_dimension)`.

Dimensões:
- `text`: palavras, continuação e ordem do texto.
- `reference`: identificação de livro, capítulo e versículo.

`identify_text` traz `target_dimension = text_reference` porque testa uma associação. Registrar essa evidência de associação separadamente; não promovê-la automaticamente a recuperação independente de texto nem elevar os dois domínios como se fossem testes independentes. Acertos de múltipla escolha são evidência de reconhecimento, não uma prova de recitação sem pistas.

Em pares, atualizar o resultado por `verse_id` de cada par, não apenas pelo item principal que agrupa o puzzle. Usar `pairs[].learning_item_id` para rastrear cada associação.

Tentativas futuras devem guardar: sessão, puzzle, versão do conteúdo, alternativa/ordem enviada, número da tentativa, acerto, ajuda, dimensão, horários e seed de embaralhamento. Conclusão e recompensa usam uma chave de idempotência para impedir duplicação por reenvio.

O banco fornecido contém somente conteúdo. Não há contas nem progresso fictício tratados como dados reais.

## Sessões diárias

- Primeira sessão: dois textos novos; leitura antes de pedir resposta.
- Seguintes: até um texto novo e duas revisões, priorizando vencimentos por dimensão.
- Oito exercícios-base como hipótese inicial; ajustar após teste com pessoas.
- Alternar tipos; introduzir blocos e continuações apenas se houver texto suficiente.
- Um puzzle de pares só inclui textos já apresentados.
- Mostrar referências nos puzzles de texto; ocultar a referência correta quando o objetivo for localizá-la.
- A seleção real depende do que está vencido e do que já foi visto, não de um calendário rígido que todos devem seguir.
- Permitir `practice_without_xp` quando não há revisão vencida; não fabricar tarefas pendentes.

## Acerto e erro

Feedback depois de confirmar. Em erro, exibir a solução e destacar o trecho ou referência diferente. Botão Continuar; não forçar uma cópia imediata da solução.

Guardar os erros e retomar no final, com alternativas reorganizadas e a mesma habilidade-alvo. Entre a correção e a nova tentativa, pelo menos dois outros exercícios. Limitar a três reforços na sessão, com prioridade para erros de textos novos; demais dificuldades seguem para o próximo dia. Segunda falha mostra correção e agenda nova revisão. Nunca prender em um ciclo infinito.

Intervalos 1, 3, 7, 14 e 30 dias são uma política inicial proposta, não um algoritmo validado. Uma resposta com ajuda ou após correção não avança o intervalo. Reconhecimento e recuperação sem pistas precisarão de tratamento distinto na futura lógica de domínio.

## Famílias de puzzles

| `kind` | Ação | Resposta |
|---|---|---|
| `locate_reference` | Texto → referência | ID da referência correta |
| `identify_text` | Referência → texto | ID do texto correspondente |
| `fill_gap` | Completar palavra | ID da opção correta |
| `choose_continuation` | Escolher continuação | ID da continuação correta |
| `order_fragments` | Ordenar blocos | Array exato de IDs de peças |
| `match_pairs_1/2` | Ligar textos e referências | Correspondências por `verse_id` |

Os dois sufixos de `match_pairs` identificam conjuntos; representam a mesma família. Não gerar ordenação artificial para “Orai sem cessar”. `pieces[].text` preserva espaços para reconstrução exata; `display_label` remove bordas vazias apenas para desenhar o chip.

Alternativas incorretas de lacunas são material didático, não texto bíblico. Continuação e associação usam trechos autênticos de outros versos. Não registrar frases compostas incorretas em `verses` nem mostrá-las como citação verdadeira fora do feedback do exercício.
