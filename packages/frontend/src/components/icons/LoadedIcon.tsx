"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function LoadedIcon({ className }: { className?: string }) {
  const [waited, setWaited] = useState(false);
  const delay = 3000;
  useEffect(() => {
    setTimeout(() => {
      setWaited(true);
    }, delay);
  });
  const classes = clsx(
    "mr-2 ml-2 h-5 w-5",
    "transition-opacity duration-700 ease-out",
    waited ? "opacity-0" : "opacity-100",
    className
  );
  return <CheckIcon className={classes} />;
}
