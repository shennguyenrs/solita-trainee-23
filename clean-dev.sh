#! /usr/bin/bash
docker-compose -f ./docker-compose.dev.yaml down
docker image rm backend
docker volume prune
docker network prune
