# Tarefas — 001-playable-prototype

Entrada: [spec.md](spec.md), [plan.md](plan.md), [data-model.md](data-model.md), [contracts/domain.md](contracts/domain.md) e [design-direction.md](design-direction.md).

**Implementação autorizada pelo usuário e executada.** T001–T006 registram a etapa documental anterior; T007–T025 cobrem o app. Testes foram agrupados por comportamento em domain/rules/storage/content/refinement e flows, sem duplicar arquivos por componente. Leitura/feedback ficam em Session.tsx e puzzles em Puzzles.tsx.

## Fase 1 — Preparação SDD

- [x] T001 Preservar arquivos em backup externo, copiar `gravatexto-base-v0.1/` e registrar hashes em `specs/001-playable-prototype/installation.md`.
- [x] T002 Instalar Spec Kit 1.0.11, inicializar `.specify/` e `.agents/skills/`, conferir versões e ausência de sobrescritas em `specs/001-playable-prototype/installation.md`.
- [x] T003 Gerar constituição 1.0.0 em `.specify/memory/constitution.md` e requisitos/cenários em `specs/001-playable-prototype/spec.md`.
- [x] T004 Gerar `specs/001-playable-prototype/plan.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`, `content-changelog.md` e `design-direction.md`.
- [x] T005 Gerar `specs/001-playable-prototype/tasks.md` e `checklists/requirements.md`, verificar rastreabilidade e executar análise cruzada somente leitura com speckit-analyze.
- [x] T006 Entregar índice `README.md`, links dos artefatos e resultado da análise para revisão, sem criar app.

## Fase 2 — Fundação após revisão

Pré-condição satisfeita: usuário autorizou a implementação. Saída: conteúdo confiável e persistência utilizável pelo primeiro fluxo.

