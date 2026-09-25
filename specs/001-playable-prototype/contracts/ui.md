# Contratos de navegação e interface

> Atualização implementada em 25/09/2026: [refinamento de puzzles](../refinement.md). Essa decisão substitui os trechos anteriores sobre seis famílias, todos os blocos obrigatórios e ausência absoluta de digitação. O percurso padrão segue por toque.

## Rotas

- `/`: duas jornadas. Começar se nunca iniciada; Retomar se sessão recuperável; Revisar se vencidos; para conhecidos em dia e sem novos, Praticar de novo com rótulo prática livre. Com novos restantes e sem vencidos, usar Continuar jornada. Essa ação inicia sessão com até um novo e os conhecidos elegíveis.
- `/session/:id`: leitura/tarefa/feedback/pausa do registro salvo. Sair pausa e retorna às jornadas; retomar não muda o plano. Sessão de outra jornada exige escolher retomar ou arquivar antes de criar.
- `/session/:id/result`: completed usa snapshot. Sessão ativa oferece Retomar; arquivada informa que foi encerrada sem conclusão. ID inexistente oferece Voltar às jornadas.
- Rota desconhecida: mensagem curta e retorno, sem reset.

## Puzzle

Header: Sair, modo e progresso-base atual/total real. No reforço: “Vamos reforçar · 1 de N”, com base concluída. Não usar 8 como denominador se sessão menor.

ReadingCard: texto, referência, nota da base, fonte BLIVRE, Ler contexto e Começar desafios/Continuar. Ler contexto abre painel no fluxo; disponível na leitura e após avaliação, nunca como vazamento antecipado na tarefa de referência.

Escolha: grupo de opções com seleção única, opção selecionada anunciada e Verificar habilitado só com resposta. Ordenação: peças em botões com IDs de ocorrência; sequência completa habilita avaliação. Pares: grupos “Textos” e “Referências”; segundo toque confirma, feedback identifica apenas associação avaliada. Não marcar opção correta no DOM acessível antes da avaliação.

Feedback: check + “Isso mesmo” no acerto; indicação textual de correção e “Vamos guardar esta associação” no erro; texto exato da resposta. Resposta bloqueada até Continuar. Foco vai ao feedback, depois à instrução da próxima tela; anúncios não revelam outra pergunta. Esc/fechar painel devolve foco ao controle que o abriu.

## Persistência e avisos

Aviso visível em memória: “Seu progresso está disponível nesta sessão, mas não será salvo neste navegador.” Dados inválidos não são apagados. Erros de conteúdo mostram mensagem e retorno às jornadas, sem exibir questão quebrada.

## Resultado

Título, textos praticados, X de Y corretas na primeira tentativa, dificuldades de texto/referência, reforço separado e próximas revisões. Assistido é explicitado. Botão Voltar às jornadas sempre disponível. Sem recompensa recalculada nem alegação de domínio.

## Painel

Acesso secundário apenas no ambiente habilitado. Ações: avançar dia, voltar ao real, reset explícito, cenário, família e exportar. Preservar sessão mantém seu clock_config; encerrar arquiva. Galeria/scenários têm identificação visível e estado próprio. Inspeção técnica pertence somente ao painel, não ao fluxo normal.
