#!/bin/sh

set -o errexit
set -o nounset

cat > ../.env <<EOF
NODE_ENV=production
VITE_FRONTEND_HOST="$VITE_FRONTEND_HOST"
VITE_API_ROOT_URL="$VITE_API_ROOT_URL"
VITE_IS_DEMO_MODE=$VITE_IS_DEMO_MODE
EOF

npm run prod
