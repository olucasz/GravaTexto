# Especificação: protótipo jogável do GravaTexto

> Atualização implementada em 25/09/2026: [refinamento de puzzles](refinement.md). Essa decisão substitui os trechos anteriores sobre seis famílias, todos os blocos obrigatórios e ausência absoluta de digitação. O percurso padrão segue por toque.

**Feature**: `001-playable-prototype` · **Criada**: 2026-09-25 · **Status**: implementado; conteúdo editorial em rascunho

**Entrada**: documento `gravatexto-codex-sdd-prototipo-v0.1.md` e plano fornecido pelo usuário. SDD preparado e app implementado após autorização explícita do usuário. Não há branch Git criada.

## Cenários de usuário e testes

### US1 — Praticar uma jornada (P1)

Como participante, quero escolher uma jornada, conhecer seus textos e responder desafios até receber um resultado. É a prioridade central porque permite validar o percurso completo.

**Teste independente**: perfil vazio → escolher qualquer jornada → leitura → desafios → resultado, sem digitar texto.

1. Dado um perfil vazio, ao começar Primeiros versículos, apresentar 1 Tessalonicenses 5:16 e 5:17 antes de cobrar cada texto, sem pares no primeiro dia.
2. Dada uma resposta vazia ou ordenação incompleta, Verificar permanece indisponível; ao completar e confirmar, bloquear edição e mostrar correção até Continuar.
3. Dado um conjunto elegível de três textos apresentados, cada par produz uma avaliação; erro fecha o par selecionado como assistido e não prende o participante.
4. Dada a última pergunta e nenhum reforço elegível, concluir com resultado salvo e denominador correto.

### US2 — Aprender com os erros (P1)

Como participante, quero entender o erro e voltar à dificuldade depois de outras tarefas. Isso evita confundir a repetição de uma solução visível com recuperação independente.

**Teste independente**: cenário com erro inicial e dois desafios intervenientes → reforço da dimensão errada; cenário com erro final → revisão amanhã.

1. Dado erro confirmado, mostrar solução e Continuar, sem pedir repetição imediata.
2. Dado erro sem nova exposição da solução e pelo menos dois desafios concluídos depois, permitir reforço ao terminar a base.
3. Dada nova exposição, reiniciar o intervalo; dado erro repetido, manter uma entrada por verso/dimensão.
4. Dado acerto no reforço, preservar erro original e revisão amanhã; dado erro no reforço, corrigir e encerrar o item.

### US3 — Retomar e voltar outro dia (P1)

Como participante, quero manter meu progresso ao pausar e receber revisões coerentes. É necessário para avaliar recorrência real.

**Teste independente**: selecionar parcialmente → reload → continuar; avançar data de teste → revisar; reabrir resultado sem alterar histórico.

1. Dada sessão ativa, recarregar mantém perguntas, ordem, seleção, leitura já apresentada e feedback.
2. Dada sessão de outra jornada, oferecer Retomar ou Arquivar; arquivar preserva tentativas e não produz conclusão.
3. Dada dimensão vencida e primeiro acerto independente, avançar um passo; dado erro ou ajuda no mesmo dia, prevalecer revisão amanhã.
4. Dado texto praticado sem evidência de referência, não copiar progresso entre dimensões.
5. Dado armazenamento indisponível ou inválido, continuar em memória com aviso; não apagar dados silenciosamente.

### US4 — Inspecionar o protótipo (P2)

Como responsável pelo piloto, quero simular cenários e exportar eventos locais para observar clareza, dificuldades e retorno.

**Teste independente**: abrir galeria, testar cada família, alterar dia virtual e exportar histórico, verificando isolamento do perfil normal.

1. Dado modo de desenvolvimento/teste, oferecer os cenários previstos e inspeção de seed, ordem, avaliações, fila e vencimentos.
2. Dada sessão ativa, mudar relógio/cenário oferece preservar ou encerrar sem modificar a sessão silenciosamente.
3. Dada galeria, as tentativas não afetam perfil normal; reset remove somente dados do GravaTexto.

