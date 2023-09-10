import { SSTConfig } from "sst";
import { DatabaseStack } from "./stacks/Database";
import { ApiStack } from "./stacks/ApiStack";
import { MigrateStack } from "./stacks/Migrate";
import { AuthStack } from "./stacks/AuthStack";
import { FrontendStack } from "./stacks/Frontend";

export default {
  config(_input) {
    return {
      name: "flexmvp-starter-2",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app
      .stack(AuthStack)
      .stack(DatabaseStack)
      .stack(ApiStack)
      .stack(MigrateStack)
      .stack(FrontendStack);
  },
} satisfies SSTConfig;
