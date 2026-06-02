# Draft.gg

Projeto full-stack para organizar suas match-ups

## Tecnologias

- **Monorepo:** Turborepo
- **Frontend:** Next.js (App Router) + TailwindCSS + TanStack Query + Axios + React Hook Form + Shadcn/ui
- **Backend:** NestJS + PrismaORM + PostgreSQL
- **Auth:** JWT RS256 com Passport (Api) + NextAuth.js (Web)
- **Validação:** Zod
- **Testes:** Vitest
- **Linguagem:** TypeScript

## Estrutura do repositório

```
/
├── apps/
│   ├── api/                — API (NestJS)
│   └── web/                — Aplicação web (Next.js)
├── packages/
│   └── shared/             — Tipos/schemas compartilhados
├── config/
│   ├── eslint-config/      — Configuração ESLint compartilhada
│   ├── prettier-config/    — Configuração Prettier compartilhada
│   └── typescript-config/  — Configuração TypeScript compartilhada
├── docker/
│   └── postgres/           — Volume/arquivos do Postgres (dev)
├── docker-compose.yml      — Serviços do ambiente de desenvolvimento
└── turbo.json              — Configuração do Turborepo

```

## Arquitetura

A arquitetura do monorepo está dividida em:

- **API (`apps/api`)**: segue princípios de Clean Architecture, separada em:
  - `core/` — utilitários compartilhados;
  - `domain/` — entidades, erros e contratos;
  - `application/` — portas (contratos), serviços e casos de uso;
  - `infra/` — implementações concretas.

  O `domain/` não depende de framework; a infra implementa as interfaces/portas definidas nas camadas internas.

- **WEB (`apps/web`)**: Next.js com App Router.
  - `src/app/` — rotas e layouts;
  - `src/actions/` — server actions;
  - `src/providers/` — composição de providers;
  - `src/lib/` — utilitários;
  - `src/components/` — componentes de UI.

- **Shared (`packages/shared`)**: schemas e tipos compartilhados.
  - `src/schemas/` — validações;
  - `src/types/` — tipos reutilizáveis.

## Como rodar

Instalar dependências na raiz do monorepo:

```bash
npm install
```

Subir o ambiente de desenvolvimento (via Turborepo):

```bash
npm run dev
```

## Uso com Docker

Este repositório inclui uma configuração `docker-compose.yml` para subir serviços em desenvolvimento.

Subir os serviços em background:

```bash
docker-compose up -d
```

Parar e remover containers:

```bash
docker-compose down
```

O volume do Postgres é persistido em `docker/postgres/data`.

## Variáveis de ambiente

Crie os arquivos `.env` a partir dos exemplos:

### API (`apps/api`)

Crie `apps/api/.env` com base em `apps/api/.env.example`:

```env
DATABASE_URL=
JWT_PRIVATE_KEY=
JWT_PUBLIC_KEY=
PORT=
```

`JWT_PRIVATE_KEY` e `JWT_PUBLIC_KEY` devem ser chaves **RS256** codificadas em **base64**.

### Web (`apps/web`)

Crie `apps/web/.env` com base em `apps/web/.env.example`:

```env
NEXT_PUBLIC_API_URL=

NEXTAUTH_SECRET=
NEXTAUTH_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Prisma

O schema está em `apps/api/prisma/schema.prisma` e as migrações em `apps/api/prisma/migrations`.

Gerar o client do Prisma (necessário após alterar o schema):

```bash
cd apps/api
npm run generate
```

Rodar migrations em desenvolvimento:

```bash
cd apps/api
npm run migrate:dev
```

Abrir Prisma Studio:

```bash
cd apps/api
npm run prisma:studio
```

## Testes

Rodar testes unitários da API:

```bash
cd apps/api
npm run test
```
