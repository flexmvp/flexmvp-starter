export function isComponentType(value: any): value is React.ComponentType<any> {
  return typeof value === "function" && "displayName" in value;
}
