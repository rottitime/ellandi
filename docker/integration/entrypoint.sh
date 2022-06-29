#!/bin/sh

set -o errexit
set -o nounset

wait-for-it "web:3000" --timeout=30

exec "$@"
