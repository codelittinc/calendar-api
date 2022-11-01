FROM node:16.18.0-slim AS development

RUN apt-get update && apt-get install make && apt-get install -y procps

WORKDIR /share

COPY --chown=node package*.json ./

RUN npm install

RUN npm i -g @nestjs/cli

ADD ./ /share

EXPOSE ${PORT}

FROM node:16.18.0-slim as production

WORKDIR /share

COPY --chown=node package*.json ./

RUN npm install
RUN npm i -g @nestjs/cli

COPY ./ /share

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ENV PORT=3000
EXPOSE ${PORT}

RUN npm run build
RUN npm run db:migrate:schema

CMD ["node", "/share/dist/main"]
