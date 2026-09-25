# GravaTexto
Protótipo jogável e PWA, React + TypeScript + Vite. Duas jornadas, 12 textos bíblicos, trilhas persistentes e 92 exercícios em nove famílias. O texto correto vem exclusivamente da base BLIVRE/TR 2018.2.0.

## Executar
Requer Node 22.12+ (validado com Node 24.14.0) e npm.
```sh
npm ci
npm run dev
```
Abra http://127.0.0.1:5173. Para a versão de produção local:
```sh
npm run build
npm run preview
```
Nenhuma publicação é automática. O painel de teste aparece em desenvolvimento; build de teste explícito: `VITE_ENABLE_DEVTOOLS=true npm run build`.

## O que funciona
- Seleção de jornada, leitura e contexto, desafios, feedback, reforço espaçado, resultado e revisões por texto/referência.
- Localização, texto correspondente, lacuna, continuação, ordenação, pares, lacunas múltiplas, iniciais e digitação opcional.
- Distratores plausíveis preparados em dados; ordenações com 4–7 blocos corretos e duas peças extras.
- Sessão, seleção e feedback persistidos; pausa, retomada e arquivamento. Resultados não reavaliam tentativas.
- Calendário local, cenários isolados, galeria das nove famílias, exportação JSON e reset exclusivo.
- Toque/teclado, fonte local, movimento reduzido, motion das peças e sequência discreta de acertos.
- Home com missão diária, trilha por jornada, checkpoints, XP factual e navegação responsiva.
- PWA instalável com manifest, ícones, service worker, funcionamento offline, atualização confirmada e safe areas.

## Verificar
```sh
npm run content:check
npm run typecheck
npm run lint
npm test
npx playwright install chromium webkit
npm run test:e2e
npm run build
npm run test:pwa
```
Veja evidências e limites em [verification.md](specs/001-playable-prototype/verification.md).

## Documentação
[Especificação](specs/001-playable-prototype/spec.md) · [Plano](specs/001-playable-prototype/plan.md) · [Tarefas](specs/001-playable-prototype/tasks.md) · [Trilha e PWA](specs/001-playable-prototype/gamification-pwa.md) · [Refinamento implementado](specs/001-playable-prototype/refinement.md) · [Sistema visual implementado](DESIGN.md) · [Direção visual](specs/001-playable-prototype/design-direction.md) · [Guia de teste local](specs/001-playable-prototype/quickstart.md).

## Conteúdo e limites
A base original permanece intacta em `gravatexto-base-v0.1/`, com 26 checksums verificados. Distratores editoriais ficam separados em `src/content/exercise-curation.json`; alternativas incorretas não são citações bíblicas. [Atribuição e licença](gravatexto-base-v0.1/docs/licenca-e-atribuicao.md).

Dados ficam no navegador, sem sincronização ou backup remoto. Conteúdo e exercícios permanecem rascunho; revisão editorial humana, teste com leitor de tela real e piloto com Lucas/3–5 pessoas ainda precisam acontecer. O protótipo mede prática com pistas, não domínio ou memorização garantida. Não há drag-and-drop, revelação progressiva de iniciais, XP, ranking, conta ou servidor.
