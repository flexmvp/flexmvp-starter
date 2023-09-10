"use client";
import { useFormContext } from "react-hook-form";
import { FormControl } from "@flexmvp/components";

export function FormSuccessMessage({
  children,
  isSubmitSuccessful: isSubmitSuccessfulOverride = undefined,
}: {
  children: string;
  isSubmitSuccessful?: boolean;
}) {
  const {
    formState: { isSubmitSuccessful },
  } = useFormContext();

  // use override if provided, else use form state
  const isSubmitSuccessfulFinal =
    isSubmitSuccessfulOverride ?? isSubmitSuccessful;

  if (!isSubmitSuccessfulFinal) return null;

  return (
    <>
      <FormControl.HelperText className="text-success">
        {children}
      </FormControl.HelperText>
    </>
  );
}
