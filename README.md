## Description

REST API in NestJS that performs web scraping using Puppeteer and stores the data in MongoDB. The application is contained in Docker for easy configuration and deployment.

## Prerequisites

Please make sure you have the following requirements installed before continuing:

- Docker: [Installation](https://docs.docker.com/engine/install/ubuntu/).
- Docker Compose: [Installation](https://docs.docker.com/compose/install/).
- Node.js (optional for local development): [Installation](https://nodejs.org/en/download/package-manager).

## Project setup with Docker

```bash
$ docker-compose up --build -d
```

## Project setup local

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
