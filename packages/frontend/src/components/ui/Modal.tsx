import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, {
  cloneElement,
  forwardRef,
  ReactElement,
  useCallback,
  useRef,
} from "react";
import { Button, Modal as DaisyModal } from "react-daisyui";
import { IComponentBaseProps } from "react-daisyui/dist/types";
import { twMerge } from "tailwind-merge";

/**
 * This is a copy of react-daisyui's Modal component, with the following changes:
 *
 * - The `form` element is removed from the `Modal` component by default to allow
 *  for custom form elements to be passed as children.
 *
 * source: https://github.com/daisyui/react-daisyui/blob/main/src/Modal/Modal.tsx
 */

export type ModalProps = React.HTMLAttributes<HTMLDialogElement> &
  IComponentBaseProps & {
    open?: boolean;
    responsive?: boolean;
    backdrop?: boolean;
    closeButton?: boolean;
    hasForm?: boolean;
  };

const ModalBase = forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      children,
      open,
      responsive,
      backdrop,
      closeButton,
      dataTheme,
      className,
      hasForm,
      ...props
    },
    ref
  ): JSX.Element => {
    const containerClasses = twMerge(
      "modal",
      clsx({
        "modal-open": open,
        "modal-bottom sm:modal-middle": responsive,
      })
    );

    const bodyClasses = twMerge("modal-box", className);

    // <form /> wrapper is required to close dialog on submit or button.onClick
    const BodyWrapper = !hasForm
      ? (props: any) => <form method="dialog" {...props} />
      : "div";

    return (
      <dialog
        {...props}
        aria-label="Modal"
        aria-hidden={!open}
        open={open}
        aria-modal={open}
        data-theme={dataTheme}
        className={containerClasses}
        ref={ref}
      >
        <BodyWrapper className={bodyClasses}>
          {closeButton && (
            <form method="dialog">
              <Button
                size="sm"
                color="ghost"
                shape="circle"
                className="absolute right-2 top-2 font-normal"
              >
                <XMarkIcon className="w-6 h-6" />
              </Button>
            </form>
          )}
          {children}
        </BodyWrapper>
        {backdrop && (
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        )}
      </dialog>
    );
  }
);

ModalBase.displayName = "Modal";

export type DialogProps = Omit<ModalProps, "ref">;
const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleShow = useCallback(() => {
    dialogRef.current?.showModal();
  }, [dialogRef]);

  const handleHide = useCallback(() => {
    dialogRef.current?.close();
  }, [dialogRef]);

  const Dialog = ({ children, ...props }: DialogProps) => {
    return (
      <ModalBase {...props} ref={dialogRef}>
        {children}
      </ModalBase>
    );
  };
  Dialog.displayName = "Dialog";
  return { dialogRef, Dialog, handleShow, handleHide };
};
export const Modal = Object.assign(ModalBase, {
  Header: DaisyModal.Header,
  Body: DaisyModal.Body,
  Actions: DaisyModal.Actions,
  DaisyModal: DaisyModal, // required as export for CSS to work
  // Legacy: ModalLegacy,
  useDialog,
});
