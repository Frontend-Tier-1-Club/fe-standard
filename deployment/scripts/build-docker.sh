#!/usr/bin/env bash

set -e

# Login to Gitlab Registry
echo "$GITLAB_REGISTRY_TOKEN" | docker login http://registry.gitlab.com -u $GITLAB_REGISTRY_USER --password-stdin

# Check if .env file exists, if not create it
if [ ! -f .env ]; then
  touch .env
fi

# Define environment variables to be added
env_vars=(
  "NODE_ENV=production"
  "NEXT_PUBLIC_APP_VERSION=$GITHUB_REF_NAME"
  "NEXT_TELEMETRY_DISABLED=1"
)

# Add environment variables to .env file if they do not already exist
for env_var in "${env_vars[@]}"; do
  if ! grep -q "^${env_var%%=*}=" .env; then
    echo "$env_var" >> .env
  fi
done

echo "Add environment variables to .env file successfully"

echo "Start update version in docker-compose files"
sed -i 's/\(image: registry\.gitlab\.com\/tier1club\/tier1-frontend:\)[0-9.]\+/\1'$GITHUB_REF_NAME'/g' deploy/docker-compose.production.yml
sed -i 's/\(registry\.gitlab\.com\/tier1club\/tier1-frontend:\)[0-9.]\+/\1'$GITHUB_REF_NAME'/g' deploy/docker-compose.local.yml

echo "Update version in docker-compose files successfully"

# Build and push Docker image
docker compose --env-file .env -f deployment/docker-compose.local.yml build

echo "Start push image to Gitlab Registry"
IMAGE_NAME="registry.gitlab.com/tier1club/tier1-frontend:$GITHUB_REF_NAME"
docker push $IMAGE_NAME
