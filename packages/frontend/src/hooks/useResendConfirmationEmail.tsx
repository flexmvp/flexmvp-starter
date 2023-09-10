// useResendConfirmationEmail.ts
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useAutoSignInInterval } from "@flexmvp/hooks";

export function useResendConfirmationEmail(autoSignIn: boolean) {
  const [resendEmail, setResendEmail] = useState<string | null>(null);
  const [resendPassword, setResendPassword] = useState<string | null>(null);
  const autoSignInInterval = useAutoSignInInterval();

  const resendConfirmationEmail = async () => {
    // Ensure credentials are set
    if (!resendEmail) {
      throw new Error("Resend email not set");
    }

    const resend = await Auth.resendSignUp(resendEmail, {
      appUrl: window.location.protocol + "//" + window.location.host,
    });
    if (autoSignIn && resendPassword)
      autoSignInInterval(resendEmail, resendPassword);

    return resend;
  };

  const setResendCredentials = (email: string, password: string) => {
    setResendEmail(email);
    setResendPassword(password);
  };

  return {
    resendConfirmationEmail,
    setResendCredentials,
    resendEmail,
  };
}
