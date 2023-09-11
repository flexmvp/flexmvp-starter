/**
 * https://github.com/chrisfitkin/sst-drizzle-example/blob/ea495d06135fb1383a5b108455471028fefe008d/packages/core/src/sql/index.ts
 **/
import { RDSDataClient } from "@aws-sdk/client-rds-data";
import { drizzle } from "drizzle-orm/aws-data-api/pg";
import { migrate as dataApiMigrate } from "drizzle-orm/aws-data-api/pg/migrator";
import { RDS } from "sst/node/rds";

const rdsClient = new RDSDataClient({});

export const db = drizzle(rdsClient, {
  secretArn: RDS.db.secretArn,
  resourceArn: RDS.db.clusterArn,
  database: RDS.db.defaultDatabaseName,
  logger: !!process.env?.IS_LOCAL,
});

export const migrate = async (path: string) => {
  return dataApiMigrate(db, { migrationsFolder: path });
};

export * as DB from "./db";

// TODO: connect to local docker database for local development
// https://github.com/drizzle-team/drizzle-orm/blob/main/drizzle-orm/src/pg-core/README.md#connect-using-node-postgres-client
/**
 * // db.ts
import { pgTable, serial, text, varchar } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import { users } from './schema';

const client = new Client({
  connectionString: 'postgres://user:password@host:port/db',
});
// or
const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'db_name',
});

await client.connect();

const db = drizzle(client);

const allUsers = await db.select().from(users);
 */
