import clsx from "clsx";
import React from "react";
import { Button, ButtonProps as DaisyButtonProps } from "react-daisyui";
import { ComponentColor } from "react-daisyui/dist/types";
import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type FormButtonProps = DaisyButtonProps & {
  isSubmitting?: boolean;
  // fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  color?: ComponentColor;
  className?: string;
  end?: boolean;
  children?: React.ReactNode; // This prop is used for the content of the button
};

const FormButton: React.FC<FormButtonProps> = ({
  isSubmitting: isSubmittingOverride,
  children = "Submit", // default to "Submit" if no children are provided
  // fullWidth = true,
  type = "submit",
  color = "primary",
  end = false,
  className,
  ...props
}) => {
  const {
    formState: { isSubmitting: formIsSubmitting, isLoading },
    ...context
  } = useFormContext();

  // Use `isSubmittingOverride` as a fallback if it's provided. Otherwise, use `formIsSubmitting`.
  const finalIsSubmitting =
    isSubmittingOverride !== undefined
      ? isSubmittingOverride
      : formIsSubmitting;

  return (
    <Button
      // fullWidth={fullWidth}
      disabled={finalIsSubmitting || context.control._options.context?.disabled}
      loading={type === "submit" && finalIsSubmitting}
      color={color}
      type={type}
      className={twMerge(
        clsx("w-full sm:w-auto ml-0 sm:ml-4 sm:first:ml-0", {
          "sm:ml-auto": !!end,
        }),
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};
FormButton.displayName = "FormButton";

export { FormButton };
