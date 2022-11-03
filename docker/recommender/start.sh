#!/bin/sh

set -o errexit
set -o nounset

python create_recommendations.py
