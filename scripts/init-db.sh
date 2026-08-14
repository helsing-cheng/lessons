#!/usr/bin/env bash
set -e

# Usage: ./scripts/init-db.sh [mysql_user] [mysql_password]
# Example: ./scripts/init-db.sh root myrootpass

USER=${1:-root}
PASS=${2:-}

MYSQL_CMD="mysql -u${USER}"
if [ -n "$PASS" ]; then
  MYSQL_CMD="$MYSQL_CMD -p${PASS}"
fi

echo "Creating database 'teaching' and importing db/init.sql..."
$MYSQL_CMD -e "CREATE DATABASE IF NOT EXISTS teaching CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;"
$MYSQL_CMD teaching < db/init.sql

echo "Done. If you used root credentials, remember to create the 'teach' user and grant privileges as described in the README."
