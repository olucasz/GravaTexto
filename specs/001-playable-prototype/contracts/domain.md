# Contratos internos e exportação

> Atualização implementada em 25/09/2026: [refinamento de puzzles](../refinement.md). Essa decisão substitui os trechos anteriores sobre seis famílias, todos os blocos obrigatórios e ausência absoluta de digitação. O percurso padrão segue por toque.

Contratos implementados em src; assinaturas atualizadas ao código. Não existe API HTTP de negócio.

## Funções

| Interface | Entrada | Saída e invariantes |
|---|---|---|
| adaptContent() | Bundle validado no build e subconjunto de contextos | Catálogo validado ou erros com IDs; mapeia identify_text somente para reference e normaliza família dos pares |
| createSession(state, catalog, journeyId, id, seed, at) | Catálogo, jornada, histórico, perfil, IDs/seed e dependências | Sessão-base completa persistível ou indicação de retomada; mesmo input/clock/seed produz mesma ordem |
| evaluateAnswer(instance, answer) | Instância e IDs selecionados | Avaliação de uma questão ou associação; seleção inválida não produz tentativa |
| reduceEvent(state, event) | Envelope validado e evento | Novo envelope; Store persiste antes de atualizar UI; evento repetido não muda resultado |
| selectReinforcements(session, catalog) | Sessão, fila, exposições e telas concluídas | Até três itens elegíveis/razões de adiamento; não cria conteúdo novo |
| summarizeSession(state, session) | Sessão concluída e tentativas | Snapshot com denominadores-base/reforço e revisões; leitura do snapshot não agenda nada |

Data ISO e seed são parâmetros injetáveis. IDs novos são fornecidos/derivados deterministicamente fora de funções que devem ser puras. StorageAdapter expõe load/save/disable e warning; Store fornece reset exclusivo. Falhas ativam memória com aviso.

## Matriz de exposição

Avaliar contra exposições anteriores à confirmação. Depois da tentativa e agendamento, registrar exposição do feedback. Uma exposição influencia elegibilidade de recuperação, não transforma retrospectivamente um acerto em erro.

| Situação | Dimensão revelada |
|---|---|
| Leitura com texto e referência | text e reference do verso |
| Contexto aberto com texto e referência | text e reference dos versos de aprendizagem efetivamente visíveis |
| Localização, antes da resposta | text do verso; reference não é revelada pelas opções |
| Texto correspondente, antes da resposta | nenhuma solução é identificada pela lista de opções |
| Lacuna, continuação e ordenação | reference, pois mostram cabeçalho e trecho associado; pistas não revelam automaticamente a resposta text completa |
| Pares ainda sem associação confirmada | text dos três versos; nenhuma reference específica é identificada |
| Feedback simples | solução da dimensão avaliada; outras dimensões também, se texto completo/referência aparecem juntos |
| Feedback por par | associação reference do texto selecionado; text se reapresentado |

Os labels de opções podem conter textos de versos ainda não introduzidos: vê-los como distratores não equivale a registrar sua introdução ou cobrar uma pergunta sobre eles.

## Reforço e ordem dos eventos

Cada tela tem índice crescente. Ao mostrar solução na tela i, o reforço exige dois índices de telas posteriores concluídas, sem nova exposição da mesma dimensão. A própria conclusão de i não conta. Pares contam uma tela depois de todas as associações, nunca três intervenções. Leituras e pausas não contam. Se a solução aparece numa leitura entre telas, guardar a fronteira atual; exigir duas telas concluídas após esse evento.

A fila é deduplicada por verso/dimensão e preserva a ordem do primeiro erro. A elegibilidade é verificada ao selecionar e novamente antes de apresentar. Reforço de reference usa localização; reforço de text usa lacuna/continuação/ordenação elegível, preferindo a menos vista. Um reforço não reenfileira a si próprio. Não adicionar telas artificiais para cumprir intervalo.

## Pares

Texto A + referência B errada: registrar uma tentativa incorreta/assistida de A, revelar e fechar A↔referência A, devolver referência B ao conjunto disponível. Não fechar B nem registrar tentativa de B. Texto selecionado pode ser trocado antes do segundo toque. Par fechado não pode ser reavaliado. Seleções das duas colunas são embaralhadas independentemente e persistidas.

## Agendamento

`step=0` → 1 dia; `step=1` → 3; `step=2` → 7; `step=3` → 14; `step=4` → 30. Novo e erro/ajuda: step 0, amanhã. Acerto em dimensão vencida, primeira evidência elegível do dia e sem exposição prévia da solução na sessão: incrementar step uma vez e agendar intervalo a partir da data civil da tentativa. Cap em 4.

Acerto inelegível não altera vencimento. Assistência é ajuda explícita/fechamento orientado; mera exposição anterior invalida independência, mas não cria erro fictício. Falha ou ajuda explícita no dia prevalece e retorna amanhã. Guardar agregado diário e estado anterior evita somar intervalos em reprocessamentos. Datas de outras dimensões não mudam.

## Exportação local

Arquivo `gravatexto-history-YYYY-MM-DD.json`, baixado localmente, sem POST/telemetria. Envelope: schema_version, exported_at, mode, profile (ID anônimo/fuso), content_version, sessions, attempts, exposures, events e progress. Incluir seed, ordens, relógio e civil_date para reproduzir cenários; não incluir dados pessoais. Não implementar importação de histórico nesta feature. Histórico simulado deve indicar `mode=test`; galeria não se mistura ao normal.
