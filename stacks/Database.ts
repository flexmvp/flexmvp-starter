import path from "path";
import { RDS, StackContext, Function } from "sst/constructs";

export function DatabaseStack({ stack }: StackContext) {
  const rds = new RDS(stack, "db", {
    engine: "postgresql11.13",
    defaultDatabaseName: "flexdb",
    // migrations: "packages/migrations", // kysely migrations only
    // types: "packages/rds.generated.ts",
  });

  return rds;
}
