import React, { ReactElement } from "react";
import { ReactNode } from "react";
import { isComponentType } from "@flexmvp/utils";

export function filterChildren(
  children: ReactNode,
  type: string | string[],
  operator: "eq" | "ne" | "in" = "eq"
) {
  return React.Children.toArray(children).filter((child) => {
    if (
      React.isValidElement(child) &&
      child.type !== React.Fragment &&
      isComponentType(child.type)
    ) {
      // console.log("filterChildren", {
      //   "child.props": child.props,
      //   "child.type": child.type,
      //   "child.type.displayName": child.type.displayName,
      //   type: type,
      //   "child.type.displayName === type": child.type.displayName === type,
      // });

      if (operator === "eq") return child.type.displayName === type;
      if (operator === "ne") return child.type.displayName !== type;
      if (
        operator === "in" &&
        Array.isArray(type) &&
        typeof child.type.displayName === "string"
      )
        return type.includes(child.type.displayName);

      throw new Error("Invalid operator in filterChildren");
    }
    return false;
  });
}
