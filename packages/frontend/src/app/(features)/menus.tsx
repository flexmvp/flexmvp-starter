import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  DocumentTextIcon,
  FolderIcon,
  HomeIcon,
  SwatchIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { JSXElementConstructor } from "react";

export type MenuConfig = {
  title?: string;
  items: {
    name: string;
    href: string;
    icon?: React.ComponentType;
  }[];
};

const menus: MenuConfig[] = [
  {
    title: undefined,
    items: [
      { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
      { name: "Articles", href: "/articles", icon: DocumentTextIcon },
      // { name: "Team", href: "/team", icon: UsersIcon },
      // { name: "Projects", href: "/projects", icon: FolderIcon },
      // {
      //   name: "Calendar",
      //   href: "/calendar",
      //   icon: CalendarIcon,
      // },
      // {
      //   name: "Documents",
      //   href: "/documents",
      //   icon: DocumentDuplicateIcon,
      // },
      // { name: "Reports", href: "/reports", icon: ChartPieIcon },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        name: "Themes",
        href: "/settings/themes",
        icon: SwatchIcon,
      },
    ],
  },
];

export default menus;
