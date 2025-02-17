include .env
export $(shell sed 's/=.*//' .env)

postgres:
	docker run --name lumaa_postgres -p ${DB_PORT}:${DB_PORT} -e POSTGRES_USER=${DB_USER} -e POSTGRES_PASSWORD=${DB_PASSWORD} -d postgres:16-alpine

createdb:
	docker exec -it lumaa_postgres createdb --username=${DB_USER} --owner=${DB_USER} lumaa

dropdb:
	docker exec -it lumaa_postgres dropdb lumaa

migrateup:
	npx tsx src/migrateUp.ts

migratedown:
	npx tsx src/migrateDown.ts
	
.PHONY: postgres createdb dropdb migrateup migratedown
