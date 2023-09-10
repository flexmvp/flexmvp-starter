"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { Input } from "react-daisyui";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Checkbox,
  FormButton,
  FormControl,
  FormError,
  FormSuccessMessage,
  Link,
} from "@flexmvp/components";
import config from "@flexmvp/config";
import { useAutoSignInInterval, useRedirectClient } from "@flexmvp/hooks";
import { appendQueryParams, codeOrMessage } from "@flexmvp/utils";

const VERIFY_URL = "/verify";

const formSchema = z.object({
  email: z.string().email("not a valid email").min(1, "email is required"),
  password: z
    .string()
    .min(1, "password is required")
    .min(8, "password must have more than 8 characters"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "you must accept the terms and conditions" }),
  }),
});
type FormSchemaType = z.infer<typeof formSchema>;

type RegisterFormProps = {
  onSuccess?: (data: any) => void;
  autoSignIn?: boolean;
};
export function RegisterForm({ onSuccess, autoSignIn }: RegisterFormProps) {
  // Component Hooks
  const autoSignInInterval = useAutoSignInInterval({
    redirectUrl: config.homepageUrl,
  });
  const redirectClient = useRedirectClient();

  // Form Methods
  const methods = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  // Form Handlers
  const onSubmit: SubmitHandler<FormSchemaType> = async ({
    email,
    password,
    terms,
  }) => {
    console.log("onSubmit", { email, password, terms });
    try {
      const signUpData = await Auth.signUp({
        username: email,
        password,
        attributes: { email },
        autoSignIn: { enabled: true },
        clientMetadata: {
          appUrl: window.location.protocol + "//" + window.location.host,
        },
      });
      const username = signUpData?.userSub;
      const clientId = (signUpData?.user as any)?.pool?.clientId;
      const redirectUrl = appendQueryParams(VERIFY_URL, {
        username,
        email,
        clientId,
      });

      if (autoSignIn) autoSignInInterval(email, password);
      if (onSuccess) onSuccess(signUpData);

      redirectClient(redirectUrl);
    } catch (error) {
      setError("root", { message: codeOrMessage(error) });
    }
  };

  // Render
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Email" id="email">
          <Input type="text" autoFocus />
        </FormControl>

        <FormControl label="Password" id="password">
          <Input type="password" autoComplete="on" />
        </FormControl>

        <FormControl id="terms" className="mb-0">
          <Checkbox type="checkbox">
            I accept the <Link href="#">Terms and Conditions</Link>
          </Checkbox>
        </FormControl>

        <div className="my-8 flex">
          <FormButton>Create account</FormButton>
        </div>
        <FormError />
        <FormSuccessMessage>
          Account created successfully, please check your email for confirmation
          link.
        </FormSuccessMessage>
      </form>
    </FormProvider>
  );
}
