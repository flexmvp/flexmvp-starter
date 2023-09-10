"use client";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Auth } from "aws-amplify";
import Image from "next/image";
import React, { useEffect } from "react";
import { Dropdown } from "react-daisyui";
import { Link } from "@flexmvp/components";
import { useRedirectClient } from "@flexmvp/hooks";
import { useAuthState } from "@flexmvp/stores";

type UserAttributes = ReturnType<typeof Auth.userAttributes>;

export function ProfileDropdown({ ...props }) {
  const { logout, cognitoUser } = useAuthState();
  const [userAttributes, setUserAttributes] = React.useState<
    Awaited<UserAttributes> & { email: string }
  >();
  const redirect = useRedirectClient();
  const avatarUrl = `https://ui-avatars.com/api/?name=${userAttributes?.email}`;
  const displayName = userAttributes?.email.split("@")[0];

  // Get user attributes from authenticated cognitoUser
  useEffect(() => {
    if (!cognitoUser) return;
    Promise.resolve(cognitoUser).then(async () => {
      const data = await cognitoUser;
      setUserAttributes(data?.attributes);
    });
  }, [cognitoUser]);

  const userNavigation: {
    name: string;
    href?: string;
    onClick?: () => void;
  }[] = [
    // { name: "Your profile", href: "#" },
    {
      name: "Sign out",
      onClick: async () => {
        await logout();
        redirect("/login");
      },
    },
  ];
  return (
    <Dropdown className="relative" end {...props}>
      <Dropdown.Toggle color="ghost" button={true}>
        <div className="flex items-center">
          <span className="sr-only">Open user menu</span>
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            className="h-8 w-8 rounded-full bg-gray-50"
            src={avatarUrl}
            alt={`Avatar for ${displayName}`}
          />
          <span className="hidden lg:flex lg:items-center">
            <span
              className="hidden lg:flex ml-4 text-sm leading-6 "
              aria-hidden="true"
            >
              {displayName}
            </span>
            <ChevronDownIcon
              // className="ml-2 h-5 w-5 text-gray-400"
              className="ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="w-52 bg-base-100">
        {userNavigation.map((item, i) => (
          <li key={`${i}-${item.href}`}>
            <Link href={item.href} onClick={item.onClick}>
              {item.name}
            </Link>
          </li>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