### Casos de limite

Verso de duas palavras; um só verso elegível; banco incompleto; pares parcialmente desconhecidos; erro no último desafio; erro repetido; nova exposição antes de reforçar; pares parcialmente resolvidos ao recarregar; clique duplo; mudança de dia/fuso; retorno do relógio virtual; dados corrompidos ou versão incompatível; rota inexistente; sessão arquivada; verso compartilhado entre jornadas em fixture de teste.

## Requisitos

### Requisitos funcionais

**FR-001 — Conteúdo e jornadas.** Somente duas jornadas jogáveis, seis textos cada, na ordem editorial abaixo. Bíblia exclusivamente BLIVRE/TR 2018.2.0 fornecida. Fonte, licença, atribuição, recortes e ajustes devem ser acessíveis. Conteúdo permanece rascunho, sem aprovação humana implícita. As outras 14 jornadas não aparecem como jogáveis.

| Jornada | Textos em ordem |
|---|---|
| Primeiros versículos | 1 Tessalonicenses 5:16; 5:17; 1 João 4:19; Salmos 119:105; Filipenses 4:13; Provérbios 3:5 |
| Confiança e cuidado | Salmos 56:3; 121:2; 1 Pedro 5:7; Romanos 12:12; Salmos 37:5; Mateus 11:28 |

**FR-002 — Seleção e leitura.** Mostrar título, tema, seis textos, quantidade apresentada e próximo passo: Começar, Retomar, Revisar ou Praticar de novo. Antes de cobrar texto novo, apresentar leitura, referência, nota editorial e fonte, com Ler contexto usando somente os versos fornecidos. Sem contexto disponível, mostrar só a nota, sem link quebrado. Registrar apresentação mesmo que a pessoa saia antes de responder. Leitura não conta como desafio.

**FR-003 — Composição.** Retomar sessão antes de criar outra. Sem texto iniciado na jornada, escolher os primeiros dois. Nos retornos, selecionar até dois versos com dimensões vencidas, pela data mais antiga e ordem editorial no desempate, e até um novo. Sem vencidos, completar até três com conhecidos menos expostos recentemente, identificando prática livre. Sem novos/vencidos, oferecer prática livre explicitamente. Um verso ativo é permitido. Meta de oito desafios-base; alternar famílias, evitar mesmo verso consecutivo quando houver alternativa, cobrir texto e localização de cada ativo e priorizar questões menos vistas. Reutilização só depois de outras questões, com nova instância e ordem persistida. Banco incompleto pode gerar sessão menor, com motivo no painel; nunca inventar conteúdo para preencher.

**FR-004 — Puzzles e avaliação.** Não exigir digitação. Embaralhar opções e peças de forma reproduzível e persistir sua ordem. Seleção de alternativa é alterável antes de Verificar; avaliação compara identidade da resposta, não texto normalizado.

| Família | Interação e confirmação | Evidência/agendamento |
|---|---|---|
| Localização | Escolher referência; Verificar | Referência |
| Texto correspondente | Escolher texto; Verificar | Associação, somente referência |
| Lacuna | Escolher expressão; preservar prefixo/sufixo | Texto |
| Continuação | Escolher trecho; preservar texto exato | Texto |
| Ordenação | Usar todas as peças; Verificar sequência; tocar peça usada devolve e compacta | Texto |
| Pares | Selecionar texto e referência; segundo toque confirma o par | Referência, por associação |

Não criar ordenação/continuação para textos sem fixture elegível. Os dois conjuntos de pares são uma família. Todos os três membros de pares devem estar apresentados e no conjunto ativo; nunca aumentar o conjunto para acomodá-los. Acerto fecha o par; erro revela a associação correta do texto selecionado, fecha esse par como assistido e mantém os demais disponíveis. Cada erro de par enfileira localização daquele verso. Mensagens explicam a solução sem depender de som.

