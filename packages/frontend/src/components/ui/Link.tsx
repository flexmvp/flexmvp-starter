"use client";

import NextLink from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { onStart } from "@flexmvp/hooks";

/**
 * Render a link that uses Next.js router for client-side navigation
 *
 * Passing in href="/login" will render a link that navigates to /login
 * Passing in href="https://google.com" will render a link that navigates to https://google.com
 *
 * The `inline` prop is used to render a link that looks like text, if you pass in a single string
 * as a child it will automatically be rendered as inline
 *
 * @param param0
 * @returns
 */
export function Link({
  href,
  onClick,
  className: _className,
  children,
  inline,
  ...rest
}: React.ComponentProps<"a"> & {
  inline?: boolean;
}) {
  const useLink = href && href.startsWith("/");

  let hasStringChild = false;

  React.Children.forEach(children, (child) => {
    if (typeof child === "string") {
      hasStringChild = true;
    }
  });
  const shouldRenderInline =
    inline !== undefined
      ? inline
      : hasStringChild && React.Children.count(children) == 1;

  const className = twMerge(
    shouldRenderInline ? "font-semibold hover:text-primary underline" : "", // add color, weight, and underline for inline text links
    _className
  );
  if (useLink)
    return (
      <NextLink
        href={href}
        onClick={(event) => {
          const { pathname, search, hash } = window.location;
          if (href !== pathname + search + hash) onStart();
          if (onClick) onClick(event);
        }}
        className={className}
        {...rest}
        ref={undefined} // change this if you need, with React.forwardRef
      >
        {children}
      </NextLink>
    );
  return (
    <a href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
