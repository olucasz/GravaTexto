---
name: GravaTexto
description: Prática diária em uma trilha de papel, floresta, broto e mel.
colors:
  surface-secondary: "#EDF2E6"
  surface-raised: "#FEFFF9"
  surface-highlight: "#E5EFCF"
  sprout: "#B7D77A"
  honey: "#EABD55"
  sage: "#8CAA72"
  paper: "#F7F5ED"
  surface: "#fff"
  ink: "#203A30"
  brand: "#245B43"
  selected: "#EAF2DF"
  correction: "#FFF1E8"
  correction-ink: "#8B3D28"
  focus: "#315FAD"
  muted: "#58675B"
  line: "#D6DCCC"
typography:
  display:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "37px"
    fontWeight: 700
  headline:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.5px"
  reading:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "27px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.2px"
  body:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Nunito, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 700
rounded:
  piece: "10px"
  control: "12px"
  assembly: "14px"
  panel: "16px"
  card: "20px"
  journey: "24px"
  landmark: "28px"
spacing:
  tight: "8px"
  pieces: "10px"
  controls: "12px"
  regular: "16px"
  section: "24px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "14px 22px"
  option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "15px 18px"
  option-selected:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
  piece:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.piece}"
    padding: "13px 16px"
  journey-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.journey}"
  navigation-active:
    backgroundColor: "{colors.surface-highlight}"
    textColor: "{colors.brand}"
  mission-action:
    backgroundColor: "{colors.sprout}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
---

# Design System: GravaTexto

## Overview

**Creative North Star: "Uma caminhada visível"**

A prática diária se transforma em uma caminhada visível. Papel quente, floresta profunda, broto e mel organizam uma interface acolhedora de leitura e ação. Folhas vetoriais, marcos lapidados e um caminho contínuo conectam a missão de hoje ao próximo texto.

A Nunito Sans local mantém a voz familiar. Superfícies elevadas dão presença às missões e ao histórico; controles e nós têm relevo curto. XP, sequência e marcos representam atividade registrada no navegador, sem medir memorização ou espiritualidade. A experiência inclui instalação PWA, avisos de conexão e continuidade offline.

**Key Characteristics:**

- Papel quente, floresta profunda, broto e mel.
- Hoje, Jornada, Explorar e Perfil em navegação persistente.
- Trilha orgânica contínua com estados explícitos e marcos persistidos.
- Superfícies elevadas, controles táteis e movimento reduzível.

## Colors

A base de papel e tinta verde permanece; broto e mel distinguem o próximo passo e a atividade acumulada.

### Primary

- **Floresta (`brand`)**: marca, missão, cabeçalho da trilha, ações e nós concluídos.
- **Broto (`sprout`)**: ação dentro da missão e nós disponíveis ou em andamento.
- **Verde de seleção (`selected`)**: alternativas escolhidas e peças montadas.

### Secondary

- **Mel (`honey`)**: estado “Muito praticado”; parentes quentes claros destacam XP e marcos.
- **Sálvia (`sage`)**: acento discreto em Explorar.

### Neutral

- **Papel (`paper`)**: fundo da aplicação.
- **Superfície (`surface`)** e **superfície elevada (`surface-raised`)**: cartões e controles.
- **Superfície secundária (`surface-secondary`)**: unidades da trilha e preferências.
- **Destaque (`surface-highlight`)**: destino ativo da navegação.
- **Tinta (`ink`)**, **tinta secundária (`muted`)** e **linha (`line`)**: leitura, ajuda e divisores.

Correções usam `correction` e `correction-ink`; foco de teclado usa `focus`. Estado é comunicado também por texto e ícone.

**The Green Guides Rule.** Verde profundo organiza a experiência; broto indica ação disponível e mel indica atividade ou marco, sem representar domínio.

## Typography

**Display Font:** Nunito Sans local, registrada em CSS como `Nunito`, com `system-ui, sans-serif` como fallback.
**Body Font:** a mesma família, arquivo variável local com pesos de 200 a 900.

A forma arredondada é acolhedora; títulos fortes e texto de leitura amplo dão prioridade ao conteúdo. Não há família monoespaçada de interface.

### Hierarchy

