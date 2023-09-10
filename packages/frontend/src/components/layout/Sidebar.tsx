import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";
import { Button, Menu } from "react-daisyui";
import { MenuConfig } from "@flexmvp/app/(features)/menus";
import { Link, Logo } from "@flexmvp/components";

const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

type SidebarProps = {
  menus?: MenuConfig[];
  onMenuItemClick?: (x: any) => void;
};
export function Sidebar({ menus, onMenuItemClick }: SidebarProps) {
  return (
    <div className="bg-base-200 w-64 xl:w-80 shadow h-full z-50">
      <div className="flex flex-col grow overflow-y-auto px-4 py-4">
        <div className="flex mb-2 items-center">
          {/* <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="FlexMVP"
          /> */}
          <Link href="/dashboard" onClick={onMenuItemClick}>
            <Button color="ghost" className="flex flex-row">
              <Logo />
            </Button>
          </Link>
        </div>
        <nav className="flex flex-col flex-1 space-y-4">
          <div className="grow space-y-4">
            {menus?.map((menu, i) => (
              <SidebarMenu
                menu={menu}
                key={`sidebar-menu-${i}`}
                onMenuItemClick={onMenuItemClick}
              />
            ))}
          </div>
          {/* <div className="flex-shrink-0">
            <SidebarMenu
              menu={{
                items: [
                  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
                ],
              }}
              onMenuItemClick={onMenuItemClick}
            />
          </div> */}
        </nav>
      </div>
    </div>
  );
}

type SidebarMenuProps = {
  menu: MenuConfig;
  onMenuItemClick?: (x: any) => void;
};
function SidebarMenu({ menu, onMenuItemClick }: SidebarMenuProps) {
  return (
    <Menu
      role="list"
      className="space-y-1"
      // compact
    >
      {menu.title && (
        <Menu.Title className="ml-4 mb-2">{menu.title}</Menu.Title>
      )}
      {menu.items.map((item) => (
        <Menu.Item key={item.href}>
          <SidebarButton
            name={item.name}
            href={item.href}
            icon={item.icon && <item.icon />}
            onMenuItemClick={onMenuItemClick}
          />
        </Menu.Item>
      ))}
    </Menu>
  );
}

type SidebarButtonProps = {
  name: string;
  href: string;
  icon?: ReactElement;
  onMenuItemClick?: (x: any) => void;
};
function SidebarButton({
  name,
  href,
  icon,
  onMenuItemClick,
}: SidebarButtonProps) {
  const path = usePathname();
  const isCurrent = (x: string) => x === path;

  const IconElement = icon
    ? React.cloneElement(icon, {
        className: clsx("h-5 w-5 shrink-0"),
      })
    : undefined;

  return (
    <Link
      href={href}
      className={clsx("rounded-btn", {
        active: isCurrent(href),
        // lighten the background color for sidebar to reduce focus
        "bg-opacity-60": isCurrent(href),
      })}
      onClick={onMenuItemClick}
    >
      {IconElement}
      {name}
    </Link>
  );
}
