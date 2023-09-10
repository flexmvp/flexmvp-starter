"use client";
import { PageHeading } from "@flexmvp/components";
import { ThemePicker } from "./ThemePicker";

export default function SettingsThemesPage() {
  return (
    <>
      <PageHeading>
        <PageHeading.Title>Themes</PageHeading.Title>
      </PageHeading>
      <ThemePicker />
    </>
  );
}
