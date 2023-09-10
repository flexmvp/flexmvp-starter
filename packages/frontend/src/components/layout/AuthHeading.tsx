type AuthHeadingProps = { children: React.ReactNode };
export function AuthHeading({ children }: AuthHeadingProps) {
  return (
    <h3 className="text-xl font-semibold mt-0 md:mt-3 mb-0">{children}</h3>
  );
}
