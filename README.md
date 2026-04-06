
# Study App (Organizador de Estudos)

Site para organizar estudos: centraliza rotinas/disciplinas e ajuda a manter consistência no dia a dia.

## Tecnologias

- **Monorepo:** Turborepo
- **Frontend:** Next.js (App Router) + React
- **Linguagem:** TypeScript
- **Qualidade:** ESLint (config compartilhado em `packages/`) e Prettier

## Estrutura do repositório

- [apps/web](apps/web) — aplicação web (Next.js)
- [packages/eslint-config](packages/eslint-config) — configurações compartilhadas de ESLint
- [packages/typescript-config](packages/typescript-config) — configurações compartilhadas de TypeScript

## Requisitos

- Node.js `>= 18`
- npm (o repo está configurado com `packageManager: npm@10.9.2`)

## Como rodar

Instalar dependências na raiz do monorepo:

```bash
npm install
```

Subir o ambiente de desenvolvimento (via Turborepo):

```bash
npm run dev
```

Por padrão, a aplicação web roda em `http://localhost:3000`.

## Scripts úteis

- `npm run dev` — desenvolvimento (todas as apps/pacotes que tiverem `dev`)
- `npm run build` — build
- `npm run lint` — lint
- `npm run check-types` — checagem de tipos
- `npm run format` — formatação (Prettier)

## Anotações

- O código do site fica em [apps/web/app](apps/web/app).