- Hoje e Explorar usam títulos de 37px, reduzidos a 29px no mobile. A trilha usa 34px, reduzidos a 27px; a missão usa 31px, reduzidos a 26px. A hierarquia é de aplicativo, não de landing page.
- Títulos de tarefa usam o papel `headline`, reduzido a 25px no mobile. Títulos de seções ficam em torno de 20–21px.
- Passagens usam `reading`; leitura introdutória chega a 28px e entrelinha 1.5. No mobile, a passagem fica em 25px e a leitura em 26px.
- Corpo varia entre 15–17px; ajuda e metadados entre 12–14px. Botões principais usam 17px e peso 800.
- Rótulos são em caixa natural. Contagens de progresso usam numerais tabulares.

**The Reading First Rule.** O texto praticado recebe escala maior que instruções e metadados; não comprima a leitura para destacar uma pontuação.

## Layout

O shell usa navegação lateral fixa de 244px no desktop. A área principal compensa essa largura; Hoje e Explorar têm até 960px, com 40px de respiro lateral. Jornada e Perfil têm até 760px. Até 1023px, a navegação passa a quatro abas inferiores fixas e o conteúdo reserva espaço para elas e para a safe area.

Até 640px, páginas usam margens laterais de 20px. A missão passa de duas colunas para uma; Explorar empilha arte e conteúdo. Perfil passa de três indicadores lado a lado para uma coluna. A trilha ocupa a largura inteira no topo, com unidades recuadas 18px. Abaixo de 350px, margens de páginas caem para 16px e a arte do cabeçalho da trilha é removida. A largura mínima do corpo é 320px.

A trilha alterna posições laterais e centrais. Um único traçado SVG por unidade acompanha os centros dos quatro nós; existem geometrias desktop e mobile, sem conectores soltos entre etapas. Cada etapa reserva ao menos 118px de altura. As capturas finais de 390px e 320px registram a continuidade e a quebra natural dos textos.

A prática conserva cabeçalho de até 820px, corpo de até 688px (800px na variação larga), rodapé sticky e ação de até 640px. Pares passam a uma coluna abaixo de 370px. Feedback longo tem rolagem interna limitada a 45dvh, ou 40dvh no mobile.

## Elevation & Depth

A profundidade combina superfícies tonais, sombras ambientes e relevo de controles. Cartões de Explorar, resumo da caminhada e métricas do Perfil são elevados; blocos de unidade e preferências usam sobretudo diferença tonal. A missão verde recebe sombra ampla. Os nós da trilha combinam sombra difusa e uma base curta que responde à pressão.

### Shadow Vocabulary

- **Superfície elevada** (`0 16px 40px #25463414,0 3px 10px #25463412`): token `--shadow-raised`, usado em cartões e indicadores.
- **Missão** (`0 20px 50px #173d2c26`): separação do grande painel verde.
- **Ação principal** (`0 3px 1px #173D2C`): relevo do botão; pressionado, reduz a `0 1px 1px #173D2C`.
- **Ação leve** (`0 3px 1px #C7D3B7`): botão verde claro.
- **Peça** (`0 2px 2px #D8DECE`): relevo do banco.
- **Nó disponível** (`0 8px 18px #65823d38,0 4px 0 #77984D`): convite à próxima etapa.

**The Layered Path Rule.** Sombras ambientes separam painéis; bases curtas tornam botões, peças e nós acionáveis reconhecíveis.

## Shapes

Controles usam cantos moderados; peças são mais compactas que painéis. Explorar usa raio de 24px; missão usa 28px no desktop e 22px no mobile. Nós têm 72px e raio de 24px, reduzidos a 66px e 21px no mobile; marcos são maiores, com 84px (76px no mobile). Alternativas e pares têm borda de 2px; peças têm borda de 1px. O recipiente de montagem usa contorno tracejado de 2px, enquanto posições vazias usam tracejado de 1px. Ícones são SVG de traço, nunca glifos de texto.

## Components

### Buttons

Ação principal verde com texto branco, altura mínima de 54px e relevo curto. Hover escurece o fundo; pressão desloca 2px. A variante leve tem fundo verde pálido e texto verde profundo. Ação textual é sublinhada, sem superfície. Desabilitado fica neutro e sem relevo. Foco visível usa contorno azul de 3px, afastado 4px. Controles de ícone ocupam 48px quadrados.

### Cards / Containers

Hoje tem missão verde com arte vegetal e ação broto, seguida do resumo elevado da caminhada. Explorar usa cartões elevados com arte lateral de 320px e conteúdo com 32px de padding; no mobile a arte fica acima, com 185px de altura, e o conteúdo usa 24px. Perfil usa cartões de métricas com 22px de padding e preferências em superfície secundária. Unidades da trilha usam painéis de 20px de raio, com título, descrição e contagem.

