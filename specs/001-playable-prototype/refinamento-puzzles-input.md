# Refinamento da experiência de aprendizagem e gamificação

Quero refinar a experiência atual do aplicativo de memorização de versículos.

A aplicação já está funcional e o design base está aprovado. Não quero uma reconstrução completa, nem mudança desnecessária de arquitetura.

O objetivo agora é melhorar principalmente:

1. qualidade dos puzzles;
2. dificuldade e progressão dos exercícios;
3. feedback das interações;
4. microanimações;
5. gamificação;
6. personalidade visual;
7. sensação de produto final, reduzindo o aspecto de interface genérica/gerada por IA.

Antes de modificar qualquer coisa:

- analise a implementação existente;
- entenda os componentes atuais;
- identifique como os puzzles são definidos;
- identifique como os dados dos versículos são armazenados;
- identifique como a sessão de aprendizado é montada;
- reutilize a arquitetura atual sempre que possível;
- não duplique componentes;
- não crie abstrações desnecessárias;
- mantenha TypeScript corretamente tipado;
- preserve responsividade e mobile-first;
- preserve a identidade visual atual como ponto de partida.

---

# 1. Problema atual

A interface está limpa e funcional, porém ainda apresenta dois problemas principais.

## 1.1 Visual

O design parece excessivamente:

- uniforme;
- estático;
- chapado;
- previsível;
- pouco decorado;
- pouco gamificado;
- com pouca sensação de interação.

Não quero transformar a aplicação em algo infantil ou exagerado.

A direção desejada é:

> produto premium + gamificação elegante + aprendizado agradável.

Use Duolingo apenas como referência de comportamento e feedback, NÃO como referência para copiar sua identidade visual.

O aplicativo deve continuar:

- clean;
- maduro;
- sereno;
- bíblico sem clichês visuais;
- moderno;
- mobile-first.

---

# 2. Problema crítico dos puzzles

Hoje alguns exercícios estão fáceis demais porque as alternativas erradas são muito diferentes da resposta correta.

Exemplo ruim:

Versículo:

"lançando sobre ele toda a vossa..."

Alternativas:

A. ansiedade; porque ele tem cuidado de vós.  
B. fez os céus e a terra.  
C. tiver medo, eu confiarei em ti.

Isso não testa memória.

O usuário consegue responder apenas porque uma opção é semanticamente compatível e as outras duas são obviamente de outros versículos.

Isso deve ser corrigido.

---

# 3. Princípio dos puzzles

A regra principal deve ser:

> O exercício precisa testar memória, e não apenas permitir que o usuário elimine respostas absurdas.

Distratores devem ser:

- semanticamente próximos;
- gramaticalmente compatíveis;
- plausíveis dentro da frase;
- semelhantes em tamanho;
- coerentes com linguagem bíblica;
- difíceis o suficiente para exigir lembrança.

Nunca utilizar opções aleatórias de outros versículos apenas para preencher alternativas.

---

# 4. Sistema de distratores

Crie uma estrutura reutilizável para geração/seleção de distratores.

Não quero IA externa nesta etapa.

Tudo pode funcionar inicialmente através de dados previamente preparados ou regras determinísticas.

## Para palavras

Se a resposta for:

"ansiedade"

Distratores plausíveis:

- aflição
- angústia
- preocupação
- temor

Evitar:

- céu
- Jerusalém
- ressuscitou

## Para expressões

Resposta:

"eu confiarei em ti"

Distratores possíveis:

- eu esperarei em ti
- eu descansarei em ti
- eu clamarei a ti
- eu confiarei no Senhor

Todas precisam parecer possíveis.

---

# 5. Estrutura dos exercícios

Quero formalizar os puzzles da aplicação.

Crie um modelo extensível de exercícios.

Sugestão de tipos:

```ts
type ExerciseType =
  | "multiple-choice"
  | "complete-word"
  | "fill-blanks"
  | "word-bank"
  | "reorder-chunks"
  | "initial-letters"
  | "type-verse"
  | "reference-recall";
```

Não é obrigatório utilizar exatamente essa estrutura se já existir uma melhor no projeto.

Adapte ao código existente.

---

# 6. Puzzle 1 — Multiple Choice

Objetivo:

reconhecer a continuação correta do versículo.

Exemplo:

1 Pedro 5:7

