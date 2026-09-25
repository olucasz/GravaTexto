# GravaTexto — entrada para o Codex e fluxo SDD

Versão 0.1 · 25/09/2026 · Escopo: protótipo local para testar jornadas, puzzles e sessões diárias.

Este documento reúne a opção de SDD pesquisada, instruções para instalá-la e a especificação de entrada do protótipo. Não é uma skill instalada, nem contém uma cópia modificada do Spec Kit. A instalação ocorrerá no computador/projeto em que Lucas usa o Codex.

## 1. Ferramenta escolhida e instalação

**GitHub Spec Kit**, repositório oficial `github/spec-kit`. Ele oferece um fluxo de especificação, plano e tarefas com integração para Codex. Versão consultada: **v1.0.11**, publicada em 24/09/2026. A integração `codex` instala skills em `.agents/skills`; a invocação é `$speckit-<comando>` no chat do Codex. [1–4]

### No terminal do Mac

Pré-requisitos: Codex configurado, Git, Python 3.11+ e `uv`. Se já usa Homebrew e falta `uv`, instalar com `brew install uv`; para outros meios, consultar a instalação oficial do uv. [2, 6]

```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.0.11
specify version
```

Criar um projeto **novo**, a partir da pasta onde deseja guardá-lo:

```bash
specify init gravatexto --integration codex --script sh
cd gravatexto
```

Se a pasta/projeto já existir, não criar outro por cima: inspecionar seu conteúdo e o `specify init --help`, depois seguir o guia oficial para projeto existente. Não usar `--force` automaticamente. [7]

O instalador depende de acesso ao GitHub. A versão da CLI foi fixada; registrar também a versão dos templates que o comando efetivamente baixar. Se `specify` não estiver no PATH, usar a orientação do `uv` para o diretório de executáveis. Se a instalação existente conflitar, conferir sua versão antes de substituí-la.

Na raiz do projeto, colocar:

- este arquivo: `gravatexto-codex-sdd-prototipo-v0.1.md`;
- o pacote `gravatexto-base-v0.1.zip`, já entregue;
- o PDF `bible_memory_ux_blueprint.pdf`, opcional como referência histórica.

Extrair o ZIP, preservando a pasta `gravatexto-base-v0.1/`. Abrir o Codex nessa raiz. Conferir as skills no seletor (`/skills` no CLI, ou `$`); se não aparecerem, reiniciar a sessão. [5]

**Não copiar apenas um SKILL.md avulso do Spec Kit:** utilizar o instalador, que fornece também os arquivos necessários ao fluxo. Não executar os comandos `$speckit-*` no terminal do sistema: são mensagens para o agente.

### Como combinar SDD e Plan Mode

Plan Mode pode servir para a avaliação inicial, sem gravar arquivos. A criação de `spec.md`, `plan.md` e `tasks.md` precisa de uma sessão/modo que permita escrita. `$speckit-plan` é uma skill que produz artefatos; não é um sinônimo do modo de planejamento do Codex.

Usar um ciclo curto para **uma única feature**, `001-playable-prototype`. Não abrir uma feature por botão ou por puzzle.

## 2. Mensagem inicial para colar no Codex

```text
Leia integralmente gravatexto-codex-sdd-prototipo-v0.1.md e inspecione o projeto, suas instruções AGENTS.md e a base gravatexto-base-v0.1.

Prepare a especificação SDD do protótipo jogável do GravaTexto usando o GitHub Spec Kit. Caso não esteja instalado, confira e siga a seção de instalação deste documento, respeitando os arquivos existentes e as permissões do ambiente.

Nesta primeira etapa, produza a especificação, o plano técnico, as tarefas e uma proposta de direção visual para seleção de jornada, puzzle e resultado. Não implemente o app ainda. Se o modo atual não permitir gravar esses artefatos, apresente a proposta no chat e informe a necessidade de mudar para um modo com escrita.

Use este documento como decisão mais recente para o escopo e o comportamento. O texto bíblico vem exclusivamente da base fornecida. As regras antigas de digitação e tentativa imediata do PDF foram substituídas.

Resolva escolhas rotineiras com os padrões aqui definidos. Pergunte apenas sobre lacunas que impeçam o trabalho. Não reabra escolhas já documentadas. Ao final, apresente o plano e as decisões visuais para revisão antes da implementação.
```

