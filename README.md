# POC DOCKER ANGULAR KEYCLOAK
The goal of this POC is to configure security layer to establish secure oauth2 connection between angular front end application and spring boot resource server.  
This project also aims to provide a configuration that allows all the components of the project to run in a containerized environment.

## Necessary tools to build and launch poc angular keycloak project

- [JDK 21.0.2](https://jdk.java.net/21/)
- [Maven 3](https://maven.apache.org)
- [Docker Desktop](https://docs.docker.com/get-started/overview/)


## Steps to build the Docker images needed for this project
- ``cd pocdb``, ``docker build -t pocdb:latest -f Dockerfile .``
- ``cd front-end``, ``docker build -t poc-oauth2-front-end:latest -f docker/Dockerfile .``
- ``cd back-end``, ``docker build -t poc-oauth2-back-end:latest -f docker/Dockerfile .``

## Running the containerized project

- After building the Docker images, the project can be started using the following file: ``./docker/docker-compose.yaml``
- Create the containers using the following command line executed from the ``./docker`` folder: ``docker-compose up -d``
- A Keycloak admin interface is accessible at http://localhost:8080
- Access the PostgreSQL database using the following command: ``psql --username=pocdb  --dbname=pocdb``
- You can initialize ``t_poc_vhl_vehicle`` table with ``./docker/data/t_poc_vhl_vehicle.csv`` content: ``\COPY poc.t_poc_vhl_vehicle from '/absolute/path/t_poc_vhl_vehicle.csv' with (null 'NULL', format CSV, ENCODING 'UTF-8');``
- Create a snapshot of keycloak server content with the following command: ``docker cp keycloak:/opt/keycloak/data/h2 ./h2-keycloak-sv``
- Delete the containers using the following command line executed from the ``./docker`` folder: ``docker-compose down``
