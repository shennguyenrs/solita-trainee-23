#! /usr/bin/bash
docker-compose -f ./docker-compose.dev.yaml down
docker volume prune
docker network prune
