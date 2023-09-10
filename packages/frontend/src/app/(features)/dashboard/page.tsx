"use client";
import { Button } from "react-daisyui";
import { Link, PageHeading } from "@flexmvp/components";

export default function DashboardPage() {
  return (
    <>
      <PageHeading>
        <PageHeading.Title>Dashboard</PageHeading.Title>
        {/* <PageHeading.Actions>
          <Button
            startIcon={<PlusIcon className="w-4 h-4 mr-2" />}
            className="btn btn-xs md:btn-sm lg:btn-md"
          >
            Add Theme
          </Button>
        </PageHeading.Actions> */}
      </PageHeading>
      <div className="w-full max-w-lg ">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to FlexMVP 💪
        </h1>

        <p className="text-gray-600 mb-4">
          The FREE batteries included full stack starter kit for software
          startups optimized for speed, scale, and cost.
        </p>
        <p className="text-gray-600 mb-4">
          Our goal with this platform is to get you developing features and into
          production as quick and easy as possible, all built on a solid
          foundation of AWS and TypeScript.
        </p>
        <p className="text-gray-600 mb-4">
          Get started by exploring our pre-built CRUD examples, or dive into the
          documentation to learn more about how to customize FlexMVP.
        </p>
        <p className="text-gray-600">
          Thanks for choosing us. We&apos;re excited to see what you&apos;ll
          build!
        </p>

        <div className="mt-6">
          <Link href="/articles">
            <Button color="primary">Explore Articles</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
