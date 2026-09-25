# Evolução de gamificação, trilha e PWA - 25/09/2026

Decisão mais recente: `/Users/lucasz/Downloads/codex_gamificacao_trilha_pwa.md`. As instruções do documento foram adaptadas ao produto implementado e à constituição do GravaTexto.

## Identidade

- O PDF histórico não contém arquivo de logo incorporado. A decisão posterior do usuário substitui o símbolo de livro pela marca sorridente verde fornecida, redesenhada fielmente como vetor local em `src/assets/brand/mark.svg`.
- A nova marca alimenta favicon, Apple touch icon, ícones 192/512 e maskable. Nunito Sans, papel e verde foram preservados.
- Ilustrações originais leves foram organizadas em `src/assets/illustrations`, `journey` e `rewards`. Folhas, caminhos e marcos substituem clichês religiosos.

## Produto e trilha

- Quatro destinos: Hoje, Jornada, Explorar e Perfil. No desktop a navegação é lateral; até 1023 px, inferior com safe area.
- Cada jornada possui duas unidades, três lições e um checkpoint/final por unidade. O modelo está em `src/journey/model.ts`; JSX apenas renderiza seus dados.
- Estados derivados do progresso persistido: locked, available, in-progress, completed, mastered (mostrado como "Muito praticado") e review-needed.
- Uma lição disponível abre o motor de sessão existente. Concluir retorna à trilha e ativa uma animação única do próximo estado. Checkpoints iniciam uma prática de consolidação quando elegíveis.
- XP é derivado: 10 por avaliação-base correta e independente, 5 por reforço correto. Erro, ajuda e repetição não geram XP. Sequência conta dias de sessões concluídas. Nenhuma métrica afirma espiritualidade, teologia ou memorização.

## PWA

- `vite-plugin-pwa` gera manifest e service worker Workbox, com app shell e assets estáticos em cache. Não há cache de API.
- Manifest: standalone, portrait-primary, cores da marca, ícones 192/512/maskable. Meta tags Apple/mobile e viewport-fit estão no HTML.
- Instalação aparece discretamente no Perfil quando `beforeinstallprompt` existe e some em standalone/iOS instalado.
- Atualização exige ação no aviso; nunca recarrega durante exercício sem confirmação. Offline-ready também é informado.
- O app e seu conteúdo empacotado funcionam offline após a primeira carga. A rota `/offline` explica o estado e oferece nova tentativa; não promete sincronização remota.

## Limites

Não foram criados login, conta, backend, moedas, ranking, áudio, notificações ou sincronização. Checkpoints usam o mesmo motor determinístico, sem alegar teste pedagógico de domínio. A revisão humana de ilustrações, marca, conteúdo e uso com tecnologias assistivas continua pendente.