### Sequência de uso das skills no chat

Enviar uma mensagem por vez, depois de a anterior concluir. Os nomes abaixo correspondem à integração Codex consultada; se o seletor local mostrar diferenças, conferir a instalação em vez de inventar comandos. [3, 4]

```text
$speckit-constitution Defina princípios enxutos para o GravaTexto: fidelidade ao texto bíblico, mobile-first, interação acessível, escopo pequeno, lógica de sessão determinística e testes das regras críticas. Use gravatexto-codex-sdd-prototipo-v0.1.md. Preserve instruções existentes.
```

```text
$speckit-specify Especifique a feature 001-playable-prototype usando os requisitos de produto e critérios de aceite de gravatexto-codex-sdd-prototipo-v0.1.md. Considere a base fornecida e registre as regras que substituem o blueprint anterior.
```

```text
$speckit-plan Planeje a implementação com as escolhas técnicas deste documento e o projeto existente. Inclua motor de sessões, adaptação dos dados, persistência, testes, direção visual e ordem de entrega. Não implemente o app nesta etapa.
```

```text
$speckit-tasks Gere tarefas pequenas por resultado jogável, com os testes das regras críticas ligados às respectivas tarefas. Não adicione backend ou recursos fora de escopo.
```

Usar `$speckit-analyze` para confrontar os artefatos antes de implementar. Depois de Lucas revisar o plano, executar:

```text
$speckit-implement Implemente a feature aprovada por etapas, concluindo o fluxo jogável e validando os critérios definidos. Preserve o texto bíblico, registre ajustes editoriais e verifique mobile e desktop. Ao terminar, entregue instruções para executar e testar o protótipo localmente.
```

O README e a documentação gerados pelo fluxo devem ficar em português; identificadores de código em inglês. Não publicar o protótipo automaticamente.

## 3. Objetivo e precedência das decisões

Criar uma experiência curta que permita escolher uma jornada, conhecer textos bíblicos, responder puzzles variados, receber feedback, reencontrar erros e voltar no dia seguinte. Validar diversão, clareza e associação texto–referência.

Não estamos implementando o aplicativo completo do PDF. A aparência do PDF é um ponto de partida, não o acabamento visual aprovado.

Precedência de conteúdo:

1. Pedidos mais recentes de Lucas e este documento para regras de produto.
2. `translation.json` e `verses.json` para edição, licença e texto-fonte.
3. `learning_items.json` para recortes e apresentação documentada.
4. Puzzles e política JSON como fixtures iniciais; ajustar sua execução conforme esta especificação.
5. PDF como histórico e referência geral, sem restaurar regras substituídas.

Essa precedência não substitui regras de segurança, permissões ou instruções aplicáveis do ambiente.

| Decisão anterior | Decisão deste protótipo |
|---|---|
| Digitação livre obrigatória | Nenhum puzzle depende de teclado de texto |
| Sequência fixa de quatro exercícios por verso | Seis famílias, elegíveis conforme texto e histórico |
| Tentar de novo imediatamente após mostrar solução | Corrigir agora; recuperar mais tarde, após outros desafios |
| Concluir equivale a memorizar | Concluir representa prática; reconhecimento não prova recitação |
| App completo com login e perfil | Seleção, sessão, resultado e painel de teste local |
| Porcentagem de domínio | Indicadores factuais de prática, sem probabilidade inventada |

## 4. Escopo fechado

### Incluído

- Duas jornadas: `first-verses` e `trust-and-care`, seis versículos cada.
- Cartão de leitura, referência, contexto e fonte BLIVRE antes do primeiro desafio de um texto novo.
- Seis famílias de puzzles, avaliação e feedback.
- Sessões geradas com histórico local, datas e regras explícitas.
- Retomada de sessão após recarregar ou fazer uma pausa.
- Resultado com primeira tentativa, reforço e próximas revisões.
- Progresso por texto e referência, compartilhado entre jornadas quando reutilizarem um verso.
- Painel de desenvolvimento para simular dias e cenários.
- Registro e exportação local de eventos para avaliação do protótipo.
- Visual responsivo com estados completos e animações funcionais.