**FR-005 — Feedback e reforço.** Avaliar uma única vez, bloquear resposta e aguardar Continuar. Corrigir imediatamente; não pedir a mesma resposta recém-revelada. Deduplicar a fila por verso/dimensão. Após a base, selecionar no máximo três reforços: dimensão errada, prioridade a novos e depois ao erro mais antigo. Exigir dois desafios inteiros concluídos depois da última exibição da solução; nova exposição reinicia a espera. Leituras e cada par individual não contam como desafios intervenientes. Sem intervalo, revisão amanhã; não inserir preenchimento artificial. Erro no reforço encerra o item após correção. Todo erro volta amanhã. Máximo de onze desafios; rótulo de reforço separado, sem retroceder progresso-base.

**FR-006 — Revisões e evidência.** Texto e referência têm agendamentos independentes e compartilhados por verso entre jornadas. Novo texto tem primeira revisão amanhã. Dimensão vencida avança nos intervalos 1 → 3 → 7 → 14 → 30 dias somente no primeiro acerto sem ajuda nem solução previamente exposta na sessão. Erro/ajuda em qualquer avaliação do dia reinicia passo zero e fixa amanhã, mesmo após acertos. Há no máximo um avanço por dimensão/dia; falha posterior prevalece. Prática livre correta não adia revisão, falha pode antecipá-la. Dimensão sem evidência permanece pendente. Usar dias de calendário no fuso do perfil; fallback America/Sao_Paulo. Exposição da solução e reconhecimento com pistas não equivalem a recitação livre.

**FR-007 — Continuidade.** Preservar perfil anônimo local, preferências, progresso, sessões, leituras, seleções parciais, pares resolvidos, feedback, tentativas e ordens. Salvar resposta antes de avançar. Clique duplo, reload e reabertura de resultado não duplicam efeitos. Ao trocar jornada, preservar progresso e oferecer retomada/arquivamento da sessão ativa. Falha de armazenamento permite sessão em memória e aviso; recuperação preserva dados conhecidos e reset exige ação explícita. Arquivamento incompleto não produz resultado de conclusão.

**FR-008 — Resultado.** Mostrar textos praticados, acertos na primeira tentativa, dificuldades por dimensão, reforços e próximas revisões. Uma tela de pares vale um desafio e três avaliações; oito telas com uma tela de pares têm dez avaliações-base. Mostrar numerador e denominador; assistência não conta como acerto independente. Reforços são separados e não apagam falhas. Reabrir resultado salvo não recalcula revisões. Não afirmar domínio ou atribuir valor espiritual ao desempenho.

**FR-009 — Acessibilidade e estados.** Uma tarefa por vez; sem referência correta em cabeçalho, alt text, rótulo acessível ou anúncio antecipado de localização/pares. Estados: leitura, aguardando, seleção parcial, pronto, correto, incorreto, reforço, pausa e concluído. Alvos de 48 px; foco e teclado; zoom de 200%; 360/390/1440 px sem corte, rolagem horizontal ou CTA encoberto. Cor, ícone e mensagem comunicam resultado. Respeitar movimento reduzido; não sacudir tela; celebração até 800 ms e CTA disponível.

**FR-010 — Painel e eventos.** Disponível em desenvolvimento ou build de teste explícito. Avançar dia virtual/voltar ao real; reset exclusivo; galeria isolada das seis famílias; cenários: primeiro acesso, vencidos, tudo em dia, único conhecido, erros no começo/fim, mesma falha e armazenamento indisponível. Inspecionar sessão, seed, ordem, dimensão, resultado original, fila e vencimentos. Exportar histórico local com eventos e duração ativa. Troca de cenário/relógio deve oferecer preservar ou encerrar sessão. Nenhum envio externo de eventos.

### Entidades principais

