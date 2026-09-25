# Verificações — implementação e refinamento
Data: 2026-09-25. App implementado e build local gerada; sem publicação.

## Conteúdo e preservação
26 checksums originais conferidos; base intacta. 12 textos, 55 contextos, 92 exercícios e dez ordenações refinadas. Verificados hashes, Unicode, opção correta, IDs, recortes e reconstrução. Dados didáticos continuam rascunho; a qualidade pedagógica dos distratores exige revisão humana.

## Execução automatizada
- npm run content:check: integridade e adaptação.
- npm run typecheck: TypeScript strict.
- npm run lint: ESLint.
- npm test: 28 testes unitários em cinco arquivos.
- npm run test:e2e: 14 testes em Chromium e WebKit.
- npm run build: Vite, bundle pronto em dist.

Unitários cobrem calendário, revisão por dimensão, erro prevalente, exposição, intervalo de reforço, elegibilidade de pares, idempotência, armazenamento bloqueado/corrompido/incompatível/quota/conflito, quatro alternativas, peças extras, normalização e palavras repetidas.
Navegador cobre duas jornadas completas, seleção/feedback com reload, pares parcialmente resolvidos com reload, teclado, lacunas e digitação, galeria isolada, exportação, erro final, 360/390/1440 px, movimento reduzido e ausência de overflow.
O reflow de 720 px a 200% é verificado em viewport de 360 CSS px. Isso não substitui testar zoom nativo em um dispositivo real.

## Revisão visual
Capturas locais em .impeccable/review: desktop, mobile, order-mobile e result-mobile. Revisão independente pediu remover o contador visual redundante da ordenação; contador foi mantido apenas para tecnologia assistiva. Nunito e ilustrações SVG são locais; nenhum raster externo foi distribuído.
Detector de UI: relevo inferior das peças mantido por requisito; animação de largura substituída por transform/scaleX.
A conexão do Browser integrado falhou por restrição de importação node:process. Testes e capturas foram realizados pelo Playwright local.

## Limites e riscos conhecidos
- Não realizados: revisão editorial humana, uso real com leitor de tela, zoom nativo/dispositivos físicos, percurso assistido com Lucas e piloto 3–5 pessoas.
- Nenhuma conclusão de domínio/memorização ou eficácia pedagógica.
- localStorage sem sincronização; armazenamento indisponível usa memória com aviso. Exportação local é o mecanismo de extração.
- Snapshots antigos preservados; curadoria nova afeta novas sessões.
- Build informa aviso de chunk JS acima de 500 kB (aproximadamente 141 kB gzip); não impede execução. Não foi adicionado pacote de animação.
- Sem drag-and-drop/revelação progressiva: interação por toque/teclado e banco de iniciais atende ao escopo entregue.

A verificação SDD anterior permanece em verification-results.json como registro histórico; não substitui estes resultados de aplicação.

Evidência resumida: [application-verification.json](application-verification.json). Revisão visual final: disposition ship após correção, registrada em .impeccable/review/verdict.md.

## Trilha e PWA - 25/09/2026

- TypeScript, ESLint e 32 testes unitários passaram; quatro testes novos cobrem desbloqueio, checkpoint persistido, XP e sequência.
- 16 execuções de navegador passaram: oito fluxos em Chromium e oito em WebKit, incluindo Home/trilha mobile e todas as regressões anteriores.
- Build PWA gerou `manifest.webmanifest`, `sw.js`, Workbox, 33 entradas de precache e chunks lazy das novas rotas.
- `npm run test:pwa` confirmou manifest standalone, três ícones acessíveis, service worker controlando a página e reload de `/journey/first-verses` sem rede.
- Capturas em 320, 390, 430 e 1440 px não apresentaram overflow horizontal; `prefers-reduced-motion` foi aplicado. A revisão independente pediu alinhar os conectores da trilha aos marcos e retirar o rótulo redundante do cabeçalho; ambos foram corrigidos e recapturados.
- Checkpoints agora possuem marco persistido próprio e só aparecem concluídos depois da prática iniciada pelo respectivo nó.
- Os quatro PNGs instaláveis carregam metadados de procedência e a varredura final retornou zero imagens sem origem registrada.
- O chunk base segue acima de 500 kB bruto (cerca de 141 kB gzip), principalmente pelo domínio e validação já existentes. Novas rotas foram separadas em chunks de 1-5 kB.
- Pendentes: instalação em Safari/Chrome físicos, auditoria Lighthouse externa, leitor de tela real e revisão humana da marca/ilustrações.