### Fora desta entrega

Login, API, servidor, sincronização entre dispositivos, painel administrativo, pagamento, voz, áudio bíblico, notificações, ranking, vidas, loja, moedas, XP, conquistas e PWA com offline completo. A recorrência diária será validada por datas e revisões, sem depender de uma economia de pontos.

As outras 14 jornadas ficam no pacote de conteúdo, sem botão que finja que estão jogáveis nesta versão.

## 5. Dados e integridade editorial

Entrada principal: `gravatexto-base-v0.1/data/mvp-bundle.json`. A estrutura real contém `translation`, `collections`, `journeys`, `units`, `unit_verses`, `verses`, `learning_items`, `puzzles` e `policy`. Ler o arquivo antes de criar tipos ou adaptadores.

Não importar a Bíblia completa no bundle inicial do navegador. O SQLite é uma referência de conteúdo, não uma dependência do frontend. O JSON pequeno contém os 12 versos e 60 questões necessárias ao protótipo.

Antes de implementar:

- Conferir IDs, referência, recorte e alternativas dos 12 textos.
- Revisar semanticamente os blocos de ordenação; os cortes atuais são automáticos e podem ser pouco naturais.
- Preservar a edição BLIVRE/TR 2018.2.0, atribuição e texto-fonte.
- Não reescrever versos por memória nem atualizar para outra tradução.
- Conservar registro dos ajustes didáticos: títulos excluídos, colchetes de apresentação e espaços.
- Registrar correções de alternativas/fragmentos em um changelog do conteúdo, sem marcar uma revisão humana como feita pelo agente.
- Manter `editorial_status = draft` e `production_ready = false` enquanto a curadoria humana não ocorrer. O protótipo pode operar com esses dados; não transformá-los em conteúdo aprovado silenciosamente.

Os offsets da base usam pontos de código Unicode e fim exclusivo. Em JavaScript, converter com `Array.from` antes de aplicar esses offsets. IDs de peças e palavras devem distinguir ocorrências repetidas.

Não inventar contexto de versos. O MVP bundle contém notas e IDs de contexto, mas não todos os textos adjacentes. Para oferecer “Ler contexto”, criar no build uma pequena seleção desses IDs a partir de `verses.json`, sem carregar os 31 mil textos no cliente. Sem esse subconjunto, mostrar apenas a nota editorial, sem links quebrados.

## 6. Telas e fluxo

### A. Seleção de jornada — `/`

Duas opções visuais distintas. Cada uma mostra título, tema, seis textos, quantidade já apresentada e próximo passo. Jornada nunca iniciada: “Começar”. Com sessão em andamento: “Retomar”. Sem pendências: “Praticar de novo”, identificado como prática livre.

Selecionar a jornada gera uma sessão apenas quando não existir uma sessão ativa recuperável. Trocar de jornada mantém progresso anterior. Se houver sessão ativa de outra jornada, oferecer retomá-la ou arquivá-la; não apagar tentativas já registradas.

### B. Sessão — `/session/:id`

Header com sair, progresso dos exercícios-base e modo da sessão. Área central com uma tarefa por vez. CTA principal fixado com safe area, sem cobrir opções. Cartões de leitura não contam nos oito desafios.

Estados explícitos: leitura, aguardando resposta, seleção parcial, pronto para verificar, feedback correto, feedback incorreto, reforço, pausa e concluído. A resposta fica bloqueada após avaliação; Continuar avança. Clique duplo não avalia duas vezes.

Exercícios normais mostram referência quando ajudam a memorizar o texto. `locate_reference` e `match_pairs` não podem vazar a resposta correta em cabeçalho, alt text, aria-label ou mensagem acessível.

### C. Resultado — `/session/:id/result`