"lançando sobre ele toda a vossa..."

Alternativas:

A.  
ansiedade; porque ele tem cuidado de vós.

B.  
aflição; porque ele vos sustentará.

C.  
angústia; porque ele estará convosco.

D.  
preocupação; porque ele vos fortalecerá.

A resposta correta não deve ser visualmente óbvia.

Regras:

- preferencialmente 4 alternativas;
- alternativas semanticamente próximas;
- estruturas gramaticais semelhantes;
- comprimentos razoavelmente próximos;
- evitar alternativas absurdas.

---

# 7. Puzzle 2 — Complete Word

Exemplo:

"lançando sobre ele toda a vossa ______"

Banco:

- ansiedade
- aflição
- angústia
- preocupação

O usuário escolhe apenas a palavra.

Esse exercício deve aparecer nos estágios iniciais de aprendizado.

---

# 8. Puzzle 3 — Fill Blanks

Exemplo:

"lançando sobre ele toda a vossa ________, porque ele tem ________ de vós."

Banco:

- ansiedade
- cuidado
- aflição
- amor
- temor
- compaixão

O usuário seleciona palavras para preencher os espaços.

O banco deve ter palavras extras.

---

# 9. Puzzle 4 — Word Bank

Mostrar a frase parcialmente preenchida.

Exemplo:

"No dia em que eu tiver ________, eu ________ em ti."

Banco:

- medo
- confiarei
- clamarei
- esperarei
- força
- descansarei

O usuário toca nas palavras para preencher os blanks.

Permitir tocar novamente para devolver a palavra ao banco.

---

# 10. Puzzle 5 — Reorder Chunks

Este é um ponto muito importante.

Hoje a frase está sendo quebrada em blocos grandes demais.

Exemplo atual ruim:

- "No dia em que eu tiver medo,"
- "eu confiarei em ti."

São apenas dois blocos.

Isso é fácil demais.

Quero quebrar a passagem em segmentos menores.

Exemplo:

Salmos 56:3

Texto:

"No dia em que eu tiver medo, eu confiarei em ti."

Chunks possíveis:

- No dia
- em que eu
- tiver medo,
- eu confiarei
- em ti.

Adicionar distratores:

- no Senhor
- para sempre
- com fé

O usuário deve montar apenas os blocos corretos e colocá-los na ordem correta.

Regras:

- normalmente entre 4 e 7 blocos corretos;
- adicionar entre 1 e 3 distratores;
- blocos devem ter tamanho variável;
- não dividir sempre pela mesma quantidade de palavras;
- preservar leitura natural;
- evitar blocos gigantes.

---

# 11. Interação do Reorder Chunks

Quero melhorar bastante essa interface.

Atualmente existe uma grande área vazia de montagem.

Refaça para que:

- os blocos disponíveis pareçam peças de puzzle;
- o usuário possa tocar para adicioná-los;
- o bloco anime até a área de resposta;
- tocar em um bloco já inserido devolva-o;
- preferencialmente permitir reordenação;
- os blocos selecionados possuam estado visual claro;
- o layout reorganize suavemente quando peças entram ou saem.

Não precisa implementar drag-and-drop se isso complicar demais o MVP.

Tap-to-add + tap-to-remove é suficiente inicialmente.

Mas a experiência precisa parecer fluida.

---

# 12. Puzzle 6 — Initial Letters

Para níveis intermediários.

Exemplo:

Texto original:

"No dia em que eu tiver medo, eu confiarei em ti."

Exibir:

"N_ d__ e_ q__ e_ t____ m___, e_ c________ e_ t_."

O usuário deve completar ou revelar progressivamente.

Esse tipo pode ser preparado agora na arquitetura, mesmo que a UI completa fique como segunda prioridade.

---

# 13. Puzzle 7 — Digitação

Mostrar:

"Digite Salmos 56:3"

Campo de texto.

Comparar a resposta com o versículo.

A validação deve:

- ignorar diferenças de maiúsculas/minúsculas;
- normalizar espaços;
- ignorar diferenças de pontuação;
- opcionalmente ignorar acentos;
- identificar palavras faltantes;
- identificar palavras diferentes.

Não usar comparação simplesmente por string exata.

Criar utilitário específico para normalização de texto bíblico.

Exemplo:

```ts
normalizeVerseText()
compareVerseAnswer()
```

