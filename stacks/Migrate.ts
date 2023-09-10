import { dependsOn, StackContext, Script, use } from "sst/constructs";
import { DatabaseStack } from "./Database";
import { ApiStack } from "./ApiStack";

export function MigrateStack({ stack }: StackContext) {
  dependsOn(ApiStack);
  dependsOn(DatabaseStack);
  new Script(stack, "migrate", {
    defaults: {
      function: {
        bind: [use(DatabaseStack)],
        environment: {
          STAGE: stack.stage,
        },
        copyFiles: [
          {
            from: "packages/core/migrations",
            to: "migrations",
          },
        ],
      },
    },

    onCreate: "packages/functions/src/migrator.handler",
    onUpdate: "packages/functions/src/migrator.handler",
  });
}
