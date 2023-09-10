"use client";
import { useState } from "react";
import { Button } from "react-daisyui";
import { FormControl, LoadedIcon, LoadingIcon } from "@flexmvp/components";
import { delay } from "@flexmvp/utils";

type ResendConfirmationEmailButtonProps = {
  email: string;
  onClick?: () => void;
};
export function ResendConfirmationEmailButton({
  email,
  onClick = () => {},
}: ResendConfirmationEmailButtonProps) {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string>();

  const handleOnClick = async () => {
    setIsSent(false);
    setIsSending(true);
    try {
      await Promise.all([onClick(), delay(1000)]);
      setIsSending(false);
      setIsSent(true);
    } catch (error: unknown) {
      setError(
        (error as Error)?.message ||
          "An error occurred. Please try again later."
      );
      setIsSent(false);
      setIsSending(false);
    }
  };
  return (
    <>
      <Button
        type="button"
        variant="link"
        onClick={handleOnClick}
        className={"-ml-4 -pl-4"}
        disabled={isSending}
      >
        Resend confirmation to {email}
        {isSending && <LoadingIcon />}
        {isSent && <LoadedIcon />}
      </Button>
      {error && (
        <FormControl.HelperText className="text-error">
          {error}
        </FormControl.HelperText>
      )}
    </>
  );
}
