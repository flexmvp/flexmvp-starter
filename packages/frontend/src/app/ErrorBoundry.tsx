import React, { ReactNode } from "react";

// 1. Define the state type
interface ErrorBoundaryState {
  hasError: boolean;
}

// 2. Define the props type (assuming the ErrorBoundary doesn't take any additional props)
interface ErrorBoundaryProps {
  children: ReactNode;
}

// 3. Update the class declaration to use the types
class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.log({ error, errorInfo });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
