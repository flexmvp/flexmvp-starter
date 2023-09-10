"use client";

import { redirect } from "next/navigation";
import { AuthHeading, Link } from "@flexmvp/components";
import { RegisterForm } from "./RegisterForm";

export default function LoginPage() {
  return (
    <>
      <AuthHeading>Create an account</AuthHeading>
      <p>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
      <RegisterForm autoSignIn />

      {/* <Divider>or</Divider>
      <div>[social links]</div> */}
    </>
  );
}
