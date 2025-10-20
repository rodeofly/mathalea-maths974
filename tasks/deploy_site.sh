#!/bin/bash

# Load environment variables from a .env file
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Set paths from environment variables or use defaults
LOCAL_DIST_PATH="${LOCAL_DIST_PATH:-/absolute/path/to/local/dist}"
REMOTE_SERVER="${REMOTE_SERVER:-user@server}"
REMOTE_BUILDS_PATH="${REMOTE_BUILDS_PATH:-~/remote/builds/path}"
REMOTE_DIST_PATH="${REMOTE_DIST_PATH:-~/remote/dist/path}"
REMOTE_STATIC_PATH="${REMOTE_STATIC_PATH:-~/remote/static/path}"

# Set the new build path
TIMESTAMP=$(date +"%Y_%m_%d_%Hh%Mmin%Ss")
REMOTE_CURRENT_BUILD_PATH="${REMOTE_BUILDS_PATH}/${TIMESTAMP}"

# Send files to the remote server
rsync -avz ${LOCAL_DIST_PATH}/ ${REMOTE_SERVER}:${REMOTE_CURRENT_BUILD_PATH}/

# Edit the symbolic link to point to the new build
ssh ${REMOTE_SERVER} "rm ${REMOTE_DIST_PATH}; ln -s ${REMOTE_CURRENT_BUILD_PATH}/ ${REMOTE_DIST_PATH}; ln -s ${REMOTE_STATIC_PATH}/ ${REMOTE_DIST_PATH}/static"

echo "Déploiement terminé. Le site est disponible dans ${REMOTE_CURRENT_BUILD_PATH} et lié à ${REMOTE_DIST_PATH}. Le dossier des statiques ${REMOTE_STATIC_PATH} est lié à ${REMOTE_DIST_PATH}/static."
