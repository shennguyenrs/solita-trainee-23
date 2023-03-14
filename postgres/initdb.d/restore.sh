#!/bin/bash
file="/docker-entrypoint-initdb.d/binary_dump.pgdata"
dbname=trips
pg_restore -U admin --dbname=$dbname --verbose --single-transaction < "$file" || exit 1
