## Description

REST API in NestJS that performs web scraping using Puppeteer and stores the data in MongoDB. The application is contained in Docker for easy configuration and deployment.

## Prerequisites

Please make sure you have the following requirements installed before continuing:

- Docker: [Installation](https://docs.docker.com/engine/install/ubuntu/).
- Docker Compose: [Installation](https://docs.docker.com/compose/install/).
- Node.js (optional for local development): [Installation](https://nodejs.org/en/download/package-manager).

## Light it up

There are two ways to test the application. The first is to run the application in a Docker container. The second is to start the service locally.

### Option 1. Docker

We need to generate a .env file in the root of the project for the MongoDB variables. This data is sensitive and should never be versioned, but it is necessary for testing.

```
MONGO_INITDB_ROOT_USERNAME=glue
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_INITDB_DATABASE=scraping
MONGO_URI=mongodb://glue:admin@mongodb:27017/scraping?authSource=admin
```

The entire application has been dockerized to make it easier to test. To do this, there is the docker-compose.yml file in this same root folder /scraping-api, where we have to navigate in the terminal and run:

```bash
$ docker-compose up --build -d
```

This will provide us with the necessary environment, having Nestjs listening on localhost:3000. It is normal for docker-compose build to take a while to complete the first time it is run.

Stop the process by running

```bash
$ docker-compose down
```

If you want to interact with the API, feel free to go to the [api](http://localhost:3000/api) to see the Swagger interface.

![alt text](https://i.ibb.co/jrFzJzs/Screenshot-2024-09-22-at-21-53-53-Swagger-UI.png)

### Endpoints

To make requests we can also use an interface like Insomnia

- POST /scraping Scrapes the submited URL.
  ![alt text](https://i.ibb.co/G5qbJYN/post-scraping.png)
- GET /scraping Lists all URLs stored in the database.
  ![alt text](https://i.ibb.co/svtGB8D/get-all-urls.png)
- GET /scraping/:id Gets the data for a specific URL by ID.
  ![alt text](https://i.ibb.co/c1fGQzg/get-url.png)

### MongoDB

To view the database and its collections we can use an application like [MongoDB Compass](https://www.mongodb.com/products/tools/compass)

![alt text](https://i.ibb.co/2P7nPZB/mongodb-compass.png)

## Option 2. Local environment

We need to generate a .env.local file in the root of the project for the MongoDB variables. This data is sensitive and should never be versioned, but it is necessary for testing.

```
MONGO_INITDB_ROOT_USERNAME=glue
MONGO_INITDB_ROOT_PASSWORD=admin
MONGO_INITDB_DATABASE=scraping
MONGO_URI=mongodb://glue:admin@localhost:27017/scraping?authSource=admin
```

```bash
$ npm install
```

```bash
$ docker-compose up --build -d
```

Once the docker is built, we stop nest_app to be able to start it locally since they share a port

Compile and run the project:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```