Mostrar textos praticados, acertos de primeira tentativa, dificuldades em texto/referência e o que será revisto. Distinguir “acertei de primeira” de “acertei no reforço”. Nunca substituir o erro original no histórico.

Mensagem acolhedora, animação breve e botão Voltar às jornadas. Sessão arquivada incompleta não produz resultado de conclusão. Resultado já salvo deve abrir sem recalcular recompensas ou revisões.

## 7. Regras dos puzzles

| Família | Interação | Condição de resposta |
|---|---|---|
| Localização | Selecionar uma referência para o texto exibido | Uma opção escolhida; confirmar por ID |
| Texto correspondente | Selecionar o texto de uma referência | Uma opção escolhida; confirmar por ID |
| Lacuna | Escolher a palavra/expressão que falta | Uma opção escolhida; preservar prefixo e sufixo |
| Continuação | Escolher o trecho que vem depois | Uma opção escolhida; preservar o texto exato |
| Ordenação | Tocar em blocos para construir a passagem | Todas as peças usadas; comparar IDs em ordem |
| Pares | Tocar um texto e depois uma referência | Segundo toque confirma esse par |

Regras comuns:

- Embaralhar opções de forma determinística com seed por sessão e instância do puzzle. A base armazena o acerto primeiro; nunca exibir essa ordem diretamente.
- Persistir a ordem apresentada. Recarregar não reposiciona opções nem gera uma questão diferente.
- Durante seleção de alternativas, permitir trocar a opção antes de Verificar.
- Ordenação: tocar num bloco usado devolve-o ao banco e compacta a sequência. Arrastar pode ser adicionado, mas tocar deve resolver tudo.
- Não exibir ordenação/continuação para versos curtos sem questão elegível no banco. “Orai sem cessar” não precisa virar três peças artificiais.
- `match_pairs_1` e `match_pairs_2` são conjuntos da mesma família, não dois tipos diferentes para a regra de alternância.
- Pares: só selecionar conjuntos com três textos já apresentados. No primeiro dia, com dois novos, não há pares elegíveis.
- Em pares, o acerto fecha o par. O erro mostra a associação correta e fecha aquele par como assistido, sem prender a pessoa; enfileirar o verso envolvido para reforço de localização. Registrar os resultados por par.
- Explicar a resposta correta com texto curto. Som não é necessário para reconhecer o resultado.

**Contagem:** uma tela de pares é um desafio, mas contém três tentativas avaliáveis. O resultado calcula precisão sobre tentativas avaliáveis e informa o denominador. O progresso 1/8 conta telas, não pares. Tentativas assistidas não entram como acertos independentes.

O tipo `identify_text` está marcado `text_reference` na base. No adaptador do protótipo, armazenar a evidência como associação e agendar na dimensão `reference`; não avançar também `text`. Documentar esse mapeamento.

## 8. Motor da sessão diária

Implementar como funções puras, separadas dos componentes. Relógio e gerador pseudoaleatório devem ser injetáveis para testes. As decisões abaixo são hipóteses de produto para este protótipo.

### Seleção dos textos

1. Procurar sessão ativa e retomar antes de gerar outra.
2. Sem nenhum texto iniciado naquela jornada: escolher os primeiros dois na ordem editorial.
3. Nos retornos: selecionar até dois versos com dimensões vencidas, por data mais antiga; desempatar pela ordem editorial. Depois adicionar até um novo verso.
4. Sem revisão vencida: completar o conjunto, até três versos, com textos conhecidos de menor exposição recente, como prática livre. Não antecipar seus vencimentos por isso.
5. Sem nenhum novo ou vencido: oferecer prática livre explicitamente, usando até três conhecidos.
6. Um único verso ativo é permitido. Não inventar outros versos para preencher a sessão.

Para cada novo verso, apresentar leitura e contexto antes de sua primeira pergunta. Se o usuário sair depois da leitura, manter `introduced_at`; não afirmar que concluiu a aprendizagem.

### Seleção das perguntas

