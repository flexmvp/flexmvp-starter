# FlexMVP 💪

The FREE batteries included full stack starter kit for software startups optimized for speed, scale, and cost

Build with ❤️ using AWS + TypeScript

Demo: [demo.flexmvp.com](https://demo.flexmvp.com/)

## Mission

To launch 10,000 startup projects

## Technology Stack

**Infrastructure**

- [AWS](https://aws.amazon.com/)
- [SST (Serverless Stack)](https://sst.dev/)
- [PostgreSQL](https://www.postgresql.org/)

**API**

- [Typescript](https://www.typescriptlang.org/)
- [DrizzleORM](https://orm.drizzle.team/)
- [Pothos GraphQL](https://pothos-graphql.dev/)
- [Cognito (Auth)](https://aws.amazon.com/cognito/)

With both DrizzleORM and Pothos Graphql we've chosen typescript first libraries that favor coding over configuration.

**Client**

- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [Urql](https://formidable.com/open-source/urql/) (data fetching)
- [DaisyUI](https://daisyui.com/) (Component library)
- [TailwindCSS](https://tailwindcss.com/)

## Benefits

### Speed

Focus on developing features with tech and infrastracture handled; deploy to production in minutes

### Scale

Automatically scales up on AWS serverless instances to handle any user load

### Cost

Serverless instances turn off when not in use so that you only pay when people use your app

## Getting Started

### Clone this repo

```sh
git clone git@github.com:flexmvp/flexmvp-starter.git
```

Setup the AWS CLI

- https://sst.dev/chapters/configure-the-aws-cli.html

### Local development

```sh
npm i
npm run dev
```

### deploy to production

```sh
npm run deploy
```

## Features

### Authentication

Uses AWS Cognito as an authentication provider hosted in your AWS environment.

User signup, verification, and login are handled using AWS Amplify libraries on the frontent. Authentication pages can be customized here: `packages/frontend/src/app/(auth)`

<!--
Full featured authentication including registration, email login, forgot password, email verification, branded login pages, branded emails, social login, and virtually no cost to start.

I often read read conventional advice that says not to build password reset until you already have validation and product market fit. But I believe that authentication is the front door to your app and often the first impression you make. So FlexMVP includes a great branded registration and authentication experience out of the box. And you get the best of both worlds!
-->

### Database Migrations

```sh
npm run db:migrate
```

Migration files are generated from any DrizzleORM models in the `packages/core/src/models` folder.

Database migrations are applied automatically when running in development or deployed using the onCreate and onUpdate hooks in the `/stacks/Migrate.ts`.

### Crud Example (Articles)

Get started with a full stack CRUD example, using Articles made up of titles, urls, and comments.

- Model - `packages/core/src/models/article.ts`
- Service - `packages/core/src/article.ts`
- Controller - `packages/functions/src/graphql/types/article.ts`
- View - `packages/frontend/src/app/(features)/articles`

### GraphQL

Develop GraphQL queries and migrations in the functions package.

`packages/functions/src/graphql`

GraphQL documentation is generated automatically using genql and ends up here: `packages/graphql/genql/schema.graphql`. You can explore the GraphQL endpoint using any GraphQL explorer or playground like [Insomnia](https://docs.insomnia.rest/insomnia/graphql-queries).

GenQL also generates TypeScript types for the frontend application in `packages/graphql/genql/schema.ts` which are used to create typed query and migration functions in `packages/graphql/urql.ts`.

<!--
### Custom Email Templates
-

### ...(More Features)
-
-->

## Product Roadmap

### v1.0

- [x] GraphQL API + code generation
- [x] NextJS frontend
- [ ] Signup & authentication
  - [x] Signup
  - [x] Verify
  - [x] Login
  - [ ] Password recovery
- [x] Database migrations
- [x] Crud example (Articles) 🚧 [work in progress](<packages/frontend/src/app/(features)/articles/README.md>)
- [ ] Crud example (Comments)
- [ ] Edit user profile & password
- [ ] Seed sample users, articles, comments
- [ ] Load theme, project name, and logo from config file

### v2.0

- [ ] Custom domain example from config
- [ ] Custom email templates & reply-to
- [ ] Public SSR page example
- [ ] Social login

### v3.0

- [ ] Teams
- [ ] Roles (Secured with Pothos scope-auth)
- [ ] Move core, functions, and compoenents packages to sub-modules for distributed updates

### v4.0

- [ ] Async process example using LangChain + AWS StepFunctions

### v5.0

- [ ] Superadmin for user management

### Some bugs 🐛

- [ ] Migration stack rollback error on prod deploy
- [ ] Toast notification has light/dark theme reversed
- [ ] Restart frontend on error when running with `concurrently`
- [ ] urql not loading from cache between page navigation