- [x] T007 Configurar React/TypeScript strict/Vite/Router, npm lockfile e scripts em `package.json`, `vite.config.ts`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts` e `src/ui/App.tsx`; CSS em `src/ui/tokens.css`. Registrar versões exatas e comandos de quickstart; rotas FR-007/FR-009.
- [x] T008 Testar conteúdo em `tests/unit/content.test.ts`; implementar `scripts/prepare-content.mjs`, `src/content/types.ts`, `src/content/adapt.ts` e `src/content/editorial-overrides.json`: `editorial_status = draft`, `production_ready = false`, Unicode/fim exclusivo, IDs únicos, mapeamentos, 55 contextos, hashes e reconstrução. Atualizar `specs/001-playable-prototype/content-changelog.md` com ajustes efetivamente aplicados. FR-001/SC-002.
- [x] T009 Testar reducer/storage em `tests/unit/storage.test.ts`; implementar envelope/eventos em `src/session/types.ts`, `src/session/reducer.ts`, `src/storage/local.ts`, `src/storage/migrations.ts`: `schema_version = 1`, `dimension = text | reference`, `status = active | paused | archived | completed`, IDs únicos, uma sessão ativa por perfil e snapshot imutável. Cobrir versão desconhecida, corrupção, quota, memória, migração, eventos duplicados e conflito de outra aba. FR-007/SC-003/SC-004.

## Fase 3 — US1: praticar uma jornada (P1)

Objetivo: primeiro percurso jogável completo, começando com localização, depois as seis famílias. Teste independente: perfil vazio até resultado nas duas jornadas, sem digitação, com cenários elegíveis para cada família.

- [x] T010 [US1] Implementar `src/ui/pages/Journeys.tsx`, `src/ui/pages/Session.tsx`, `ContextPanel.tsx` e `Attribution.tsx`; testar ordem editorial, introdução antes da pergunta e fonte/contexto em `tests/e2e/flows.spec.ts`. FR-001/FR-002/SC-001.
- [x] T011 [US1] Testar planejamento em `tests/unit/rules.test.ts`; implementar `src/session/create.ts` e `random.ts`: máximo três ativos, oito telas-base, alternância, cobertura, menor exposição, seed/ordens persistidas e motivo de sessão menor. Cobrir dois novos, um verso, pares parcialmente desconhecidos e fixture incompleta. FR-003/SC-004.
- [x] T012 [US1] Implementar `src/evaluation/evaluate.ts`, `src/ui/pages/Session.tsx`, `src/ui/components/Puzzles.tsx`, `src/ui/pages/Session.tsx` e resultado básico em `src/ui/pages/Result.tsx`; testar avaliação por ID, resposta vazia, bloqueio, clique duplo e localização até resultado em `tests/unit/rules.test.ts` e `tests/e2e/flows.spec.ts`. Sem vazamento da referência correta. FR-004/FR-007/FR-008/FR-009.
- [x] T013 [US1] Adicionar identify_text, fill_gap e choose_continuation em `src/ui/components/Puzzles.tsx` e `src/evaluation/evaluate.ts`; ampliar `tests/unit/rules.test.ts` para preservar prefixo/sufixo e mapear identify_text somente para reference. FR-004/SC-002.
- [x] T014 [P] [US1] Implementar `src/ui/components/Puzzles.tsx` e `tests/e2e/flows.spec.ts`: peças corretas com extras, sequência por IDs, toque/teclado, remoção/compactação e ocorrências repetidas; sem ordenação inventada para versos curtos. FR-004/FR-009.
- [x] T015 [P] [US1] Implementar `src/ui/components/Puzzles.tsx` e `tests/e2e/flows.spec.ts`: três membros introduzidos/ativos, segundo toque confirma, erro fecha só o texto escolhido, persistência parcial e três avaliações por tela. FR-004/FR-007/FR-008/FR-009.

## Fase 4 — US2: aprender com os erros (P1)

Objetivo: feedback seguido de recuperação espaçada válida. Teste independente: cenário com erro inicial elegível versus erro final adiado; acerto no reforço preserva falha.

- [x] T016 [US2] Testar `tests/unit/rules.test.ts` e `tests/e2e/flows.spec.ts`; implementar `src/session/exposure.ts` e `reinforcement.ts` e integrar reducer/Session: avaliar antes da exposição de feedback, fila por verso/dimensão, dois desafios posteriores completos, reexposição reinicia marco, até três reforços/total onze, prioridade novo/erro antigo, nenhuma repetição imediata ou segundo reforço. FR-005/FR-006/SC-004.

## Fase 5 — US3: retomar e voltar outro dia (P1)

Objetivo: persistência completa, revisão por calendário/dimensão e resultado definitivo. Teste independente: reload, dia seguinte, erro posterior e reabertura de resultado.

- [x] T017 [US3] Escrever `tests/unit/rules.test.ts` e `calendar.test.ts`; implementar `src/progress/calendar.ts` e `schedule.ts`: `step` inteiro 0 a 4, `[1, 3, 7, 14, 30]`, datas YYYY-MM-DD, fuso detectado/fallback, primeira revisão amanhã, um avanço por dimensão/dia e erro/ajuda prevalente. Testar mudança de offset, meia-noite, exposição anterior, prática livre, teto 30 e verso reutilizado entre jornadas. FR-006/SC-003/SC-004.
- [x] T018 [US3] Integrar pausa/retomada/arquivamento em `src/session/reducer.ts`, `src/ui/pages/Journeys.tsx` e `Session.tsx`; cobrir seleção, feedback, pares, mudança de jornada, dia e clock capturado em `tests/e2e/flows.spec.ts`. Preservar estado real ao retornar de simulação. FR-007/SC-003.
- [x] T019 [US3] Completar `src/ui/pages/Result.tsx` e resumo em `src/session/result.ts`; testar `tests/unit/rules.test.ts` e `tests/e2e/flows.spec.ts`: denominadores separados, assistência fora dos acertos, erro original preservado, próximas revisões, snapshot único e ausência de conclusão para arquivada. Integra US2. FR-008/SC-003.

## Fase 6 — US4: inspecionar o protótipo (P2)

Objetivo: controle local do piloto com cenários e galeria isolados. Teste independente: testar seis famílias e exportar sem alterar perfil normal.

- [x] T020 [US4] Implementar `src/devtools/Panel.tsx` e `scenarios.ts`; testar `tests/e2e/flows.spec.ts` com primeiro acesso, vencidos, tudo em dia, único conhecido, erros cedo/tarde/repetidos e armazenamento indisponível. Galeria isolada, relógio separado, preservar/encerrar sessão e gate DEV/VITE_ENABLE_DEVTOOLS. FR-010/SC-004.
- [x] T021 [US4] Implementar inspeção/exportação em `src/devtools/export.ts` e eventos/duração ativa em `src/session/reducer.ts`; ampliar `tests/e2e/flows.spec.ts` para JSON versionado, modo explícito, tempo sem pausa/aba oculta, reset exclusivo e nenhuma transmissão externa. FR-010/SC-006.

## Fase 7 — Acabamento e entrega local

- [x] T022 Aplicar `src/ui/tokens.css` e `styles.css`, SVGs originais em `public/illustrations/`, Nunito Sans local em `public/fonts/` e OFL em `public/licenses/`; estados/movimento conforme `specs/001-playable-prototype/design-direction.md`. FR-009/SC-005.
- [ ] T023 Validação parcialmente concluída: teclado, foco, estados, reduced-motion e ausência de resposta antecipada cobertos por testes e revisão. Pendente verificação manual com leitor de tela real. Validar contraste e leitor de tela em `tests/e2e/flows.spec.ts`; registrar verificações manuais em `specs/001-playable-prototype/verification.md`. FR-009/SC-005.
- [x] T024 Validar fluxos Chromium/WebKit e layout 360/390/1440 px/zoom 200% em `tests/e2e/flows.spec.ts`; corrigir cortes, rolagem horizontal e CTA encoberto. Executar conteúdo, typecheck, lint, unitários, e2e e build; registrar resultados em `specs/001-playable-prototype/verification.md`. SC-001–SC-005.
- [x] T025 Atualizar `README.md`, `specs/001-playable-prototype/quickstart.md`, `verification.md` e `content-changelog.md` com comandos reais, limitações, percurso para Lucas e roteiro do piloto; não declarar revisão humana executada nem publicar automaticamente. SC-006.

## Dependências e paralelismo

T001→T002→T003→T004→T005→T006 encerra a etapa SDD. Após revisão: T007→T008/T009→US1→US2→US3→US4→acabamento. T012 é a primeira demonstração local vertical com localização; as regras completas só ficam prontas após US3.

Dentro de US1, T014 e T015 podem ocorrer em paralelo após T013, com interfaces de avaliação já fixadas e sem editar arquivos compartilhados. US2: casos de teste de exposição e reforço podem ser preparados separadamente antes de integrar T016. US3: testes de calendário e de resultado podem ser preparados em paralelo; integração do resultado espera T017/T018. US4: fixtures de cenário e formato de exportação podem ser preparados separadamente; integração T021 espera T020. Esses são exemplos de divisão de trabalho, não autorização automática para agentes adicionais.

US1 tem seis tarefas; US2 uma; US3 três; US4 duas; preparação/fundação/acabamento somam treze: 25 tarefas. Cada tarefa agrega testes e comportamento relacionados. Testes usam fixtures para que histórias possam ser verificadas isoladamente, ainda que a integração tenha dependências.

## Rastreabilidade

| Requisito/critério | Tarefas |
|---|---|
| FR-001 | T008, T010 |
| FR-002 | T010 |
| FR-003 | T011 |
| FR-004 | T012–T015 |
| FR-005 | T016 |
| FR-006 | T016, T017 |
| FR-007 | T009, T012, T015, T018 |
| FR-008 | T012, T015, T019 |
| FR-009 | T012, T014, T015, T022–T024 |
| FR-010 | T020, T021 |
| SC-001 | T010–T015, T024 |
| SC-002 | T008, T013, T024 |
| SC-003 | T009, T012, T017–T019, T024 |
| SC-004 | T009, T011, T016, T017, T020, T024 |
| SC-005 | T022–T024 |
| SC-006 | T021, T025; revisão/piloto humanos após entrega |


## Refinamento solicitado
- [x] T026 Separar curadoria editorial de distratores da fonte canônica; quatro opções e dez ordenações com extras.
- [x] T027 Implementar lacunas múltiplas, banco, iniciais e digitação opcional; avaliação normalizada e ocorrências repetidas.
- [x] T028 Integrar níveis de dificuldade, compatibilidade de snapshots, galeria e preferência persistida.
- [x] T029 Refinar peças/motion, decoração e sequência factual de acertos; revisão visual independente.
- [x] T030 Testar refinamento e atualizar especificação, plano, contratos, changelog, README e verificações.

T023 é pendência de validação assistiva manual, não uma funcionalidade oculta ou implementação faltante. Revisão editorial/pedagógica e piloto são externos à entrega de código. T024 usa reflow equivalente a 200%; zoom nativo em dispositivo real integra a revisão manual.

| Refinamento | Tarefas |
|---|---|
| FR-011 | T026, T030 |
| FR-012–FR-013 | T027, T030 |
| FR-014 | T028, T030 |
| FR-015 | T029, T030 |

## Evolução de trilha e PWA

- [x] T031 Auditar marca, PDF histórico, rotas, tokens, assets, progresso e build Vite.
- [x] T032 Consolidar símbolo/wordmark e criar ícones PWA a partir do SVG existente.
- [x] T033 Implementar modelo derivado de unidades/nós/estados e testes de desbloqueio.
- [x] T034 Implementar Home diária, trilha, Explorar e Perfil com navegação responsiva.
- [x] T035 Implementar XP factual, sequência, conclusão com retorno à trilha e animação de unlock.
- [x] T036 Integrar ilustrações vetoriais originais, superfícies, profundidade e motion reduzível.
- [x] T037 Configurar manifest, service worker, instalação, standalone, atualização, offline e safe areas.
- [x] T038 Validar 320/390/430/1440 px, Chromium/WebKit, build, manifest, SW e rota offline.
- [ ] T039 Validar instalação em Safari/Chrome físicos e leitor de tela real; etapa humana externa à implementação.

| Trilha/PWA | Tarefas |
|---|---|
| FR-016-FR-018 | T033-T035, T038 |
| FR-019-FR-020 | T032, T034-T036 |
| FR-021-FR-022 | T037-T039 |
