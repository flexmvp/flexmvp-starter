"use client";
import { Roller } from "react-css-spinners";
import "react-css-spinners/dist/style.min.css";

export function Authenticating() {
  return (
    <>
      <div className="flex flex-col items-center align-center justify-center bg-base-100 min-h-screen">
        <div className="p-8">
          <Roller
            color="hsl(var(--p))" // // https://daisyui.com/docs/colors/ (CSS Variable)
          />
        </div>
        {/* Authenticating... */}
      </div>
    </>
  );
}
