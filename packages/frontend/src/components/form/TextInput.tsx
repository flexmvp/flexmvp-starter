import React from "react";
import { Input as DaisyInput, InputProps } from "react-daisyui";
import { FormControl, FormControlProps } from "./FormControl";

/**
 * Props for a controlled input component, extending the base FormControl props.
 */
interface ControlledInput extends Omit<FormControlProps, "children"> {
  /** Id attribute for the input */
  id: string;
  /** Name attribute for the input */
  name?: string;
  /** Optional label for the input, if not provided, ID is used as a fallback */
  label?: string;
  /** Optional placeholder text for the input */
  placeholder?: string;
  /** Current value for the input */
  value?: string | number | boolean;
  /** Change handler for the input */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Blur handler for the input */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Input type, like 'text', 'checkbox', 'radio', etc. */
  type: string;
  /** Indicates if the input is required */
  required?: boolean;
  /** Indicates if the input is disabled */
  disabled?: boolean;
  // ... add other common input props you might need
}

/**
 * Props specific to a text input component, extending the base ControlledInput props.
 */
interface TextInput extends Omit<ControlledInput, "type"> {
  /** Value of the text input */
  value?: string;
  /** Color theme for the input, sourced from DaisyUI's Input component */
  color?: React.ComponentProps<typeof DaisyInput>["color"];
}

/**
 * A text input component wrapped with FormControl, utilizing the DaisyUI Input component.
 *
 * @param props TextInput props
 */
const TextInput: React.FC<TextInput> = ({
  id,
  label,
  name,
  placeholder,
  ...props
}) => (
  <FormControl id={id} label={label}>
    <DaisyInput
      type="text"
      name={name || id}
      placeholder={placeholder}
      {...props}
    />
  </FormControl>
);

export { TextInput };
