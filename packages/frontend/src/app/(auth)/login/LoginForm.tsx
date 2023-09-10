"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { Input } from "react-daisyui";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormError } from "@flexmvp/components";
import config from "@flexmvp/config";
import { useRedirectClient, useResendConfirmationEmail } from "@flexmvp/hooks";
import { useAuthState } from "@flexmvp/stores";
import { codeOrMessage } from "@flexmvp/utils";
import { ResendConfirmationEmailButton } from "./ResendConfirmationEmailButton";

type LoginFormProps = {
  onSuccess: () => void;
  autoSignIn?: boolean;
};

export function LoginForm({ onSuccess, autoSignIn = true }: LoginFormProps) {
  /** Component Variables & Hooks */
  const { setUser } = useAuthState();
  const { resendConfirmationEmail, setResendCredentials, resendEmail } =
    useResendConfirmationEmail(autoSignIn);
  const redirect = useRedirectClient();

  /** Form Schema */
  const formSchema = z.object({
    email: z.string().email("not a valid email").min(1, "email is required"),
    password: z
      .string()
      .min(1, "password is required")
      .min(8, "password must have more than 8 characters"),
  });
  type FormSchemaType = z.infer<typeof formSchema>;

  /** Form Methods */
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods;

  /** Form Handlers */
  const onSubmit: SubmitHandler<FormSchemaType> = async ({
    email,
    password,
  }) => {
    try {
      const user = await Auth.signIn(email, password);
      if (user) {
        await setUser(user);
        redirect(config.homepageUrl);
      }
    } catch (error) {
      setResendCredentials(email, password);
      setError("root", { message: codeOrMessage(error) });
    }
  };

  const showResend =
    errors.root?.message === "UserNotConfirmedException" && !!resendEmail;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Email" id="email">
          <Input type="text" autoFocus />
        </FormControl>
        <FormControl label="Password" id="password">
          <Input type="password" autoComplete="on" />
        </FormControl>
        <div className="my-8 flex">
          <Form.Button>Sign in</Form.Button>
        </div>
        <FormError />
        {showResend && (
          <ResendConfirmationEmailButton
            email={resendEmail}
            onClick={() => resendConfirmationEmail()}
          />
        )}
      </form>
    </FormProvider>
  );
}
