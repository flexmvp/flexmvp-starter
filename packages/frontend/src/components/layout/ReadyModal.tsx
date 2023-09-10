"use client";
import clsx from "clsx";
import { Roller } from "react-css-spinners";
import { Modal } from "react-daisyui";
import { useReady } from "@flexmvp/hooks";

export function ReadyModal({
  alwaysVisible = false,
  classNames = "",
  ...props
}) {
  const { isReady } = useReady();
  const visible = !isReady;
  return (
    <Modal
      {...props}
      open={visible || alwaysVisible}
      className={clsx("bg-transparent shadow-none", classNames)}
    >
      <Modal.Body className="flex flex-col items-center ">
        <Roller
          color="hsl(var(--b1))" // // https://daisyui.com/docs/colors/ (CSS Variable)
        />
        {/* [loading...] */}
      </Modal.Body>
    </Modal>
  );
}
