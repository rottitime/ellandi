#!/bin/sh

set -o errexit
set -o nounset

wait-for-it "${POSTGRES_HOST}:${POSTGRES_PORT}" --timeout=30

exec "$@"
