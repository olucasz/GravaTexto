# Instalação e preservação — 2026-09-25

## Estado inicial

Raiz: `/Users/lucasz/Desktop/GravaTexto`. Arquivos existentes: `gravatexto-codex-sdd-prototipo-v0.1.md` e `bible_memory_ux_blueprint-2.pdf`. Não havia app, package.json, repositório Git, `.specify/`, skills locais ou AGENTS.md nas pastas inspecionadas. Não foram substituídas instruções existentes.

## Preservação

Backup externo: `/Users/lucasz/Desktop/GravaTexto-backup-sdd-20260925-002258`, com cópia dos dois arquivos e `manifest.json` de SHA-256. A base original em `/Users/lucasz/Downloads/gravatexto-base-v0.1` foi mantida. Cópia integral na raiz em `gravatexto-base-v0.1/`; 26 checksums verificados. Nenhum rebuild do SQLite/JSON foi executado.

## Execução

1. `brew install uv` → uv 0.12.18. Homebrew também executou sua atualização/limpeza automática padrão.
2. `uv tool install specify-cli --from git+https://github.com/github/spec-kit.git@v1.0.11` → specify-cli 1.0.11; commit resolvido `8147943512404afb9d99c6252cb9bf84369fd0b0`.
3. `specify version` → 1.0.11, Python 3.13.2, Darwin arm64.
4. `specify init --help` conferido antes da inicialização.
5. `specify init --here --integration codex --script sh`, em PTY, sem `--force`. Confirmação de merge respondida após inspecionar destinos ausentes e criar backup. Arquivos existentes preservados.
6. Integração Codex e infraestrutura registradas em `.specify/integration.json` e manifests de `.specify/integrations/`: versão 1.0.11. Templates são bundled com essa CLI; não houve download de templates de outra release durante init.
7. Skills completas em `.agents/skills/`, templates e seis scripts bash em `.specify/`. Nenhum SKILL.md avulso foi usado para instalar a ferramenta.

## Fluxo documental

Skills lidas e aplicadas no agente: speckit-constitution, speckit-specify, speckit-plan, speckit-tasks e speckit-analyze. Resolvedores de constitution-template e spec-template executados; setup-plan e setup-tasks executados. Feature persistida em `.specify/feature.json` como `specs/001-playable-prototype`.

Não existe `.specify/extensions.yml`: hooks opcionais/obrigatórios não registrados. Não foi adicionada extensão Git, criado branch, commit, issue ou publicação. O campo BRANCH retornado pelo helper é identificador da feature neste contexto, não prova de branch real. Não foram alterados templates ou skills fornecidos pelo instalador.

## Como conferir

```sh
specify version
.specify/scripts/bash/check-prerequisites.sh --json --require-spec --require-tasks --include-tasks
```

Os comandos `$speckit-*` são skills do agente, não comandos shell. A instalação apareceu no catálogo desta sessão. Sem npm/app nesta etapa; versões exatas das dependências do frontend serão registradas na tarefa T007.

## Versões efetivas do app
React/React DOM 19.3.0; React Router 7.18.4; TypeScript 6.0.3; Vite 8.3.1; Vitest 5.0.1; Playwright 1.63.0; ESLint 10.11.0; Zod 4.6.5; Nunito Sans 5.3.0. Conferidas com npm ls --depth=0; lockfile fixa as dependências. Painel de teste ausente da build de produção padrão (busca pelas strings dos controles sem ocorrências).
