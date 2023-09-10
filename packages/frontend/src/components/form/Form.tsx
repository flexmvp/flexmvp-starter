// Form.tsx

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";
import { filterChildren } from "@flexmvp/utils";
import { FormButton } from "./FormButton";
import { FormControl } from "./FormControl";
import { FormError } from "./FormError";
import { TextInput } from "./TextInput";

/**
 * FormProps Type Definition
 *
 * @template T
 * This should be a Zod schema type representing the structure of your form.
 *
 * @template U
 * This should be a return model type from the GraphQL endpoint. If not provided, defaults to T.
 */
export type FormProps<T extends FieldValues, U = T> = Omit<
  React.HTMLProps<HTMLFormElement>,
  "onSubmit"
> & {
  onSubmit: SubmitHandler<T>;
  schema: z.ZodSchema<T>;
  defaultValues?: DefaultValues<T>;
  disabled?: boolean;
  children: JSX.Element | (JSX.Element | undefined)[];
  onSuccess?: (data: Partial<U>) => void;
};
export type CustomFormProps<T extends FieldValues, U = T> = Omit<
  FormProps<T, U>,
  "onSubmit" | "schema" | "children"
>;

type FormComponentType = React.FC<FormProps<any> & {}> & {
  Button: typeof FormButton;
  Error: typeof FormError;
  Control: typeof FormControl;
  TextInput: typeof TextInput;
};

const Form: FormComponentType = ({
  onSubmit,
  schema,
  defaultValues,
  disabled = false,
  children,
  ...props
}) => {
  type SchemaType = z.infer<typeof schema>;
  const methods = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues,
    context: {
      disabled: disabled,
    },
  });

  const handleSubmit = async (data: SchemaType) => {
    try {
      await onSubmit(data);
      // reset form
      if (false) methods.reset();
    } catch (error) {
      if (error instanceof Error) {
        methods.setError("root", {
          type: "manual",
          message: error.message,
        });
      } else {
        methods.setError("root", {
          type: "manual",
          message: "An unexpected error occurred.",
        });
      }
    }
  };

  // handle default values that are changed after the form is mounted
  // this is useful for when you are fetching data from the server
  useEffect(() => {
    if (defaultValues) methods.reset(defaultValues);
  }, [methods, defaultValues]);

  const buttons = filterChildren(children, "FormButton", "eq");
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} {...props}>
        {filterChildren(children, "FormButton", "ne")}
        {/* <FormButton>Submit</FormButton> */}
        <div className="mt-8 flex flex-col w-full space-y-4 sm:space-y-0 sm:flex-row">
          {buttons}
        </div>
        <Form.Error />
      </form>
    </FormProvider>
  );
};

/** Display name required for dynamic children filtering */
FormButton.displayName = "FormButton";
FormError.displayName = "FormError";
FormControl.displayName = "FormControl";
TextInput.displayName = "TextInput";

/** Export named components */
Form.Button = FormButton;
Form.Error = FormError;
Form.Control = FormControl;
Form.TextInput = TextInput;

export { Form };
