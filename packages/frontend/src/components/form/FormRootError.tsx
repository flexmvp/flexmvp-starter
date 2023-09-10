"use client";
import { FormControl } from "@flexmvp/components";
import { getKnownErrorMessage } from "@flexmvp/utils";

export function FormRootError({ error }: { error?: { message?: string } }) {
  if (!error?.message) return <></>;

  return (
    <>
      <FormControl.HelperText error>
        {getKnownErrorMessage(error.message)}
      </FormControl.HelperText>
    </>
  );
}
