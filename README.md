# z-account-api

## Running the Api 

### With Docker-compose

The docker-compose file contains the database and api implementations.
With docker-compose installed, simply run the following command.

``docker-compose up -d``

The API will be started on port 3000.

## Without Docker-compose

If docker-compose is not installed.
This mode of execution requires mongodb previously installed and running on port 27017.

Run ``npm start`` to start the API. 

The API will be started on port 3000.

## Unit tests

The unit tests are in the spec.js files under the folder *tests*.

Atfer starting the database (or docker-compose), run ``npm test`` to execute the test suite.

## Architecture

### Core
The main code, containing the use cases, is under the folder *core*.
It contains the service modules, which contain the business rules, and the cross-cutting concern modules, which contain code that is used by multiple other files, for example, the id generation.

### Factories
The factories are responsible to "inject" the modules whose are not supposed to be called by inner modules, for example, core modules calling db modules.

### Infra
Contain the database models, connection file and adapters. In this case the database being used is the MongoDb.
The adapters have the responsibility of adapting the data to be passed to and from the core modules.

## Main files
### routes.js:
Contains the definition of the API endpoints. It calls the service modules and passes the http requests to them as objects as well as it receives and passes the responses back to de requester.

### server.js:
Contains the definition of the API port and calls Express.