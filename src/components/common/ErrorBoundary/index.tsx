// src/components/common/ErrorBoundary/index.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F6]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#8B0023] mb-4">Something went wrong</h2>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="text-white bg-[#8B0023] px-4 py-2 rounded hover:bg-[#6B001B]"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;