Perfil local anônimo com fuso e preferências; jornada e ordem editorial; verso canônico e item de aprendizagem; puzzle e instância apresentada; sessão e modo; seleção/resposta; tentativa por dimensão; exposição de solução; fila de reforço; progresso por verso/dimensão; agregado diário; resultado salvo; evento local de avaliação e navegação.

## Critérios de sucesso

- **SC-001**: ambas as jornadas permitem seleção → leitura → desafio → resultado sem digitação, com as seis famílias acessíveis em cenários válidos.
- **SC-002**: 100% dos 12 textos e das questões utilizadas preservam fonte, recortes e reconstrução; atribuição e mudanças são acessíveis.
- **SC-003**: zero duplicações nos cenários de clique duplo, reload e reabertura; zero avanços indevidos de revisão nos casos de ajuda, erro e prática livre.
- **SC-004**: todos os casos de limite de seleção, pares, reforço, calendário e armazenamento têm resultado verificável conforme requisitos.
- **SC-005**: nenhuma rolagem horizontal, texto cortado, CTA encoberto ou resposta antecipada nas três larguras, teclado e zoom definidos.
- **SC-006**: concluir revisão do percurso com Lucas antes de piloto de 3–5 pessoas. Registrar clareza, tempo, abandono, cansaço e retorno; não inferir validade científica dessa amostra.

## Premissas e limites

Uso local, em português, por participantes do teste; um perfil por navegador, sem dados pessoais. As regras de espaçamento são hipóteses de produto. A base e este documento substituem as regras de digitação, quatro exercícios fixos e tentativa imediata do PDF. Outras 14 jornadas, login, servidor/API, sincronização, pagamento, voz/áudio, notificações, ranking, vidas, moedas/XP, conquistas e PWA completa estão fora do escopo. Não publicar automaticamente. Revisão visual e editorial humana permanecem distintas da conclusão dos artefatos SDD.

## Requisitos do refinamento
- **FR-011** Quatro opções plausíveis nas escolhas, separando distratores editoriais do texto canônico.
- **FR-012** Ordenações elegíveis com 4–7 blocos corretos e 1–3 extras; seleção/remoção, compactação e correção somente após completar espaços.
- **FR-013** Lacunas múltiplas com banco extra, iniciais com banco e digitação opcional com normalização/comparação de palavras. Nove famílias demonstráveis na galeria.
- **FR-014** Dificuldade gradual, preservando cobertura/alternância; digitação depende da preferência persistida. Sessões antigas mantêm snapshots.
- **FR-015** Motion discreto com reduced motion, montagem compacta, decoração orgânica e sequência factual de acertos sem medida de domínio.

## Requisitos de trilha e PWA

- **FR-016** Disponibilizar Hoje, Jornada, Explorar e Perfil com navegação inferior no mobile e lateral no desktop; ocultar o shell durante puzzles.
- **FR-017** Derivar duas unidades por jornada e nós lesson/checkpoint/final, com estados locked, available, in-progress, completed, mastered e review-needed a partir do progresso persistido.
- **FR-018** Ao concluir uma sessão, retornar à jornada e destacar a progressão. Checkpoint elegível abre uma sessão de consolidação no motor existente.
- **FR-019** Exibir missão diária, XP derivado de acertos independentes e sequência de dias concluídos. Métricas descrevem uso e não domínio espiritual, teológico ou pedagógico.
- **FR-020** Distribuir marca e ilustrações vetoriais em Home, jornadas, conclusão e offline; preservar identidade adulta, serena e sem clichês religiosos.
- **FR-021** Gerar PWA standalone com manifest, ícones 192/512/maskable, Apple touch icon, service worker, app shell offline, instalação discreta, atualização confirmada e safe areas.
- **FR-022** A PWA deve recarregar rotas internas offline após primeira carga, sem cachear APIs indiscriminadamente ou prometer sincronização inexistente.
