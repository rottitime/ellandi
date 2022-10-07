#!/bin/sh

set -o errexit
set -o nounset

python manage.py migrate --noinput

python manage.py runserver 0.0.0.0:8000
