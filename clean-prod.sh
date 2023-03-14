#! /usr/bin/bash
docker-compose -f ./docker-compose.prod.yaml down
docker image rm backend
docker image rm frontend
docker image rm nginx-proxy
docker image rm database
docker volume prune
docker network prune
