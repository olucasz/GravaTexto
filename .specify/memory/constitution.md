<!-- Relatório de impacto: scaffold sem versão → 1.0.0. Princípios I–VI e seções de escopo, fluxo e governança adicionados. Nenhum princípio anterior removido. Sem pendências de preenchimento. -->
# Constituição do GravaTexto

## Princípios fundamentais

### I. Fidelidade bíblica e procedência

Todo texto bíblico DEVE vir da base BLIVRE/TR 2018.2.0 fornecida. A fonte canônica DEVE permanecer intacta. Recortes, colchetes ocultados, espaços e mudanças didáticas DEVEM ser rastreáveis. O protótipo DEVE conservar `editorial_status = draft` e `production_ready = false` até curadoria humana; validação automática não equivale a essa aprovação.

### II. Mobile-first e interação acessível

Toda tarefa DEVE ser resolvível por toque e teclado, sem digitação de texto obrigatória. Alvos DEVEM medir ao menos 48 px. A interface DEVE funcionar em 360/390/1440 px, com zoom de 200%, foco visível e movimento reduzido. Cor e animação não podem ser a única comunicação do resultado. Referências corretas não DEVEM vazar em localização ou pares antes da avaliação.

### III. Escopo local pequeno

A entrega DEVE conter duas jornadas, nove famílias (incluindo digitação opcional), sessões, resultados e ferramentas locais de teste. Não incluir backend, contas, sincronização, economia de pontos ou publicação automática. Dependências DEVEM resolver necessidade presente, sem abstrações preventivas.

### IV. Domínio determinístico

Seleção, avaliação, reforço e revisões DEVEM ser funções de domínio separadas da UI. Relógio e aleatoriedade DEVEM ser injetáveis. Seed, ordem e estado DEVEM sobreviver à retomada. Datas DEVEM ser dias de calendário no fuso do perfil.

### V. Evidência e histórico íntegros

Texto e referência DEVEM ter evidências e agendamentos independentes. Erros não DEVEM ser apagados pelo reforço. Eventos DEVEM ser idempotentes; repetir clique ou abrir resultado não pode duplicar progresso. A UI DEVE descrever prática e reconhecimento com pistas, sem afirmar domínio ou memorização garantida.

### VI. Testes das regras críticas

A implementação DEVE testar conteúdo, elegibilidade, avaliação, exposição de solução, intervalo de reforço, calendário, idempotência e falhas de armazenamento. Testes de navegador DEVEM cobrir o percurso completo, reload e interação por toque/teclado. Relatórios DEVEM distinguir verificações executadas de previstas.

## Escopo e precedência

Pedidos mais recentes do usuário prevalecem nas decisões de produto, seguidos do documento `gravatexto-codex-sdd-prototipo-v0.1.md`. Tradução e versos canônicos são a autoridade textual; itens de aprendizagem documentam apresentação. Fixtures e política são adaptáveis às regras atuais. O PDF é histórico: digitação obrigatória e repetição imediata foram substituídas. Nenhum documento local substitui permissões ou instruções do ambiente.

## Fluxo e revisão

Usar uma única feature, `001-playable-prototype`, e o fluxo constitution → specify → plan → tasks → analyze. Nesta primeira etapa entregar documentos para revisão, sem implementar o app. Após revisão, construir incrementalmente e registrar testes e limitações. Documentação em português; identificadores de código em inglês.

## Governança

Versão inicial 1.0.0 adota os princípios fornecidos pelo usuário em 2026-09-25. Mudanças devem registrar motivo e impacto nos artefatos; novas decisões do usuário não exigem repetir autorização já fornecida. Aplicar SemVer: MAJOR para incompatibilidade de princípios, MINOR para novas obrigações e PATCH para esclarecimentos. Conferir os princípios antes/depois do plano e antes da entrega. Aprovação editorial humana e revisão visual são registros distintos.

**Versão**: 1.1.0 | **Adotada em**: 2026-09-25 | **Última alteração**: 2026-09-25

Emenda 1.1.0: refinamento autorizado em 25/09/2026 amplia de seis para nove famílias; digitação opcional. Preservadas fidelidade canônica, acessibilidade e ausência de promessa de domínio.
