#!/bin/sh

set -o errexit
set -o nounset

python manage.py migrate --noinput
DEBUG=True nosetests ./tests
DEBUG=False nosetests ./tests
