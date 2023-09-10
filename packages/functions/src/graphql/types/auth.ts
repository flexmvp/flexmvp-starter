import { builder } from "../builder";
import { verifyEmail } from "@/core/cognito";

const AuthType = builder.objectType(Object, {
  name: "Auth",
  description: "Authentication response object",
  fields: (t) => ({
    code: t.string({
      resolve: () => "200",
      description: "HTTP status code",
    }),
    status: t.string({
      resolve: (parent, args, context, info) => {
        console.log("AuthType.status", { parent, args, context, info });
        return "success";
      },
      description: "Status of the request",
    }),
    // message: t.exposeString("message", { description: "Response message" }),
  }),
});

builder.mutationFields((t) => ({
  verify: t.field({
    type: AuthType,
    args: {
      emailAddress: t.arg.string({ required: true }),
      confirmationCode: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      const { emailAddress, confirmationCode } = args;
      const verification = verifyEmail({ emailAddress, confirmationCode });
      return {
        code: "200-custom",
        status: "success-custom",
        message: JSON.stringify(verification),
      };
    },
  }),
}));
