import clsx from "clsx";
import React, { FormHTMLAttributes } from "react";
import { IComponentBaseProps } from "react-daisyui/dist/types";
import { useFormContext, useFormState } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export type FormControlProps = FormHTMLAttributes<HTMLDivElement> &
  IComponentBaseProps & {
    fullWidth?: boolean;
    label?: string;
    helperText?: string;
    id: string;
    name?: string;
    errorKey?: string; // This can be used in case the error key is different from the id
    error?: string;
    children: React.ReactElement;
  };

const FormControlBase = React.forwardRef<HTMLDivElement, FormControlProps>(
  (
    {
      id,
      name,
      children,
      label,
      helperText,
      fullWidth,
      dataTheme,
      className,
      error: customError,
      errorKey,
      ...props
    },
    ref
  ): JSX.Element => {
    // Form Context
    const { register, getFieldState, ...context } = useFormContext() || {};
    const disabled = context.control._options.context?.disabled;
    const { isDirty, isTouched, invalid, error } = !!getFieldState
      ? getFieldState(id)
      : {
          isDirty: false,
          isTouched: false,
          invalid: false,
          error: customError ? { message: customError } : undefined,
        };
    const errorText = error?.message;

    // Styles
    const classes = clsx(twMerge("form-control mb-2", className), {
      "w-full": fullWidth,
    });
    const inputClassName = clsx({
      "border-error focus:outline-error": invalid,
    });

    // Validate children
    if (React.Children.count(children) !== 1) {
      throw new Error(
        "FormControl expects exactly one child element when {id} is provided."
      );
    }

    // Render
    return (
      <div {...props} data-theme={dataTheme} className={classes} ref={ref}>
        {label && <Label htmlFor={id}>{label}</Label>}
        {React.cloneElement(children, {
          id,
          // @ts-ignore
          name: name || id,
          className: inputClassName,
          disabled,
          ...(register ? register(id) : {}), // Here we're adding the register prop
        })}
        {helperText && <HelperText htmlFor={id}>{helperText}</HelperText>}
        {errorText && (
          <HelperText htmlFor={id} error>
            {errorText}
          </HelperText>
        )}
      </div>
    );
  }
);
FormControlBase.displayName = "FormControl";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> &
  IComponentBaseProps & {
    children?: string;
    htmlFor?: string;
  };

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, dataTheme, className, htmlFor, ...props }, ref): JSX.Element => {
    const classes = clsx(
      {
        "cursor-pointer": !!htmlFor,
      },
      twMerge("label label-text m-0 px-0 py-1", className)
    );
    return (
      <label {...props} htmlFor={htmlFor} className={classes}>
        <span className={""} ref={ref}>
          {children}
        </span>
      </label>
    );
  }
);
Label.displayName = "FormControlLabel";

const HelperText = React.forwardRef<
  HTMLLabelElement,
  LabelProps & { error?: boolean }
>(
  (
    { children, dataTheme, className, htmlFor, error, ...props },
    ref
  ): JSX.Element => {
    const classes = twMerge(
      clsx(
        "label-text-alt pt-2",
        {
          "text-error": !!error,
        },
        className
      )
    );
    return (
      <Label
        {...props}
        dataTheme={dataTheme}
        htmlFor={htmlFor}
        className={classes}
      >
        {children}
      </Label>
    );
  }
);
HelperText.displayName = "FormControlHelperText";

export const FormControl = Object.assign(FormControlBase, {
  Label,
  HelperText,
});
