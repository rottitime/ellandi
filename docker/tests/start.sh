#!/bin/sh

set -o errexit
set -o nounset

DEBUG=True python manage.py migrate --noinput
DEBUG=True nosetests ./tests
DEBUG=False nosetests ./tests
