#!/bin/sh
# Entrypoint script for Liquibase migration

set -e

# Wait for the database to be ready
until pg_isready -h "$PGHOST" -p "$PGPORT" -U "$PGUSER"; do
  echo "Waiting for database..."
  sleep 2
done

echo "Database is ready. Running Liquibase migrations..."

liquibase \
  --url=jdbc:postgresql://$PGHOST:$PGPORT/$PGDATABASE \
  --changeLogFile=/liquibase/changelog.xml \
  --username=$PGUSER \
  --password=$PGPASSWORD \
  update

tail -f /dev/null