- Meta: oito desafios-base.
- Alternar famílias; evitar repetir o mesmo verso consecutivamente quando houver outro elegível.
- Cobrir texto e localização de cada verso ativo quando houver questões elegíveis.
- Preferir questões menos vistas antes de reutilizar.
- Embaralhar a seleção com seed e persistir a sessão completa ao criá-la.
- Conjuntos de pares só entram se todos os membros estiverem introduzidos e no conjunto ativo; não ultrapassar o limite de três versos por causa de um par.
- É permitido repetir uma questão depois de outras, com nova instância e nova ordem de opções; não reduzir a sessão a repetir oito vezes um único formato.
- Se uma base incompleta não permitir alternância, gerar uma sessão menor e registrar o motivo no painel; não criar perguntas sem conteúdo validado.
- Os exemplos de `examples/sessions.json` demonstram composição. Não reproduzi-los como calendário fixo de todos os usuários.

### Feedback e retomada de erros

Após confirmar, mostrar feedback imediatamente. No erro, revelar a solução e oferecer Continuar. Não pedir a mesma resposta imediatamente após exibi-la.

Manter uma fila deduplicada por `(verse_id, dimension)`. Para `identify_text`, usar `reference`; para pares, enfileirar cada associação errada separadamente. O reforço precisa testar a dimensão errada.

Após as perguntas-base, selecionar até três itens de reforço. A nova tentativa precisa ter pelo menos dois desafios concluídos entre a última exibição da correção daquele verso/dimensão e o reforço. Uma pergunta interveniente que mostre de novo a resposta reinicia esse intervalo. Priorizar erros de textos novos e depois a ocorrência mais antiga.

Se um erro ocorrer perto do fim e não houver intervalo suficiente, deixá-lo para a revisão do próximo dia; não inserir perguntas artificiais só para preencher espera. Todo erro, reforçado ou não, volta no dia seguinte. Se errar no reforço, corrigir, continuar e encerrar esse item na sessão.

Progresso-base não retrocede ao entrar no reforço. Trocar o rótulo para “Vamos reforçar · 1 de N”. Máximo de onze desafios no total.

## 9. Revisões e persistência

Usar um perfil local anônimo, sem dados pessoais. Chave de progresso: `(local_profile_id, translation_id, verse_id, dimension)`; dimensão `text` ou `reference`.

Os exercícios fornecem evidência de **reconhecimento ou reconstrução com pistas**. Não afirmar recuperação livre, domínio científico ou memorização garantida.

Política inicial:

- Novo texto tem sua primeira revisão no dia seguinte.
- Para dimensão que estava vencida: acerto de primeira tentativa, sem ajuda e sem exposição prévia da solução na sessão, avança um passo nos intervalos 1 → 3 → 7 → 14 → 30 dias; manter 30 no limite.
- Erro ou ajuda em qualquer avaliação daquela dimensão no dia fixa próximo vencimento em amanhã e reinicia o passo em 0, mesmo que acerte o reforço.
- Apenas uma atualização de agendamento por dimensão por dia. Acertos adicionais de prática livre não adiam uma revisão; falhas podem antecipá-la para amanhã.
- Uma dimensão sem evidência continua pendente; não copiar resultado da outra dimensão.
- Na prática do dia seguinte, se já mostrou o texto em uma leitura ou outro puzzle que entrega a resposta, o acerto seguinte não conta como primeira recuperação para avançar o intervalo.

Datas são dias de calendário no fuso do perfil; detectar o fuso do navegador e usar America/Sao_Paulo como fallback. Somar dias de calendário, não blocos fixos de 24 horas. O painel usa um relógio virtual separado; não altera o relógio do sistema.

Guardar em `localStorage` com chave exclusiva do GravaTexto e `schema_version`: perfil, preferências, progressos, sessões, tentativas e seed/ordens das perguntas. Salvar respostas antes de avançar. Uma função única aplica atualizações de progresso por evento, com IDs idempotentes.

Tratar armazenamento indisponível/corrompido: manter sessão em memória e avisar que não persistirá, sem travar. Migração de versão deve preservar os dados conhecidos; reset de progresso só por ação explícita. O reset remove apenas as chaves do GravaTexto.

## 10. Direção visual a desenvolver

