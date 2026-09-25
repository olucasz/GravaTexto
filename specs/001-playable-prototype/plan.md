# Plano técnico: protótipo jogável do GravaTexto

> Atualização implementada em 25/09/2026: [refinamento de puzzles](refinement.md). Essa decisão substitui os trechos anteriores sobre seis famílias, todos os blocos obrigatórios e ausência absoluta de digitação. O percurso padrão segue por toque.

**Feature**: `001-playable-prototype` · **Data**: 2026-09-25 · **Especificação**: [spec.md](spec.md)

**Estado**: app implementado após autorização; validação em verification.md. O identificador retornado pelos scripts é o da feature; não existe branch Git criada.

## Resumo

Construir um frontend local com duas jornadas, leitura, nove famílias, sessões determinísticas, reforços espaçados dentro da sessão, revisão diária por dimensão, persistência e painel de teste. Preservar BLIVRE/TR 2018.2.0 e manter o conteúdo como rascunho. O primeiro incremento após revisão é um percurso completo com localização; a entrega final inclui todas as famílias e regras.

## Contexto técnico

- TypeScript em modo strict, React, Vite e React Router; CSS com propriedades customizadas; npm e lockfile. Usar releases estáveis compatíveis com Node 24.14.0 disponível e registrar versões exatas na criação do app; versões efetivas fixadas em package-lock.json.
- Estado de UI com reducer/context; funções puras para domínio. Sem Redux, ORM, backend ou biblioteca de animação antecipada.
- Persistência: um envelope JSON versionado em `localStorage`, chave `gravatexto:state`; galeria/cenários separados do perfil normal.
- Testes: Vitest para domínio e Playwright para fluxos e renderização, com Chromium e WebKit. Comandos executáveis em [quickstart.md](quickstart.md).
- Alvo: navegador moderno em celular/desktop, interface pt-BR, perfil local anônimo. Fontes locais, nenhum serviço bíblico externo.
- Escala: 12 versos, 60 fixtures originais e 32 novos exercícios didáticos, 55 versos únicos de contexto. SQLite e os 31.102 versos completos não entram no bundle do cliente.
- Desempenho: avaliar localmente no evento de confirmação, sem esperar animação/rede; animação não bloqueia CTA. Celebração até 800 ms. Não há alegação de benchmark ainda.

## Verificação da constituição

| Princípio | Antes da pesquisa | Após desenho dos contratos |
|---|---|---|
| Fidelidade | Base verificada e original preservado | Adaptação separada, changelog, offsets Unicode e fonte acessível |
| Acessibilidade | Mobile-first e teclado previstos | Estados, ausência de vazamento, alvos/zoom/movimento definidos |
| Escopo pequeno | Sem app existente a migrar | Frontend único, sem serviços externos de negócio |
| Determinismo | Relógio/aleatoriedade injetáveis | Seed, ordem, eventos e calendário explícitos |
| Histórico íntegro | Dimensões independentes | Reducer idempotente e agregado diário com falha prevalente |
| Testes críticos | Casos da entrada preservados | Testes ligados a tarefas e guia de verificação |

Sem exceções à constituição. Aprovação editorial e revisão visual humanas não são substituídas por este gate documental.

## Estrutura do projeto

Documentação em `specs/001-playable-prototype/`: spec, plan, tasks, research, data-model, design-direction, content-changelog, quickstart, installation, verification, contracts e checklists. Constituição em `.specify/memory/constitution.md`.

Estrutura de implementação prevista, ainda não criada:

```text
src/
  content/      types.ts, adapt.ts, generated/, editorial-overrides.json
  session/      types.ts, create.ts, reducer.ts, reinforcement.ts, exposure.ts, random.ts
  evaluation/   evaluate.ts
  progress/     calendar.ts, schedule.ts
  storage/      local.ts, migrations.ts
  ui/           App.tsx, pages/, components/, tokens.css, styles.css
  devtools/     Panel.tsx, scenarios.ts
scripts/        prepare-content.mjs
tests/          unit/, e2e/
public/         fonts/, illustrations/, licenses/
```

