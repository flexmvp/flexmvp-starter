import React, { ReactNode } from "react";
import { Divider } from "react-daisyui";
import { filterChildren } from "@flexmvp/utils";

/**
 * Heading
 */
type PageHeadingProps = {
  children: ReactNode;
  divider?: boolean;
};
function PageHeadingBase({ divider = true, children }: PageHeadingProps) {
  // console.log("PageHeadingBase", React.Children.toArray(children));
  return (
    <>
      <div className="flex items-center mb-4">
        <div className="flex-1">
          {filterChildren(children, "PageHeadingTitle")}
          {filterChildren(children, "PageHeadingSubtitle")}
        </div>
        <div className="flex-shrink-0">
          {filterChildren(children, "PageHeadingActions")}
        </div>
      </div>
      {divider && <Divider />}
    </>
  );
}

/**
 * Heading Title
 */
type PageHeadingTitleProps = {
  children: ReactNode;
  // __TYPE?: "PageHeadingTitle";
};

function PageHeadingTitle({ children }: PageHeadingTitleProps) {
  return <h2 className="text-xl font-semibold mt-0 mb-0">{children}</h2>;
}

PageHeadingTitle.displayName = "PageHeadingTitle";

/**
 * Heading Subtitle
 */
type PageHeadingSubtitleProps = {
  children: ReactNode;
  // __TYPE?: "PageHeadingTitle";
};

function PageHeadingSubtitle({ children }: PageHeadingSubtitleProps) {
  return <div className="hidden md:block mt-0 mb-0">{children}</div>;
}

PageHeadingSubtitle.displayName = "PageHeadingSubtitle";

/**
 * Heading Actions
 */
type PageHeadingActionsProps = {
  children: ReactNode;
  __TYPE?: "PageHeadingActions";
};

function PageHeadingActions({ children }: PageHeadingActionsProps) {
  return <>{children}</>;
}

PageHeadingActions.displayName = "PageHeadingActions";

/**
 * Export the component with .subcomponents
 */

export const PageHeading = Object.assign(PageHeadingBase, {
  Title: PageHeadingTitle,
  Subtitle: PageHeadingSubtitle,
  Actions: PageHeadingActions,
});
