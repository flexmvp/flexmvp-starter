import { PlusIcon } from "@heroicons/react/20/solid";
import { cloneElement, ReactElement, ReactFragment } from "react";
import { Button, ButtonProps } from "react-daisyui";
import { twMerge } from "tailwind-merge";

type ResponsiveButtonProps = ButtonProps & {
  startIcon?: ReactElement;
  endIcon?: ReactElement;
};
/**
 * ResponsiveButton renders a Floating Action Button when the screen is
 * smaller than `md` breakpoint.
 * @param param0
 * @returns
 */
export function ResponsiveButton({
  className: _className,
  startIcon,
  endIcon,
  ...props
}: ResponsiveButtonProps) {
  const icon = cloneElement(startIcon || endIcon || <PlusIcon />, {
    className: twMerge("w-8 h-8"),
  });
  return (
    <>
      <Button
        className={twMerge("hidden md:inline-flex", _className)}
        color="primary"
        startIcon={startIcon}
        endIcon={endIcon}
        {...props}
      >
        New Article
      </Button>
      <Button
        className={twMerge(
          "fixed bottom-4 right-4 md:hidden z-[100]",
          _className
        )}
        {...props}
        startIcon={undefined}
        endIcon={undefined}
        shape="circle"
        {...props}
      >
        {icon}
      </Button>
    </>
  );
}
