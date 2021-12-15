# User Management Service

This document provides the necessary information to setup and run the User Management Service, which provides the following basic functionality:

    * Create a user profile.
    * Login to the service providing basic authentication credentials.
    * Secure endpoint to query user data.

To view this service's backend API check out the `user-management-service/user-service-definitions.yml` document.

## Requirements

In order to run this project you are required to install:

- Docker and Docker Compose.

## Run the project locally

If you have installed docker and docker-compose then follow these steps:

- cd into the project root directory and run `docker-compose up`.

Otherwise, you'll be required to set up a local relational database, and provide the appropriate connection credentials via environment variables, or by overriding the provided .env file. Once you've done that, you can open up a terminal and follow these steps:

- cd into the project's `user-management-service` and run `npm run start`.


## Considerations

- A .env file has been provided to facilitate application setup, but it is strongly advised that this file (or the environment variables provided within it) should be overriden to provide better security. You can find this file inside the user-management-service folder.

## Run Service Tests

- cd into service directory `cd user-management-service`
- run the following command `npm test`

## TODOs and Pending Improvements 

- A refresh token mechanism should be provided to avoid possible MITM attacks.
- Testing coverage must be improved.

