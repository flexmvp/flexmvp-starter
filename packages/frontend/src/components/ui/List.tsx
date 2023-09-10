import { ChevronRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Button, Table } from "react-daisyui";
import { StringLiteralLike } from "typescript";
import { Link, Spinner } from "@flexmvp/components";
import { useBreakpoints } from "@flexmvp/hooks";
import { isComponentType } from "@flexmvp/utils";

/**
 * `List` component provides a generic, responsive list rendering mechanism.
 * It has child components `List.Row`, `List.Cell`, and `List.Responsive`.
 *
 * @example
 * <List>
 *   <List.Row>
 *     <List.Cell>{dataItem.title}</List.Cell>
 *     <List.Cell>{dataItem.description}</List.Cell>
 *     <List.Responsive secondaryText={dataItem.comments.length + ' comments'}>
 *       {dataItem.title}
 *     </List.Responsive>
 *   </List.Row>
 * </List>
 *
 * @param {Object} props - The properties object.
 * @param {('md' | 'sm' | 'lg' | '2xl')} [props.responsive='md'] - The breakpoint at which the list switches to its responsive mode.
 * @param {string} [props.href] - If provided, wraps the entire row in a Link component.
 * @param {React.ReactNode} props.children - The children nodes, ideally `List.Row` components containing `List.Cell` and optionally `List.Responsive`.
 *
 * @returns {React.ReactElement} The rendered List component.
 */
function List({
  fetching,
  header = [],
  children,
  emptyMessage = "No items found.",
  breakpoint = "md",
}: ListProps) {
  const breakpoints = useBreakpoints();
  const breakpointName = breakpoint === "2xl" ? "_2xl" : breakpoint;
  const isBreakpoint = breakpoints[breakpointName];

  return (
    <>
      {!children && fetching ? (
        <Spinner type="wave" />
      ) : children ? (
        <div className="overflow-x-auto">
          <Table className="table-sm md:table-md w-full">
            {isBreakpoint && (
              <Table.Head className="hidden md:table-header-group">
                {header.map((heading, idx) => (
                  <span key={idx}>{heading}</span>
                ))}
              </Table.Head>
            )}
            <Table.Body>{children}</Table.Body>
          </Table>
        </div>
      ) : (
        <div>{emptyMessage}</div>
      )}
    </>
  );
}

function ListRow({
  children,
  href,
  breakpoint = "md",
  hover = true,
}: RowProps) {
  const breakpoints = useBreakpoints();
  const breakpointName = breakpoint === "2xl" ? "_2xl" : breakpoint;
  const isBreakpoint = breakpoints[breakpointName];
  const Cells = React.Children.toArray(children).filter((child) =>
    isReactElementOfType(child, "ListCell")
  );

  const Responsive = React.Children.toArray(children).find((child) =>
    isReactElementOfType(child, "ListResponsive")
  );

  const contentItems = Responsive && !isBreakpoint ? [Responsive] : Cells;

  if (href) {
    return (
      <Table.Row
        // eslint-disable-next-line react/no-children-prop
        children={contentItems as React.ReactElement[]}
        hover={true}
        className="group"
      ></Table.Row>
    );
  }

  return <Table.Row>{contentItems as React.ReactElement[]}</Table.Row>;
}
ListRow.displayName = "ListRow";
List.Row = ListRow;

function ListCell({ children }: CellProps) {
  return <div className="break-all overflow-x-hidden">{children}</div>;
}
ListCell.displayName = "ListCell";
List.Cell = ListCell;

function ListResponsive({ children, secondaryText, href }: ResponsiveProps) {
  const Wrapper = href ? Link : "div";
  return (
    <Wrapper
      className="flex items-center justify-between font-semibold"
      href={href}
    >
      <div className="flex-col flex-grow">
        <div className="flex-grow whitespace-break-all overflow-hidden h-5 relative">
          {children}
          <CellGradient />
        </div>
        {secondaryText && (
          <div className="flex-shrink-0 text-sm opacity-60 font-normal">
            {secondaryText}
          </div>
        )}
      </div>
      <div className="flex items-center flex-shrink-0 ml-4">
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </div>
    </Wrapper>
  );
}
ListResponsive.displayName = "ListResponsive";
List.Responsive = ListResponsive;

function ListActions({ children }: ActionsProps) {
  return <div className="flex space-x-3 justify-end">{children}</div>;
}
ListActions.displayName = "ListActions";
List.Actions = ListActions;

const ActionItem: React.FC<ActionItemProps> = ({
  href,
  onClick,
  Icon,
  title,
}) => {
  const IconWithStyles = React.cloneElement(<Icon />, {
    className: "h-5 w-5",
  });

  const ButtonElement = (
    <Button
      onClick={onClick}
      className="mx-0 px-1 ml-4 last:ml-0"
      color="ghost"
      size="sm"
      title={!href ? title : undefined}
    >
      {IconWithStyles}
    </Button>
  );

  if (href) {
    return (
      <Link href={href} title={title}>
        {ButtonElement}
      </Link>
    );
  }

  return ButtonElement;
};

ActionItem.displayName = "ActionItem";
List.ActionItem = ActionItem;

type CellGradientProps = {
  width?: number | StringLiteralLike;
};
function CellGradient({ width = 16 }: CellGradientProps) {
  return (
    <div
      className={`absolute inset-y-0 right-0 w-${width} bg-gradient-to-l from-base-100 to-transparent group-hover:hidden`}
    ></div>
  );
}
CellGradient.displayName = "CellGradient";
List.CellGradient = CellGradient;

type SingleLineProps = {
  children: React.ReactNode;
  className?: string;
};
const SingleLine = ({ children, className }: SingleLineProps) => (
  <div
    className={`whitespace-break-all overflow-hidden h-5 relative ${className}`}
  >
    {children}
    <CellGradient />
  </div>
);
SingleLine.displayName = "SingleLine";
List.SingleLine = SingleLine;

/**
 * Types
 */

interface ListProps {
  fetching?: boolean;
  header?: string[];
  children?: React.ReactNode;
  emptyMessage?: string;
  breakpoint?: "sm" | "md" | "lg" | "2xl";
}

interface RowProps {
  children: React.ReactNode;
  href?: string;
  breakpoint?: "sm" | "md" | "lg" | "2xl";
  hover?: boolean;
}

interface CellProps {
  children: React.ReactNode;
}

interface ResponsiveProps {
  children: React.ReactNode;
  secondaryText?: string;
  href?: string;
}

interface ActionsProps {
  children: React.ReactNode;
}

interface ActionItemProps {
  href?: string;
  onClick?: () => void;
  Icon: React.ElementType;
  title?: string;
}

export { List };

/**
 * Check if a child is a valid ReactElement of a specific displayName.
 *
 * @param child - The child element to check.
 * @param displayName - The displayName to match.
 * @returns Whether the child matches the criteria.
 */
function isReactElementOfType(
  child: React.ReactNode,
  displayName: string
): child is React.ReactElement {
  return (
    React.isValidElement(child) &&
    child.type !== React.Fragment &&
    isComponentType(child.type) &&
    child.type.displayName === displayName
  );
}
