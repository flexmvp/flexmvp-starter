import React, { forwardRef } from "react";
import {
  Checkbox as DaisyCheckbox,
  CheckboxProps as DaisyCheckboxProps,
} from "react-daisyui";

type CheckboxProps = DaisyCheckboxProps & {
  children?: React.ReactNode;
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const { children, ...restProps } = props;

  return (
    <div className="flex items-center mt-6">
      <DaisyCheckbox
        id={props.id}
        name={props.name || props.id}
        type="checkbox"
        ref={ref}
        {...restProps}
      />
      <div className="ml-3 text-sm">
        <label htmlFor={props.id} className="cursor-pointer">
          {children}
        </label>
      </div>
    </div>
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
