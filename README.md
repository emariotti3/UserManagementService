# User Management Service

This document provides the necessary information to setup and run the User Management Service, which provides the following basic functionality:

    * Create a user profile.
    * Login to the service providing basic authentication credentials.
    * Secure endpoint to query user data.

This project makes use of a postgres database for persistence as well as a redis database for caching.  
    
## API Definition

To view this service's backend API check out the `user-management-service/user-service-definitions.yml` document.

## Requirements

In order to run this project you are required to install:

- Docker and Docker Compose.

## Run the project locally

If you have installed docker and docker-compose installed then follow these steps:

- cd into the project root directory and run `docker-compose up`.

### Run without docker

If you don't use docker, this part is a little bit harder. You'll be required to set up a local postgres database, and provide the appropriate connection credentials via environment variables, or by overriding the provided .env file (see .env file in user-management-service folder). You'll also be required to set up a redis cache and override connection parameters via environment variables. 

Once you've done that, you can open up a terminal and follow these steps:

- cd into the project's `user-management-service`.
- run `npm install dotenv`.
- run `npm install`.
- run `npm run start`.

## Considerations

- A .env file has been provided to facilitate application setup, but it is strongly advised that this file (or the environment variables provided within it) should be overriden to provide better security. You can find this file inside the user-management-service folder.

## Run Service Tests

- cd into service directory `cd user-management-service`
- run the following command `npm test`

## TODOs and Pending Improvements 

- A refresh token mechanism should be provided to avoid possible MITM attacks.
- Testing coverage must be improved.
- Https support must be added.
- Logger is currently configured for console logging, but at least one other option should be provided.


