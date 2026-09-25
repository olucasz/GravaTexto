# Modelo de dados — 001-playable-prototype

> Atualização implementada em 25/09/2026: [refinamento de puzzles](refinement.md). Essa decisão substitui os trechos anteriores sobre seis famílias, todos os blocos obrigatórios e ausência absoluta de digitação. O percurso padrão segue por toque.

Modelo proposto; nenhuma estrutura de aplicação implementada. Identificadores em inglês, texto de interface em português.

## Conteúdo imutável

- `Translation`: metadados originais, licença, atribuição e hashes. `id = blivre-tr-2018.2.0`.
- `Journey`: ID, título, descrição e posição originais, unidades e lista ordenada de versos; somente `first-verses` e `trust-and-care` jogáveis.
- `Verse`: ID, translation_id, reference, text e text_sha256 canônicos.
- `LearningItem`: ID, verse_id, source_span, text apresentado, tokens, transformações, notas e context_verse_ids. `editorial_status = draft`; `production_ready = false`.
- `Puzzle`: ID original, learning_item_id, família normalizada, payload, correct IDs e dimensão adaptada. `match_pairs` preserva lista de três membros; não confundir o item âncora da fixture com todos os membros.
- `EditorialOverride`: ID da questão, versão, limites dos recortes em pontos de código, motivo e procedência. Não reescreve Verse. Testar concatenação das peças igual ao LearningItem.text.

## Envelope persistido

`StoredState`: `schema_version = 1`, perfil, preferências, progressos, agregados diários, sessões, tentativas e eventos. Uma gravação serializa todo o envelope; versão futura desconhecida não é rebaixada. O adaptador retorna estado válido ou falha recuperável para memória. Armazenamento normal: `gravatexto:state`; cenário: `gravatexto:test`; galeria: memória isolada.

## Perfil, calendário e progresso

- `LocalProfile`: local_profile_id, timezone IANA e created_at; sem nome, email ou identificador externo.
- `ClockConfig`: modo real ou virtual e deslocamento em dias civis; capturado ao criar sessão. `Clock.now()` é injetável. Modo real usa instante atual; modo virtual deriva data civil pelo deslocamento. Timestamp real também é guardado para auditoria.
- `Progress`: chave `(local_profile_id, translation_id, verse_id, dimension)`; `dimension = text | reference`; introduced_at, last_presented_at, due_date, step, contagens de evidência e estado pendente. `step` é inteiro de 0 a 4; intervalos `[1, 3, 7, 14, 30]`. Data agendada não comprova que houve evidência naquela dimensão.
- `DailyEvidence`: chave do progresso + civil_date, estado anterior ao primeiro evento do dia, first_attempt_id, had_error, had_help, advanced e resultado derivado. Não pode haver mais de um avanço por dimensão/dia. Erro/ajuda posterior sempre produz step 0 e amanhã.

Datas civis têm formato YYYY-MM-DD e usam o fuso do perfil. Tentativa guarda seu civil_date definitivo; mudar relógio não recalcula eventos anteriores. Compartilhamento é pela chave de progresso, não journey_id.

## Sessão e instâncias

- `Session`: ID, journey_id, local_profile_id, content_version/hash, seed, clock_config, created_at, active_verse_ids, new_verse_ids, modo (`learning`, `review`, `mixed`, `free`), base_instances, reinforcement_instances, cursor, status e resultado opcional.
- `status = active | paused | archived | completed`. Só active/paused são recuperáveis. No máximo uma sessão ativa por perfil; perfis de cenário e galeria são isolados.
- `PuzzleInstance`: ID único, puzzle_id original, família, fase (`base | reinforcement`), lista de versos avaliados, dimensão, seed, ordens apresentadas e snapshot de conteúdo necessário à retomada. Não reutilizar ID da fixture como ID de tentativa.
- `Interaction`: opção selecionada; ou IDs das peças em ordem; ou texto selecionado e avaliações de pares concluídos. Estado da UI distingue reading, awaiting, partial, ready e feedback; retorno à mesma tela mantém a interação.
- `ReadingState`: cartões pendentes, apresentados e contexto aberto. `introduced_at` é salvo ao apresentar leitura, sem aguardar resposta.

A base tem até oito telas; o reforço tem até três; total máximo onze. `short_session_reason` é obrigatório quando a meta-base não é atingida. A fase de reforço não reduz contagem-base.

## Tentativa, exposição e fila

- `Attempt`: ID, event_id, session_id, instance_id, verse_id, dimension, answer (IDs), correct, assisted, exposure_before, evidence_kind, phase, timestamp, civil_date e active_duration_ms. Uma tentativa por instância/verso; questões simples têm um verso; pares têm três. Evidência: reconhecimento, associação ou reconstrução com pistas.
- `Exposure`: event_id, session_id, verse_id, dimension, origem (leitura/contexto/tarefa/feedback), screen_index e timestamp. Grava somente soluções efetivamente reveladas; não alternativas não assinaladas.
- `ReinforcementEntry`: verse_id, dimension, first_error_order, is_new, last_solution_screen e status pending/served/deferred. Chave deduplicada por verso/dimensão. Exposição posterior atualiza o marco, mas não a prioridade do primeiro erro.

Eventos de avaliação não alteram retroativamente correct/assisted de tentativa anterior. Mostrar correção não cria outra tentativa. Pares errados produzem um erro para o texto selecionado; não criam um erro adicional para o dono da referência equivocada.

## Eventos e resultado

`DomainEvent`: event_id único, tipo, session_id, instance_id opcional, timestamp, civil_date, modo normal/teste/galeria e payload de IDs. Tipos: reading_presented, context_opened, challenge_presented, answer_selected, answer_evaluated, feedback_shown, continued, paused, resumed, archived, reinforcement_started, completed. Seleções podem ser persistidas sem criar avaliações; duração ativa exclui pausa/aba oculta.

`SessionResult`: snapshot de textos praticados, total de telas-base, total de avaliações-base, acertos-base sem assistência, assistências, avaliações/reforços e próximos vencimentos. Denominador-base inclui as três associações de pares; reforços têm denominador separado. Snapshot só existe em completed e é gravado uma vez.

## Transições e invariantes

1. Criar sessão → persistir plano-base → apresentar leitura ou desafio.
2. Selecionar → salvar Interaction → pronto quando resposta válida.
3. Confirmar → consultar exposições anteriores → avaliar → agregar progresso → revelar solução → feedback bloqueado.
4. Continuar → concluir tela → próxima base ou reforço elegível → concluir com snapshot.
5. Pausar → retomar mantém cursor/ordem; arquivar preserva tentativas e não cria resultado.
6. Eventos duplicados retornam estado equivalente, sem novos IDs nem mudanças de data.
