# Ellandi

To build this app, install Docker Desktop then run:

    docker-compose up --build

Migrations will applied automatically

Then you can access `http://localhost:8000` to view the api, and `http://localhost:3000` to view the web frontend

If you want to access the api's admin interface you need to run:

    docker-compose run api python manage.py createsuperuser

Then you can access `http://localhost:8000/admin` to login to the admin interface

## Local installation

To run the backend locally, or to run tests or linting:

    brew install postgresql
    python3 -m pip install -r api/requirements-dev.txt

To run the frontend locally:

    cd web && npm install


## Schema / Swagger

The schema is available at: http://localhost:8000/api/schema/ and the Swagger docs can be viewed at: http://localhost:8000/api/schema/swagger-ui/
