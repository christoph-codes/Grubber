# Grubber API

## Basic Info

This service is built using Node.js utilizing Express.js and runs on port 3333.
The Docker container is built utilizing a PM2 runtime environment.

## Running Locally

To run locally, use the command `npm start`. This will transpile the code to JavaScript and start the service. This will run on port 3333.

## Linting

Linting rules can be found in the tslint.json. To run the linter use the command `npm run lint`.

## Testing

This project utilizes Mocha with Chai for unit testing. To run unit tests use the command `npm run test`.
This command also will run the linter. The global coverage thresholds for code coverage are set to 95%.

## Baking the Docker Image

The Docker image is built utilizing a PM2 runtime environment. The build command requires the APP_ENV build argument (Either DEV or PROD).
For a dev environment use the command ``docker build --build-arg APP_ENV=DEV --tag grubberapi .``
For a prod environment use the command ``docker build --build-arg APP_ENV=PROD --tag grubberapi .``

## Starting the Container

To start the Docker container use the following command: ``docker run --publish 80:3333 --detach --name ga grubberapi``
This routes traffic from the server's port 80 to the container's port 3333.