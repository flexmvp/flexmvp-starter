import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { Button, Navbar as DaisyNavbar } from "react-daisyui";
import { ProfileDropdown } from "@flexmvp/components";

export function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <DaisyNavbar className="relative md:sticky top-auto md:top-0 z-50 md:backdrop-blur-sm">
      <DaisyNavbar.Start>
        <Button
          type="button"
          className="lg:hidden"
          onClick={() => onToggleSidebar()}
          color="ghost"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </Button>
        {/* Separator */}
        {/* <div className="h-6 w-px bg-base-300 lg:hidden" aria-hidden="true" /> */}
      </DaisyNavbar.Start>
      <DaisyNavbar.Center></DaisyNavbar.Center>
      <DaisyNavbar.End className="space-x-2">
        <Button type="button" color="ghost" shape="square">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-5 w-5" aria-hidden="true" />
        </Button>

        {/* Profile dropdown */}
        <ProfileDropdown />
      </DaisyNavbar.End>
    </DaisyNavbar>
  );
}
