# Ellandi

To build this app, install Docker Desktop then run

    docker-compose build api
    docker-compose run api python manage.py migrate
    docker-compose run api python manage.py createsuperuser

Then whenever you want to start the app:

    docker-compose up --build api
