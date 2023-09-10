import {
  Circle,
  DualRing,
  Ellipsis,
  Grid,
  Hourglass,
  Ring,
  Ripple,
  Roller,
  Wave,
} from "react-css-spinners";
import { getThemeColor, ThemeColors } from "@flexmvp/utils";
import "react-css-spinners/dist/style.min.css";

type SpinnerProps = {
  className?: string;
  type?:
    | "circle"
    | "dual-ring"
    | "ellipsis"
    | "grid"
    | "hourglass"
    | "ring"
    | "ripple"
    | "roller"
    | "wave";
  color?: keyof ThemeColors;
};
export function Spinner({
  type = "roller",
  color = "baseContent",
  className,
}: SpinnerProps) {
  const defaultProps = {
    color: getThemeColor(color),
    className: className,
  };

  switch (type) {
    case "circle":
      return <Circle {...defaultProps} />;
    case "dual-ring":
      return <DualRing {...defaultProps} />;
    case "ellipsis":
      return <Ellipsis {...defaultProps} />;
    case "grid":
      return <Grid {...defaultProps} />;
    case "hourglass":
      return <Hourglass {...defaultProps} />;
    case "ring":
      return <Ring {...defaultProps} />;
    case "ripple":
      return <Ripple {...defaultProps} />;
    case "roller":
      return <Roller {...defaultProps} />;
    case "wave":
      return <Wave {...defaultProps} />;
  }
}
