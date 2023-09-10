"use client";
import { useCallback, useState } from "react";
import { Drawer } from "react-daisyui";
import { AuthBoundary, Navbar, Sidebar } from "@flexmvp/components";
import menus from "./menus";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebarOpen = useCallback(
    (open: boolean | undefined = undefined) => {
      if (open === true) setSidebarOpen(true);
      else if (open === false) setSidebarOpen(false);
      else setSidebarOpen(!sidebarOpen);
    },
    [sidebarOpen, setSidebarOpen]
  );

  return (
    <AuthBoundary>
      {/** AuthBroundry protects all /(feature) routes for logged in users  **/}
      <Drawer
        open={sidebarOpen}
        onClickOverlay={toggleSidebarOpen}
        side={
          <Sidebar
            menus={menus}
            onMenuItemClick={() => {
              toggleSidebarOpen(false);
            }}
          />
        }
        // mobile={true}
        className="lg:drawer-open"
        onKeyUp={(e) => {
          if (e.key === "Escape") toggleSidebarOpen(false);
        }}
        sideClassName="z-[100]"
      >
        <div className="flex flex-col items-center">
          {/* Main Header */}
          <Navbar onToggleSidebar={toggleSidebarOpen} />
          {/* Main Content */}
          <main className="relative  w-full max-w-5xl flex-grow mt-2 mb-8">
            <div className="px-4 sm:px-4 lg:px-6 ">{children}</div>
          </main>
        </div>
      </Drawer>
    </AuthBoundary>
  );
}