As páginas são Journeys, Session e Result; componentes incluem ReadingCard, ContextPanel, ChoicePuzzle, OrderPuzzle, PairsPuzzle, Feedback e Attribution. Nenhuma classe genérica de serviço é necessária.

## Fase 0 — Decisões e pesquisa

[research.md](research.md) registra decisões, razões, alternativas e investigação de contratos. A base, o documento e a proposta do usuário resolvem escolhas de produto; não há lacuna bloqueadora. A pesquisa complementar por agente foi somente leitura, conforme o fluxo speckit-plan.

## Fase 1 — Dados, contratos e direção visual

### Conteúdo

O build lê o bundle pequeno e extrai a união dos 55 IDs de contexto de `verses.json`. Escreve apenas o conteúdo necessário em `src/content/generated/`. Falha de integridade bloqueia a geração; ausência de contexto desabilita a ação, preservando a nota. Nunca executar o rebuild da base como parte do build do app.

Adaptação valida IDs/relacionamentos, hashes, referências, alternativas distintas, acerto único e reconstrução exata. Source spans usam `Array.from` e fim exclusivo; spans de lacuna usam texto de aprendizagem. Ocultar apenas delimitadores e transformações explicitamente registradas. Preservar strings canônicas e normalização Unicode da fonte; normalização de alternativas serve apenas à detecção de duplicações.

Normalizar apenas a família `match_pairs_1/2` → `match_pairs`; preservar IDs completos. `identify_text` mantém evidência de associação e agenda apenas `reference`. IDs de ocorrência são qualificados pela instância. Limites de peças constam de [content-changelog.md](content-changelog.md); não editar o pacote original.

### Sessão determinística

Relógio e RNG são dependências explícitas. Usar Fisher–Yates e PRNG determinístico; a seed da instância deriva da seed da sessão e do ID da instância. Persistir oito instâncias-base e as ordens ao criar; reforços são criados e persistidos após respostas, nunca sorteados no render.

Ordenação editorial: posição da unidade, depois posição do verso. Seleção de vencidos considera menor due_date entre dimensões do verso; empate pela ordem editorial. Menor exposição recente usa último instante de desafio apresentado ao verso, mais antigo primeiro; nunca exposto vem antes. Perguntas preferem menor número de apresentações históricas; empate é resolvido pelo RNG injetado. Ordem original do acerto no JSON não é ordem de exibição.

Restrições rígidas: só conteúdo elegível, no máximo três ativos, pares com todos introduzidos na criação e ativos, alternância de família. Evitar mesmo verso consecutivo se houver candidato de outra família para outro verso. Entre candidatos, priorizar cobertura ainda ausente de texto/localização e recuperação antes de exposição, depois menor frequência. Se restrições impedirem oito telas, encerrar menor e persistir `short_session_reason`; não relaxar alternância para preencher.

Em revisão, tentar texto antes de tela que mostre texto completo, e localização antes de associação revelada. Isso pode ser incompatível para um mesmo verso; não prometer avanço nas duas dimensões. Registrar exposição real e bloquear avanço da dimensão afetada. Cobertura significa praticar, não necessariamente evidência independente.

Máquina de estados: reading → awaiting/partial → ready → feedback → próximo item; pares permitem confirmação individual até três resultados. Pausa é status recuperável; conclusão somente após base e reforços. Introdução ocorre quando o cartão fica apresentado, não ao clicar Continuar. Eventos de apresentação são idempotentes, inclusive sob efeitos repetidos do React.

### Exposição, avaliação e reforço

Na confirmação: obter exposições anteriores → avaliar resposta → persistir tentativa e progresso → registrar exposição da correção → mostrar feedback. Assim a própria correção não transforma retroativamente um acerto independente em assistido. Alternativas não assinaladas não são solução revelada. Matriz em [contracts/domain.md](contracts/domain.md).

