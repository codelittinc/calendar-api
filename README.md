# Codelitt's Calendar API

Our calendar API should be used as a tool to test integration capabilities with an API.

## Using Codelitt's Calendar API

To use the Codelitt's Calendar API, follow these steps:

- Use the following URL to make requests through the Swagger Documentation: [Codelitt's Calendar API - Swagger](https://prod-calendar-hiring-api.herokuapp.com/swagger);

- Use the following Base URL to make requests through your application:

  - [`https://prod-calendar-hiring-api.herokuapp.com/`](https://prod-calendar-hiring-api.herokuapp.com/)

- Create a new authentication token using the [`/tokens POST`](https://prod-calendar-hiring-api.herokuapp.com/swagger#/Tokens/create) endpoint;

  - Store the authentication token as a Environment Variable on your application;

  - Use the authentication token on the [UUID v4](https://www.uuidgenerator.net/version4) format to make further requests;

- Create a reminder using the [`/reminders POST`](https://prod-calendar-hiring-api.herokuapp.com/swagger#/Reminders/create) endpoint, remember to inform the authentication token on the request body;

- Manage the reminders by passing the authentication token on the URL of each Reminder method ([GET](https://prod-calendar-hiring-api.herokuapp.com/swagger#/Reminders/findRemindersNotificationsByMonth), [PATCH](https://prod-calendar-hiring-api.herokuapp.com/swagger#/Reminders/update), [DELETE](https://prod-calendar-hiring-api.herokuapp.com/swagger#/Reminders/remove)).

## How to install

### Dependencies

- Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

## Installation

After cloning the repository, follow these steps:

```bash
$ npm run config

$ npm run docker:start:dev

$ npm install

$ npm run db:migrate:schema
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