O blueprint é funcional, mas ainda pobre como acabamento. Produzir uma interface que pareça um app educacional cuidado, com personalidade e reação às ações.

Referência de comportamento: Duolingo. Linguagem própria: GravaTexto. Não copiar coruja, ilustrações, marca ou layout pixel a pixel.

Proposta inicial:

- Fundo papel claro, texto escuro, verde profundo como identidade e verde broto para destaques.
- Títulos arredondados e legíveis; Nunito Sans como candidata, com fallback de sistema. Confirmar licença e método de carregamento se incluída.
- Botões sólidos com relevo inferior discreto; peças com borda e estados claros.
- Ilustrações simples e originais que diferenciem as duas jornadas; evitar repetir cards genéricos com ícones aleatórios.
- Versículo como foco visual, com largura confortável e tipografia maior que instruções auxiliares.
- Tela de puzzle sem sidebar ou navegação global competindo com a tarefa.
- Acerto: check, cor e mensagem. Erro: correção legível e tom acolhedor. Resultado: celebração breve, sem atribuir valor espiritual à pontuação.
- Mobile de referência: 390 px; testar também 360 px e desktop 1440 px. Alvos de toque de pelo menos 48 px, safe areas e zoom de 200%.

Produzir tokens e estados de seleção, puzzle e resultado antes de multiplicar componentes. Documentar a direção em `design-direction.md` dentro da feature. O documento atual não inclui novos mockups visuais aprovados; não afirmar que essa aprovação já ocorreu.

### Movimento

| Ação | Movimento proposto |
|---|---|
| Pressionar botão | Deslocamento de 2–3 px, 80–120 ms |
| Selecionar alternativa | Borda/fundo, 120–160 ms |
| Inserir/remover bloco | Transição de posição, 160–220 ms |
| Resolver um par | Destaque e assentamento, até 200 ms |
| Feedback | Entrada de 8 px com fade, 180 ms |
| Avançar progresso | Preenchimento, 250 ms |
| Concluir sessão | Celebração original, até 800 ms, CTA disponível |

Respeitar `prefers-reduced-motion`: retirar deslocamentos, partículas e bounce; trocar para estados estáticos ou fade curto. Foco visível e anúncios acessíveis devem comunicar o mesmo resultado. Não sacudir a tela no erro.

## 11. Arquitetura técnica proposta

Se já houver projeto, aproveitar sua estrutura e versões compatíveis. Se começar do zero: React + TypeScript + Vite; React Router para navegação; CSS ou Tailwind conforme padrão adotado. Usar uma única solução leve de animação quando CSS não bastar. Não instalar bibliotecas por antecipação.

Separar responsabilidades:

- `content`: tipos, validação e adaptação do bundle.
- `session`: seleção, elegibilidade, seed, fila de reforço e máquina de estados.
- `evaluation`: comparação por ID/ordem e avaliação por par.
- `progress`: datas, evidência por dimensão e atualização idempotente.
- `storage`: persistência versionada e recuperação.
- `ui`: componentes e telas.
- `devtools`: cenários e inspeção, sem contaminar regras de negócio.

SOLID de forma prática: componentes não escolhem revisões nem calculam intervalos; funções de domínio recebem dependências explícitas; não criar classes e interfaces sem necessidade. Dados e resultado de avaliação não devem depender de animações.

## 12. Painel de teste

Disponível em desenvolvimento ou build explicitamente habilitado para testes. Não é painel administrativo.

Controles:

- Avançar um dia virtual e voltar ao dia real.
- Reiniciar apenas o progresso do GravaTexto.
- Abrir qualquer família de puzzle com fixture adequada.
- Carregar cenários: primeiro acesso, revisões vencidas, tudo em dia, só um verso conhecido, erros no começo/fim, mesma falha repetida e armazenamento indisponível.
- Mostrar sessão, seed, ordem das questões, dimensão avaliada, resultado original, fila de reforço e próximos vencimentos.
- Exportar histórico em JSON local.