---

# 14. Progressão de dificuldade

Os exercícios não devem aparecer aleatoriamente sem lógica.

Criar conceito de dificuldade.

Sugestão:

## Nível 1 — Reconhecimento

- complete-word
- multiple-choice

## Nível 2 — Reconhecimento avançado

- fill-blanks
- word-bank

## Nível 3 — Reconstrução

- reorder-chunks

## Nível 4 — Evocação parcial

- initial-letters

## Nível 5 — Evocação

- type-verse
- reference-recall

A progressão da sessão deve ir aproximadamente:

```text
ver
→ reconhecer
→ reconstruir
→ lembrar
```

---

# 15. Estrutura de uma sessão

Uma sessão de "Conhecer e praticar" pode seguir algo semelhante:

```text
1. Conhecer o versículo
2. Ler novamente
3. Complete uma palavra
4. Escolha a continuação
5. Preencha palavras faltantes
6. Monte a passagem
7. Digite ou reconstrua
8. Resultado
```

Não precisa sempre ter exatamente 8 etapas.

O motor deve permitir variar.

Exemplo:

versículo curto:

6 exercícios.

versículo longo:

8 exercícios.

---

# 16. Evitar repetição maçante

Muito importante:

não mostrar continuamente o mesmo exercício com pequenas diferenças.

Uma sessão deve alternar padrões.

Exemplo ruim:

```text
multiple choice
multiple choice
multiple choice
multiple choice
```

Exemplo desejado:

```text
leitura
complete word
multiple choice
reorder
fill blanks
reorder
type
```

---

# 17. Feedback de resposta

Hoje quero mais feedback visual.

## Ao selecionar opção

Aplicar:

- leve scale;
- mudança de border;
- background;
- resposta tátil visual.

Duração aproximada:

120–180ms.

---

## Ao acertar

Mostrar:

- cor de sucesso;
- ícone check;
- micro bounce;
- pequena mensagem.

Exemplos de texto:

"Boa!"

"Correto."

"Mandou bem."

"Você lembrou."

Evitar mensagens exageradas.

---

## Ao errar

Não punir visualmente de maneira agressiva.

Mostrar:

- estado vermelho suave;
- pequeno shake;
- resposta correta;
- mensagem curta.

Exemplo:

"Quase. Veja a continuação correta."

Depois seguir.

---

# 18. Microanimações

Adicionar motion de forma discreta e consistente.

Usar Framer Motion se ele já estiver instalado.

Caso não esteja instalado, avaliar se vale adicionar.

Não criar dependência pesada apenas para animações simples se CSS resolver.

## Elementos que devem possuir feedback

### Alternativas

Press:

```text
scale: 0.98
```

Selected:

```text
scale → 1
border emphasis
background transition
```

Correct:

pequeno bounce.

Incorrect:

shake discreto.

---

### Chunks

Quando selecionado:

```text
bank
↓
answer area
```

Animar mudança de posição.

Quando removido:

retornar suavemente.

---

### Progresso

A barra não deve pular instantaneamente.

Animar de:

```text
37%
→
50%
```

---

### XP

Ao terminar exercício:

```text
+10 XP
```

pode surgir próximo à barra/header e desaparecer suavemente.

Não exagerar.

---

# 19. Design — manter base atual

A identidade existente pode continuar como base.

Não quero redesenhar a aplicação do zero.

Preservar:

- fundo off-white;
- verde principal;
- tipografia;
- estrutura mobile-first;
- cards arredondados;
- simplicidade.

Mas adicionar personalidade.

---

# 20. Melhorias visuais

Adicionar uma segunda camada visual.

Hoje temos basicamente:

```text
background
card
button
```

Quero uma hierarquia mais rica.

Pode incluir:

- backgrounds internos leves;
- superfícies secundárias;
- bordas menos genéricas;
- sombras sutis;
- pequenos detalhes gráficos;
- estados mais ricos;
- divisores delicados;
- chips;
- badges;
- ícones.

Não transformar tudo em cards.

---

# 21. Elementos decorativos

Adicionar decoração de forma muito discreta.

Evitar:

- cruzes gigantes;
- Bíblia aberta decorativa;
- pergaminhos;
- vitrais;
- igrejas;
- iconografia religiosa clichê.

Podemos usar:

