/**
 * https://github.com/gabriel-richardson/sst-drizzle-example/blob/ea495d06135fb1383a5b108455471028fefe008d/packages/functions/src/migrator.ts
 **/
import { ApiHandler } from "sst/node/api";
import { migrate } from "@/core/db";

export const handler = ApiHandler(async (_evt) => {
  const pathToMigrations = process.env.IS_LOCAL
    ? "packages/core/migrations"
    : "migrations";

  console.log("migrator", {
    "process.env.IS_LOCAL": process.env.IS_LOCAL,
    pathToMigrations,
  });

  await migrate(pathToMigrations);

  return {
    body: "Migrated!",
  };
});

export const voidHandler = ApiHandler(async (_evt) => {
  const pathToMigrations = process.env.IS_LOCAL
    ? "packages/core/migrations"
    : "migrations";

  console.log("migrator", {
    "process.env.STAGE": process.env.STAGE,
    "process.env.IS_LOCAL": process.env.IS_LOCAL,
    pathToMigrations,
  });

  return {
    body: "VOID!",
  };
});
