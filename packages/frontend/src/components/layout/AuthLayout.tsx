"use client";
import { Button } from "react-daisyui";
import { Link, Logo } from "@flexmvp/components";

export type AuthLayoutProps = {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export function AuthLayout({ sidebar, children }: AuthLayoutProps) {
  return (
    <div className="flex flex-row min-h-screen">
      {/* Left Sidebar */}
      <div className="hidden md:flex flex-col flex-shrink-0 w-full max-w-sm lg:max-w-md bg-base-100">
        {/* Header */}
        <nav className="flex-shrink-0 m-4">
          <Link href="/dashboard">
            <Button color="ghost">
              <Logo />
            </Button>
          </Link>
        </nav>
        {/* Left Sidebar Content */}
        <main className="flex-grow m-8">Welcome to FlexMVP</main>
        {/* Footer */}
        <footer className="flex-shrink-0 m-4">
          &copy; {new Date().getFullYear().toString()} - FlexMVP
        </footer>
      </div>
      {/* Auth Form Wrapper (Right Container) */}
      <div className="flex flex-col items-center flex-grow min-h-screen h-screen w-full bg-base-200 sticky top-0">
        {/* Header */}
        <nav className="w-full flex flex-row md:hidden flex-shrink-0 px-4 py-4">
          <Link href="/">
            <Button color="ghost">
              <Logo />
            </Button>
          </Link>
        </nav>
        {/* Auth Form */}
        <main className="flex flex-col items-center justify-center w-full flex-grow p-4">
          <div className="flex flex-col space-y-4 w-full max-w-xl m-4 p-4 sm:px-4 md:pb-6 md:px-6 bg-base-100 shadow-lg rounded-btn">
            {children}
          </div>
        </main>
        {/* Footer */}
        <footer className="flex md:hidden flex-shrink-0 py-4">
          &copy; {new Date().getFullYear().toString()}
        </footer>
      </div>
    </div>
  );
}
