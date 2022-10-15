# #!/bin/sh

set -o errexit
set -o nounset

envsubst '${API_HOST},${RESOLVER}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
