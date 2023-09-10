import React from "react";
import { useFormContext } from "react-hook-form";
import { FormControl } from "@flexmvp/components"; // Assuming you have exported HelperText from FormControl
import { getKnownErrorMessage } from "@flexmvp/utils";

type FormErrorProps = {
  errorKey?: string;
  className?: string;
  error?: string;
};

export const FormError: React.FC<FormErrorProps> = ({
  error: customError,
  errorKey = "root",
  className,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  if (!errors[errorKey]?.message) return null;

  const errorText = customError || errors[errorKey]?.message?.toString();

  if (!errorText) return null;

  return (
    <FormControl.HelperText className={`text-error ${className || ""}`}>
      {getKnownErrorMessage(errorText)}
    </FormControl.HelperText>
  );
};
