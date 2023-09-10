import { zodResolver } from "@hookform/resolvers/zod";
import { Auth } from "aws-amplify";
import { useCallback, useEffect, useState } from "react";
import { DualRing } from "react-css-spinners";
import { Button, Input } from "react-daisyui";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormRootError,
  FormSuccessMessage,
} from "@flexmvp/components";
import { useRedirectClient } from "@flexmvp/hooks";

import "react-css-spinners/dist/style.min.css";
import { codeOrMessage } from "@flexmvp/utils";

type VerifyFormProps = {
  code?: string;
  email?: string;
  username?: string;
  onSuccess?: (data: any) => void;
};
export function VerifyForm({
  code: defaultCode,
  email,
  username,
  onSuccess,
}: VerifyFormProps) {
  const formSchema = z.object({
    code: z
      .string()
      .nonempty("code is required")
      .min(6, "code must be 6 characters long")
      .max(6, "code must be 6 characters long"),
  });
  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: defaultCode,
    },
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async ({ code, ...data }) => {
    try {
      const confirmUsername = username || email;

      if (!code) throw new Error("code is required");
      if (!confirmUsername) throw new Error("username or email is required");

      // Confirm email with AWS.Amplify
      const result = await Auth.confirmSignUp(confirmUsername, code);

      if (onSuccess) onSuccess(result);
    } catch (error) {
      setError("root", { message: codeOrMessage(error) });
    }
  };

  const loading = isSubmitting || isSubmitSuccessful;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          label="Code"
          id="code"
          {...register("code")}
          error={errors.code?.message}
        >
          <Input type="text" disabled={!!loading} autoFocus />
        </FormControl>

        <div className="my-8 flex">
          <Button
            fullWidth
            disabled={loading}
            loading={loading}
            color="primary"
          >
            Verify
          </Button>
        </div>

        <FormRootError error={errors?.root} />
        {/* <FormSuccessMessage success={isSubmitSuccessful}>
          Email verified successfully
        </FormSuccessMessage> */}
      </form>
    </>
  );
}
