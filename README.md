# Codelitt's Calendar API

Our calendar API should be used as a tool to test integration capabilities with an API.

# Using Codelitt's Calendar API

To use the Codelitt's Calendar API, follow these steps:

- Use the following URL to make requests through the Swagger Documentation: [Codelitt's Calendar API - Swagger](https://api.calendar.codelitt.dev/docs);

- Use the following Base URL to make requests through your application:

  - [`https://api.calendar.codelitt.dev/`](https://api.calendar.codelitt.dev/)

- Create a new authentication token using the [`/tokens POST`](https://api.calendar.codelitt.dev/docs#/Tokens/create) endpoint through Swagger:

  - The token only needs to be created once, it is a user's choice to create more tokens;

  - The `name` field on the request body is an optional field, the token can be created without it;

  - After changing the request body payload to the desired value, execute the request by clicking on the `Execute` button;

  - A similar response body will be returned:

  ```jsonc
  {
    "id": "21681ba4-7556-4358-9500-e4afe1ce6141", //The token (UUID)
    "name": "John Doe", //The User's name (Optional - Nullable)
    "createdAt": "2022-11-02T15:12:13.242Z", // The date when the Token was created
    "updatedAt": "2022-11-02T15:12:13.242Z" // The last date that the token has been updated
  }
  ```

  - On the response body, the `id` field represents the authentication token ;

  - The authentication token should be stored as an Environment Variable on your application;

  - Use the authentication token on the [UUID v4](https://www.uuidgenerator.net/version4) format to make further requests;

- Create a reminder using the [`/reminders POST`](https://api.calendar.codelitt.dev/docs#/Reminders/create) endpoint, remember to inform the authentication token on the request body;

- Get and Manage the reminders by passing the authentication token on the URL of each Reminder method ([GET](https://api.calendar.codelitt.dev/docs#/Reminders/findRemindersNotificationsByMonth), [PATCH](https://api.calendar.codelitt.dev/docs#/Reminders/update), [DELETE](https://api.calendar.codelitt.dev/docs#/Reminders/remove)).

# Colaborating to the Project

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
