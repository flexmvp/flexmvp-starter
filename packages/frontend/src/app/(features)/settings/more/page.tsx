"use client";
import { PageHeading } from "@flexmvp/components";
import { ThemePicker } from "../themes/ThemePicker";

export default function SettingsMorePage() {
  return (
    <>
      <PageHeading>
        <PageHeading.Title>More Settings</PageHeading.Title>
      </PageHeading>
      <ThemePicker />
    </>
  );
}
