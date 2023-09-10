"use client";

import { redirect } from "next/navigation";
import { AuthHeading, Link } from "@flexmvp/components";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <>
      <AuthHeading>Sign in</AuthHeading>
      <div>
        New user? <Link href="/register">Create an account</Link>
      </div>
      <LoginForm
        onSuccess={() => {
          redirect("/dashboard");
        }}
        // autoSignIn used to allow autosignin when user resends
        // email verification
        autoSignIn
      />
      <div className="mt-4 text-sm">
        <Link href="#">forgot password?</Link>
      </div>
      {/* <Divider>or</Divider>
      <div>[social links]</div> */}
    </>
  );
}