- pequenos traços;
- formas orgânicas;
- padrões abstratos;
- folhas discretas;
- pontos;
- curvas;
- formas suaves.

Tudo quase como textura.

A decoração nunca deve competir com o exercício.

---

# 22. Tela de exercício

Refinar o header atual.

Hoje temos:

```text
X

Conhecer e praticar

0 de 8

barra
```

Quero que ele pareça mais produto final.

Pode ficar algo como:

```text
X

Conhecer e praticar     3/8

████████░░░░
```

A referência bíblica pode usar badge pequeno:

```text
SALMOS 56:3
```

ou tratamento tipográfico próprio.

---

# 23. Área principal

Dar mais personalidade ao título.

Exemplo:

```text
Monte a passagem
```

Subtexto menor:

```text
Organize os blocos para reconstruir o versículo.
```

Evitar explicações redundantes espalhadas em vários lugares da tela.

Hoje existem textos do tipo:

- "Toque nos blocos abaixo..."
- "Toque em um bloco montado..."
- "0 de 2 blocos montados"

Isso gera informação demais.

Simplificar.

---

# 24. Estados do botão

O botão principal deve possuir estados claramente diferentes:

```text
disabled
ready
checking
correct
continue
```

Exemplo:

Inicial:

```text
Verificar
```

Após acerto:

```text
Continuar →
```

Não manter o botão com exatamente o mesmo comportamento visual durante toda a etapa.

---

# 25. Footer fixo

O CTA inferior pode continuar fixo.

Mas melhorar:

- separação da área de conteúdo;
- background;
- safe area;
- transição;
- sombra/border superior discreta.

No mobile, garantir que nunca fique escondido pela barra do navegador ou teclado.

Usar corretamente:

```css
env(safe-area-inset-bottom)
```

quando necessário.

---

# 26. Evitar aspecto "feito por IA"

Revisar o design procurando especificamente:

- excesso de radius idêntico;
- excesso de cards;
- espaçamentos todos iguais;
- bordas em tudo;
- componentes excessivamente simétricos;
- textos genéricos;
- excesso de centralização;
- ausência de hierarquia.

O objetivo é criar intencionalidade.

Nem todo bloco precisa:

```text
background
border
radius
shadow
```

Use hierarquia visual e espaço em branco conscientemente.

---

# 27. Gamificação

Adicionar elementos discretos de progresso.

Durante a lição podemos exibir:

```text
+10 XP
```

ou:

```text
3 acertos seguidos
```

Mas não quero um HUD de videogame cheio de informações.

Prioridades:

1. exercício;
2. progresso;
3. feedback;
4. gamificação.

Gamificação sempre secundária ao aprendizado.

---

# 28. Streak de acertos

Podemos criar uma pequena sequência dentro da sessão:

```text
🔥 3
```

aparecendo somente após 2 ou 3 respostas consecutivas.

Caso o usuário erre:

não precisa exibir animação negativa.

Simplesmente zerar silenciosamente.

Esse recurso é opcional para esta implementação se começar a aumentar o escopo.

---

# 29. Resultado da lição

A conclusão deve parecer recompensa.

Mostrar:

```text
Lição concluída

Salmos 56:3

+60 XP

Precisão
92%

Domínio
68%
```

Adicionar animação simples de entrada.

Talvez uma pequena ilustração abstrata ou símbolo visual do produto.

Nada exagerado.

CTA:

```text
Continuar
```

---

# 30. Organização de dados dos exercícios

Quero separar claramente:

```text
conteúdo bíblico
```

de:

```text
configuração dos exercícios
```

Evitar hardcode de perguntas dentro do JSX.

Algo conceitualmente semelhante:

```ts
interface VerseExercise {
  id: string;
  verseId: string;
  type: ExerciseType;
  prompt?: string;
  answer: unknown;
  options?: unknown[];
  difficulty: number;
}
```

Adapte ao modelo já existente.

---

# 31. Dados do versículo

Idealmente cada versículo deve conseguir possuir metadados auxiliares como:

```ts
{
  reference: "Salmos 56:3",
  text: "No dia em que eu tiver medo, eu confiarei em ti.",
  chunks: [
    "No dia",
    "em que eu",
    "tiver medo,",
    "eu confiarei",
    "em ti."
  ],
  distractorChunks: [
    "no Senhor",
    "para sempre",
    "com fé"
  ]
}
```

