cat ./postgres/dump_05-01-2023_12_05_30.sql | docker exec -i database psql -U admin trips
