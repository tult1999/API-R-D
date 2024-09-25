# Access into postgres instance
sudo docker exec -it postgres_db psql -U postgres -d test -a -f /docker-entrypoint-initdb.d/pg_schema_ddl.sql