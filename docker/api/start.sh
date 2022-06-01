#!/bin/sh

set -o errexit
set -o nounset

export DATABASE_URL="${DATABASE_URL:-postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}}"

python manage.py migrate --noinput
watchmedo auto-restart --directory=./  --pattern=""*.py"" --recursive -- python manage.py runserver 0.0.0.0:8000 --noreload
