#!/bin/sh

set -o errexit
set -o nounset

nginx -g 'daemon off;'
