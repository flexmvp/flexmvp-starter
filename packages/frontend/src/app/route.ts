// import PageHeading from "@flexmvp/components/page-heading";
import { redirect } from "next/navigation";

// export default function SettingsRoute() {
export async function GET(request: Request) {
  // redirect to default subroute
  redirect("/dashboard");
}
