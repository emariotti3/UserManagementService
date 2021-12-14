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

- cd into the project root directory and run `docker-compose up`.

## Considerations

- A .env file has been provided to facilitate application setup, but it is strongly advised that this file (or the environment variables provided within it) should be overriden to provide better security.

## TODOs and Pending Improvements 

- A refresh token mechanism should be provided to avoid possible MITM attacks.
- Database connection settings should be dynamically set in runtime.

