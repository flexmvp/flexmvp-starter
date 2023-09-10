import { builder } from "../builder";

builder.queryFields((t) => ({
  me: t.field({
    type: "String",
    resolve: async (parent, args, context, info) => {
      console.log("me", { parent, args, context, info });
      return "you";
    },
  }),
}));
