# Postr - GraphQL spike project

## Introduction

This is a spike project made to try out working with GraphQL in a monorepo.

It uses in-memory arrays to store data instead of a database, so data is reset on each restart of the backend.

I needed two entities with a relationship between. We have **Post** and **Profile**.
A post has an author pointing to a profile, and a profile has many posts.

I decided to call the app Postr.

The approach to GraphQL is schema first using code-generation to create the TypeScript types.

Here is how the monorepo is organized.

- **apps/api** is NestJS backend storing data in memory.
- **apps/postr** is the frontend build using Angular, Material and Apollo.
- **libs/data-access** is client side data access layer. Code is generated from GraphQL queries/mutations.

## Notes about testing

SUT is shorthand for system under test.

### Dependency issue

I initially had some trouble getting dependency injection to work Angular and Jest.

For dependencies using `@Injectable({ providedIn: 'root' })` I was getting following error:

`This constructor is not compatible with Angular Dependency Injection because its dependency at index 0 of the parameter list is invalid.`

To solve the issue I had to update *tsconfig.spec.json* with the following:
```json
{
  ...
  "compilerOptions": {
    ...
    "allowJs": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
  },
  ...
}
```

### Component testing

I haven't explored using [Angular Material's component harnesses](https://material.angular.io/guide/using-component-harnesses) yet. But it looks like an good alternative to the `element(selector)` helper function I've made for [my-profile.component.spec.ts](apps/postr/src/app/my-profile/my-profile.component.spec.ts).

## Quick Start

Run `npm install` to install dependencies.

Generate code from GraphQL schema with:
```
npx ng run api:generate
npx ng run data-access:generate
```

Run `npx nx test postr` to execute tests for frontend, add `--watchAll` to re-execute when files change.

### Running the application
Start **backend** with `npx nx serve api` then access at http://localhost:3333/graphql.

Start **frontend** with `npx nx serve postr` then access at http://localhost:4200/.

## Resources

[Nx Apollo Angular Example](https://github.com/nrwl/nx-apollo-angular-example)

### Nx
[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/getting-started/intro)

### Angular

[Angular Documentation](https://angular.io/docs)

[Angular Material](https://material.angular.io/)

### GraphQL

[How to GraphQL](https://www.howtographql.com/)

[Deep Introduction](https://graphql.org/learn/)

[Apollo Angular Documentation](https://apollo-angular.com/docs)

[State management with Apollo](https://www.apollographql.com/docs/react/local-state/local-state-management/#how-it-works)

[Testing with Apollo Angular](https://apollo-angular.com/docs/development-and-testing/testing)


## Workspace
### Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [Angular](https://angular.io)
  - `ng add @nrwl/angular`
- [React](https://reactjs.org)
  - `ng add @nrwl/react`
- Web (no framework frontends)
  - `ng add @nrwl/web`
- [Nest](https://nestjs.com)
  - `ng add @nrwl/nest`
- [Express](https://expressjs.com)
  - `ng add @nrwl/express`
- [Node](https://nodejs.org)
  - `ng add @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

### Generate an application

Run `ng g @nrwl/angular:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

### Generate a library

Run `ng g @nrwl/angular:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@graphql-state-spike/mylib`.

### Code scaffolding

Run `ng g component my-component --project=my-app` to generate a new component.

### Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

### Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

### Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
