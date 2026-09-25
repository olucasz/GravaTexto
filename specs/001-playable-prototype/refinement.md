# Refinamento implementado — 25/09/2026
Origem: [documento recebido](refinamento-puzzles-input.md). A solicitação do usuário autoriza analisar e aplicar alterações; exemplos e sugestões do arquivo foram adaptados ao escopo existente.

## Decisões
- Preservar React/TypeScript/Vite, identidade e agendamento independente por dimensão.
- Manter 60 fixtures originais na base intacta; camada editorial gera 92 exercícios: seis famílias anteriores + 10 lacunas múltiplas, 10 iniciais e 12 digitações.
- Todas as escolhas têm quatro alternativas. Distratores preparados em JSON, próximos do contexto, com gramática compatível. Não são citações bíblicas. Continuam rascunho sem validação humana.
- Dez ordenações passam a 4–7 peças corretas e duas extras. Validar a quantidade de peças corretas, não o tamanho total do banco. IDs distinguem ocorrências repetidas.
- Lacunas múltiplas usam segmentos canônicos e banco com extras. Adicionar/remover por toque e teclado, compactando a seleção.
- Iniciais aparecem com banco de palavras: é reconstrução com pista, não evocação independente.
- Digitação opcional, ativada na seleção de jornada; não entra no percurso padrão nem nos reforços. Compara palavras em sequência após normalização Unicode, acentos, caixa, pontuação e espaços. LCS identifica palavras ausentes e extras/diferentes.
- Nível 1 nas duas primeiras telas, até nível 2 nas duas seguintes; depois até nível 3, abrindo nível 4 a partir de step 1 e nível 5 a partir de step 2. Elegibilidade, cobertura, alternância e menor exposição continuam prioritárias.
- Sequência de três ou mais acertos é derivada do histórico da sessão, zera silenciosamente no erro. XP e “domínio 68%” eram exemplos; não foram convertidos em métrica pedagógica.
- Motion CSS e Web Animations API: deslocamento das peças 190 ms, seleção/pressão, pequeno bounce de acerto e barra com scaleX 250 ms. Reduced motion remove esses movimentos.
- Decoração de páginas abertas substituída por composição orgânica de folhas/caminhos. Nenhuma dependência de animação adicionada.
- Novos campos do envelope v1 recebem defaults ao ler sessões anteriores. Snapshots antigos mantêm seu conteúdo e suas ordens; a nova curadoria vale para novas sessões.

## Implementação
Dados: src/content/exercise-curation.json; geração e validação: scripts/refine-exercises.mjs e prepare-content.mjs.
Contratos: src/content/types.ts, src/session/types.ts; adaptação: src/content/adapt.ts.
Motor: src/session/create.ts, reducer.ts, reinforcement.ts; correção: src/evaluation/evaluate.ts e text.ts.
UI: src/ui/components/Puzzles.tsx, pages/Session.tsx, Journeys.tsx, Attribution.tsx e styles.css.
Inspeção: src/devtools/Panel.tsx e scenarios.ts; compatibilidade: src/storage/migrations.ts.
Validação: tests/unit/refinement.test.ts e tests/e2e/flows.spec.ts.

## Limites
Sem drag-and-drop; toque/teclado atendem à reconstrução. Não há revelação progressiva de iniciais: usa-se banco com pista. Curadoria humana dos distratores, avaliação pedagógica e piloto continuam pendentes. Não há percentual de domínio, economia XP, streak diário, servidor ou autenticação.