E para blanks:

```ts
{
  blankTargets: [
    "medo",
    "confiarei"
  ],
  distractors: [
    "temor",
    "esperarei",
    "descansarei",
    "clamarei"
  ]
}
```

Essa estrutura pode mudar conforme o modelo atual do projeto.

---

# 32. Conteúdo manual primeiro

IMPORTANTE:

não tente resolver agora geração automática perfeita de distratores para todos os versículos.

Nesta etapa podemos utilizar conteúdo manualmente curado para os versículos do MVP.

É preferível:

```text
30 versículos excelentes
```

do que:

```text
1000 versículos com puzzles ruins.
```

Prepare a arquitetura para expansão futura, mas use dados curados agora.

---

# 33. Criar utilitários

Se fizer sentido na estrutura atual, criar utilitários separados para:

```text
shuffleOptions()
normalizeVerseText()
compareVerseAnswer()
buildChunkExercise()
validateChunkAnswer()
```

E testes unitários para os comportamentos críticos.

---

# 34. Acessibilidade

Todos os puzzles devem funcionar:

- mouse;
- touch;
- teclado quando aplicável.

Garantir:

- focus states;
- contraste adequado;
- aria-label onde necessário;
- nenhuma informação transmitida exclusivamente por cor.

---

# 35. Responsividade

Prioridade:

```text
mobile
```

Depois:

```text
tablet
desktop
```

No desktop não transformar a interface em uma página enorme.

A experiência pode continuar dentro de uma largura limitada semelhante a um app.

Algo aproximadamente entre:

```text
480px
e
760px
```

dependendo da tela atual.

---

# 36. Não fazer

Não:

- refazer toda arquitetura;
- trocar stack;
- alterar autenticação;
- criar backend novo sem necessidade;
- implementar IA;
- implementar voz;
- criar social;
- criar ranking;
- criar marketplace;
- criar sistema de grupos;
- mudar o produto inteiro;
- adicionar animações exageradas;
- copiar o visual do Duolingo;
- transformar o app em interface infantil;
- usar emojis como elementos visuais principais.

---

# 37. Ordem de implementação

Execute aproximadamente nesta ordem:

## Fase 1

Auditar:

- componentes;
- fluxo;
- dados;
- session engine.

## Fase 2

Refatorar/modelar exercícios.

## Fase 3

Melhorar:

- multiple choice;
- fill blanks;
- reorder chunks.

## Fase 4

Criar sistema melhor de distratores.

## Fase 5

Adicionar feedback visual.

## Fase 6

Adicionar motion.

## Fase 7

Refinar design.

## Fase 8

Revisar responsividade.

## Fase 9

Executar testes/build/lint.

---

# 38. Critérios de aceite

A tarefa só está concluída se:

### Puzzle de alternativas

- opções erradas forem plausíveis;
- resposta não for óbvia apenas por contexto;
- opções possuírem aparência semelhante.

### Montar passagem

- texto for dividido em vários blocos;
- existirem distratores;
- usuário puder adicionar/remover blocos;
- montagem tiver animação;
- validação funcionar corretamente.

### UX

- respostas possuírem feedback imediato;
- progresso for animado;
- CTA possuir estados claros;
- erros possuírem feedback elegante.

### Visual

- design continuar clean;
- interface possuir mais personalidade;
- existir maior sensação de game;
- não parecer infantil;
- não parecer clone do Duolingo;
- não parecer UI genérica de IA.

### Código

- sem erros de TypeScript;
- sem componentes duplicados;
- sem dados hardcoded dentro das telas quando puderem ser dados estruturados;
- sem regressão nos fluxos existentes;
- build funcionando;
- lint funcionando;
- testes existentes funcionando.

---

# 39. Entrega

Ao terminar, quero um resumo contendo:

## Arquivos alterados

Liste cada arquivo importante alterado.

## Mudanças realizadas

Separar em:

- puzzles;
- design;
- animações;
- arquitetura;
- dados.

## Decisões técnicas

Explique decisões importantes.

## Pendências

Liste o que ficou preparado mas ainda não implementado.

## Validação

Informe quais comandos foram executados:

```bash
npm run lint
npm run test
npm run build
```

ou equivalentes do projeto.

Não apenas descreva o que faria.

Implemente as mudanças no projeto existente.