Modo de galeria de puzzles fica isolado do perfil normal. Ao trocar relógio/cenário, oferecer encerrar ou preservar a sessão ativa; não alterar seus dados enquanto ela roda.

## 13. Critérios de aceite e testes

### Funcionais

- [ ] As duas jornadas abrem com seus textos corretos; outras não aparecem como jogáveis.
- [ ] Todo novo texto passa por leitura antes de ser cobrado.
- [ ] Não é possível confirmar alternativa vazia ou ordenação incompleta.
- [ ] As seis famílias são acessíveis em cenários válidos; não precisam aparecer todas no primeiro dia.
- [ ] Opções são embaralhadas e sua ordem resiste a reload.
- [ ] Feedback é imediato; a fila de erros respeita dimensão, intervalo e limite.
- [ ] Erro no último desafio segue para amanhã quando não cabe reforço válido.
- [ ] Pares avaliam e registram cada associação; não distorcem o denominador do resultado.
- [ ] Clique duplo, reload e reabertura do resultado não duplicam tentativas ou progresso.
- [ ] Texto e referência têm agendamentos separados; erro não é apagado por reforço correto.
- [ ] Virada de dia, simulação e retorno à data real produzem resultados previsíveis.
- [ ] Trocar de jornada não apaga aprendizagem do verso.
- [ ] Referência correta não vaza nos exercícios de localização.
- [ ] Licença, tradução e transformações de apresentação estão acessíveis.

### Verificação técnica

Usar testes unitários para regras de seleção/elegibilidade, avaliação, reforço, calendário e idempotência. Casos de limite são obrigatórios: verso de duas palavras, erro na última questão, erro repetido, conjunto de pares parcialmente desconhecido e dados persistidos inválidos.

Usar testes de fluxo no navegador para: primeira sessão; erro com retomada; refresh no meio; próximo dia; toque/teclado em ordenação e pares. Validar renderização mobile/desktop e ausência de rolagem horizontal, texto cortado ou CTA encoberto. Não criar dezenas de snapshots que apenas espelham o JSX.

Relatar verificações executadas e limitações reais. Teste de software não substitui aprovação editorial nem validação pedagógica.

### Teste com pessoas

Primeiro testar o percurso completo com Lucas. Depois fazer um piloto pequeno, por exemplo com 3–5 pessoas, sem tratar a amostra como comprovação científica.

Observar: entendimento da instrução sem ajuda; tempo por desafio; erros por dimensão; abandono; repetição cansativa; retorno no dia seguinte; reconhecimento de texto e referência antes de mostrar pistas. Registrar comentários e ajustar uma hipótese por vez.

## 14. Ordem de entrega e conclusão

1. Inspecionar projeto, conteúdo e instalar/configurar SDD quando necessário.
2. Fechar spec, plano, tarefas e direção visual para revisão de Lucas.
3. Após aprovação: implementar domínio + persistência e um caminho completo com localização.
4. Adicionar as outras famílias e os reforços.
5. Integrar resultados, painel de testes, movimento e acessibilidade.
6. Executar os critérios e entregar o protótipo local jogável.

Entrega esperada: código organizado; instruções de execução; comandos de teste; fixtures e cenários; changelog editorial; registro dos testes; limitações. Não encerrar com telas bonitas sem motor de sessão, nem com um motor que só funciona no console.

## 15. Fontes consultadas

Referências de instalação e integração verificadas em 25/09/2026. Não foram executadas na máquina de Lucas.

1. GitHub Spec Kit: https://github.com/github/spec-kit
2. Instalação: https://github.github.io/spec-kit/installation.html
3. Integração Codex: https://github.github.io/spec-kit/reference/integrations.html
4. Fluxo e comandos: https://github.github.io/spec-kit/reference/agentic-sdd.html
5. Skills no Codex, documentação oficial OpenAI: https://learn.chatgpt.com/docs/build-skills
6. Instalação do uv: https://docs.astral.sh/uv/getting-started/installation/
7. Projeto existente: consultar o link “existing-project guide” no guia oficial de instalação, preservando arquivos atuais.
8. Release fixada: https://github.com/github/spec-kit/releases/tag/v1.0.11
