"use client";
// if (window) (window as unknown as { LOG_LEVEL: string }).LOG_LEVEL = "INFO";

import { Auth } from "aws-amplify";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Divider } from "react-daisyui";
import { Alert, Link, Spinner } from "@flexmvp/components";
import config from "@flexmvp/config";
import { AUTO_SIGN_IN_INTERVAL, useAutoSignInListener } from "@flexmvp/hooks";
import { VerifyForm } from "./VerifyForm";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const username = searchParams.get("username");
  const clientId = searchParams.get("clientId");
  const region = searchParams.get("region");
  const email = searchParams.get("email");
  const [waiting, setWaiting] = useState(true);

  const [step, setStep] = useState<"verify" | "success" | "error" | "invalid">(
    "verify"
  );

  // Test for valid username and email
  useEffect(() => {
    if (!username || !email) setStep("invalid");
  }, [username, email]);

  // Wait for autosignin on another tab
  useEffect(() => {
    if (step === "success") {
      setWaiting(true);
      setTimeout(() => {
        setWaiting(false);
      }, AUTO_SIGN_IN_INTERVAL);
    }
  }, [step]);

  // Listen for AutoSignIn and global event and redirect
  useAutoSignInListener(config.homepageUrl);

  return (
    <>
      <h3 className="mt-0 md:mt-3 mb-0">Verify your email</h3>
      {
        {
          verify: (
            <>
              <div>
                A verification email was sent to <em>{email}</em>. Please check
                your inbox for the confirmation code.
              </div>
              <VerifyForm
                code={code || undefined}
                email={email || undefined}
                username={username || undefined}
                onSuccess={() => setStep("success")}
              />
            </>
          ),
          success: (
            <>
              <Alert status="success">Verification successful</Alert>
              {waiting ? (
                <div className="flex flex-col items-center justify-center">
                  <Spinner className="mx-8" />
                  {/* <p>Finalizing verification...</p> */}
                </div>
              ) : (
                <>
                  <p>
                    Your email address was verified successfully. Please login
                    to continue.
                  </p>
                  <div>
                    <Link href="/login" className="mr-4">
                      <Button color="primary">Login</Button>
                    </Link>
                  </div>
                </>
              )}
            </>
          ),
          error: <div>Error occurred.</div>,
          invalid: (
            <>
              <Alert status="warning">Invalid email address</Alert>
              <p>
                The email address provided could not be found in our system.
                Please login or register to continue.
              </p>
              <div>
                <Link href="/login" className="mr-4">
                  <Button color="primary">Login</Button>
                </Link>
                <Link href="/register">
                  <Button color="ghost">Register</Button>
                </Link>
              </div>
            </>
          ),
        }[step || "verify"]
      }
      {/* 
      <Divider />
      <pre>
        {JSON.stringify({ code, username, clientId, region, email }, null, 2)}
      </pre> */}
    </>
  );
}
