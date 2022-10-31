# Codelitt's Calendar API

Our calendar API should be used as a tool to test integration capabilities with an API.

## Using Codelitt's Calendar API

To use the Codelitt's Calendar API, follow these steps:

- Use the follow URL to make requests: [Codelitt's Calendar API](http://localhost:3001/swagger/#/)
- Create a new token using the `/token POST` endpoint;
- Create a reminder using the `/reminders POST` endpoint, remember to inform the created token on the request body;
- Manage the reminders by passing the token on the URL of each method.

## How to install

### Dependencies

- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Installation

After cloning the repository, follow these steps:

```bash
$ npm run config

$ npm run docker:start:dev

$ npm install

$ npm run db:setup
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Conventions

### Naming

To follow Nestjs conventions, we'll use

- kebab-case: For file names
- PascalCase: for classes and object names

### Resources

In this project, we are using the Nestjs resources system. This means that each feature has its own module, controller and service.
For creating new resources you can use the following script:

```bash
$ nest g resource <resourceName>
```

### Database migrations

```bash
# Generating new migrations from existing entities
$ npm run db:migrate:schema:generate --name=<migration-name>

# Creating new empty migrations
$ npm run db:migrate:schema:create --name=<migration-name>

# Running the migrations
$ npm run db:migrate:schema

# Reverting the last migration
$ npm run db:migrate:schema:down
```
