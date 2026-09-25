# Changelog de conteúdo didático
A pasta gravatexto-base-v0.1 permanece intacta. Todos os 26 checksums são conferidos antes de preparar/buildar. Conteúdo bíblico nunca é gerado por IA externa ou substituído por uma tradução diferente.

## prototype-1 — plano inicial
Oito cortes semânticos foram registrados em src/content/editorial-overrides.json, preservados como etapa histórica. A primeira validação verifica os hashes, recortes Unicode, colchetes/espacos e reconstrução da base de 60 questões.

## prototype-2 — refinamento implementado
Fonte das decisões: refinement.md e refinamento-puzzles-input.md.
- 12 textos e 55 versículos de contexto preservados.
- 60 fixtures originais adaptadas; 32 questões adicionadas à camada didática: dez lacunas múltiplas, dez iniciais e doze digitações opcionais. Total 92.
- Quatro alternativas próximas em gramática/contexto. Novos distratores incorretos são editoriais, não citações canônicas.
- Dez ordenações com 4–7 blocos corretos e duas peças extras. Substituem os oito cortes maiores do primeiro plano, inclusive Filipenses 4:13 e Mateus 11:28.
- Não criadas ordenações/continuações para os dois versículos curtos sem fixture.
- Recortes corretos extraídos da string original; NFC usado somente para localizar limites, sem reescrever o texto. Spans das peças em pontos de código; posições de palavras das lacunas são internas à geração e não são spans canônicos.
- IDs por ocorrência e por instância, dificuldade, segmentos e pistas adicionados. Iniciais aceitam intercâmbio de palavras visualmente idênticas.
- match_pairs_1/_2 normalizados; identify_text agenda somente reference.
- Tudo continua editorial_status=draft e production_ready=false.

Rastreabilidade: exercise-curation.json, scripts/refine-exercises.mjs e editorial_changes do bundle gerado. Alterar curadoria exige executar content:check e unitários. Sessões já iniciadas guardam snapshots anteriores e não são regeneradas silenciosamente.