### Inputs / Fields

Digitação opcional usa textarea branca de largura total, altura mínima de 160px, borda de 2px e raio `assembly`; texto em 22px com entrelinha 1.5. O foco segue o contorno global. Preferência de digitação usa checkbox nativo de 24px com cor verde, rótulo e explicação juntos.

### Navigation

Hoje, Jornada, Explorar e Perfil são destinos persistentes. No desktop, links laterais têm altura mínima de 52px, raio de 14px, ícone e rótulo; hover muda o fundo e ativo usa `surface-highlight`. No mobile, abas inferiores têm ícone sobre rótulo de 11px e altura mínima de 58px. A barra translúcida usa blur de 14px, removido em movimento reduzido. A identidade usa a marca sorridente verde fornecida para o produto, redesenhada como SVG local; a prática concentra a atenção no cabeçalho de sessão e na ação inferior. Foco de teclado mantém o contorno global.

### Continuous path and milestones

O caminho contínuo fica atrás dos nós. Disponível e em andamento usam broto; concluído usa floresta com check; “Muito praticado” usa mel com estrela; revisão disponível usa fundo quente com contorno; bloqueado usa cadeado e texto atenuado. Rótulos explícitos acompanham a cor. Checkpoint e marco final têm núcleo maior e arte própria quando disponíveis. A conclusão vem dos marcos persistidos, não apenas de todos os textos terem sido apresentados.

O nó em andamento respira em 2.6s; desbloqueio usa 600ms com a curva `--ease-out`. Pressão desloca o núcleo 3px e reduz sua escala. Todos esses movimentos respeitam a preferência de redução.

### Activity and PWA

Hoje mostra sequência e XP de forma compacta; Perfil reúne dias, XP e sessões concluídas. O resultado apresenta recompensa XP em superfície quente. XP deriva de respostas corretas independentes e é descrito como prática, sem inferir domínio. “Muito praticado” indica avanço das duas dimensões de revisão, não comprovação de memorização.

Instalação fica nas preferências do Perfil. Avisos PWA são toasts escuros com ação broto, posicionados acima das abas no mobile. Estado offline usa faixa quente; a página offline tem marca, ilustração, explicação e ação. Safe areas são consideradas nos elementos fixos. Ícones de instalação são exportações da marca SVG local.

### Alternatives and pieces

Alternativas combinam letra, texto e marca de seleção; seleção muda borda e fundo e expõe `aria-pressed`. Peças de 48px de altura mínima retornam ao banco ao toque. Posições vazias numeradas são espaços de montagem, não chips de filtro. Pares resolvidos combinam superfície verde, contorno e ícone.

A troca de lugar das peças usa FLIP de 190ms, com `cubic-bezier(.2,.7,.2,1)`. Estados de peça transitam em 140ms; progresso anima `scaleX` em 250ms. Acerto usa um pequeno pulso de 180ms, e a arte do resultado se acomoda em 650ms. `prefers-reduced-motion` remove transições, animações e deslocamentos de pressão.

### Feedback and progress

Feedback correto é verde claro; correção é quente, com título, explicação e ação. Indicadores contam textos apresentados, etapas ou revisões. A sequência de acertos é secundária. XP registra atividade; não há medida visual de domínio.

## Do's and Don'ts

### Do:

- Do preservar papel, floresta, broto, mel e Nunito Sans local.
- Do manter a trilha contínua alinhada aos centros dos nós em desktop e mobile.
- Do usar rótulo e ícone junto às cores de estado, inclusive nos marcos persistidos.
- Do reservar espaço para navegação inferior, avisos PWA e safe areas.
- Do respeitar prefers-reduced-motion e descrever XP como atividade factual.

### Don't:

- Don't apresentar XP, sequência ou “Muito praticado” como domínio, memorização ou espiritualidade.
- Don't substituir o caminho contínuo por conectores desconexos.
- Don't remover a hierarquia de superfícies elevadas nem aplicar o relevo de controle a todo painel.

Não canonizado: o tratamento em caixa alta de “Unidade” é um detalhe local de identificação; não estabelece eyebrows para novas telas. Classes legadas da antiga abertura, estilos de ferramentas de desenvolvimento e tokens declarados sem consumo não são padrões novos. O nome interno `mastered` não deve aparecer como uma alegação de domínio na interface.
