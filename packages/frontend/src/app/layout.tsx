import clsx from "clsx";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "@flexmvp/app/ErrorBoundry";
import { UrqlWrapper } from "@flexmvp/app/UrqlWrapper";
import AmplifyWrapper from "./AmplifyWrapper";
import ThemeWrapper from "./ThemeWrapper";

// Global CSS
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FlexMVP Starter",
  description: "Launch Faster, Reduce Cost, and Scale!",
};

type RootLayoutProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: RootLayoutProps) {
  // global logout

  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "h-screen")}>
        <ErrorBoundary>
          <UrqlWrapper>
            <ThemeWrapper>
              <AmplifyWrapper>
                <>
                  {children}
                  <ToastContainer theme={"light"} />
                </>
              </AmplifyWrapper>
            </ThemeWrapper>
          </UrqlWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