No reforço, a tela da correção não conta como intervalo. Correção na tela 3 só permite tentativa depois das telas 4 e 5 concluídas sem nova exposição relevante. Pares contam uma tela; leituras não contam. Priorizar novos e ocorrência mais antiga, deduplicar verso/dimensão e excluir os já reforçados. Revalidar elegibilidade antes de cada reforço; não inserir esperas artificiais. Novas exposições podem invalidar candidato persistido; registrar descarte, sem aumentar o total. Nenhum item recebe segundo reforço na mesma sessão.

### Progresso e calendário

Chave: `(local_profile_id, translation_id, verse_id, dimension)`, com `text | reference`. `step=0` significa 1 dia; introdução/erro agenda amanhã. Primeira revisão vencida independente correta passa a step 1 (3 dias); depois 7, 14, 30, mantendo 30 no limite.

Um agregado diário guarda estado anterior, primeira evidência, erro/ajuda e resultado derivado. Reaplicar o mesmo evento não altera nada. Acerto adicional não avança; erro posterior substitui avanço por step 0/amanhã. Dimensão não avaliada não herda resultado; primeira data de revisão não é evidência de acerto.

Datas civis YYYY-MM-DD no fuso do perfil (detectado uma vez; fallback America/Sao_Paulo), somando dias de calendário. Registrar timestamp e data civil em cada evento. Sessão captura configuração de relógio, não data congelada: avaliação posterior à meia-noite usa o novo dia. Simulação usa perfil/cenário separado; voltar ao real não altera históricos simulados nem datas reais.

### Persistência e continuidade

`reduceEvent` é a única entrada para mutações do domínio. Uma gravação serializa evento, tentativa, progresso, sessão e resultado no mesmo envelope antes de avançar UI. `schema_version=1`; eventos com IDs únicos; tentativas identificadas por instância e, para pares, verso. Persistir também seleções parciais.

Tratar get/set/parse/quota failures. Se o envelope for inválido/desconhecido, não sobrescrever o bruto; operar em memória e avisar. Migração só para versões explicitamente suportadas, preservando campos conhecidos; sem reset automático. Reset remove apenas chaves com namespace GravaTexto, após ação explícita. Eventos de outra aba não podem substituir silenciosamente uma sessão: pausar gravação e oferecer recarregar o estado salvo.

Resultado é snapshot criado uma vez, com avaliações-base, assistência, reforço e próximas datas na conclusão. Não recalcular ao abrir a rota. Progresso-base conta telas; acurácia conta avaliações, com assistência fora dos acertos. Dados futuros do resultado não mudam retroativamente a fotografia daquela sessão.

### UI e painel

Aplicar [design-direction.md](design-direction.md). Rotas e estados em [contracts/ui.md](contracts/ui.md). Eventos de leitura, apresentação, resposta, feedback, pausa, retomada, reforço, arquivo e conclusão incluem duração ativa; abas ocultas e pausas não somam tempo ativo.

Painel importado dinamicamente apenas se `import.meta.env.DEV` ou `VITE_ENABLE_DEVTOOLS === 'true'`. Não incluir controles no build comum. Cenários/galeria usam estado e histórico isolados; exportação identifica seu modo. Mudança de cenário/relógio não altera configuração de sessão ativa: preservar mantém a sessão recuperável com sua configuração; encerrar arquiva antes de trocar.

## Ordem de implementação após revisão

1. Fundação de conteúdo/persistência e caminho com localização até resultado básico.
2. Demais famílias e cobertura determinística completa.
3. Exposição, reforço e agendamento com casos críticos.
4. Continuidade, resultado definitivo e painel isolado.
5. Visual, movimento, acessibilidade e validação do percurso local.

Detalhamento em [tasks.md](tasks.md); testes de domínio precedem suas implementações. Não executar essas etapas nesta entrega SDD.
