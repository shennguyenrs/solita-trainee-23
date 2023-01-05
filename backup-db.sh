docker exec -t database pg_dumpall -c -U admin > ./postgres/dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql 
