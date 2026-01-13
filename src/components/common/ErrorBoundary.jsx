import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-100 p-4">
          <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
          <p className="mb-4 text-center">We're sorry, an unexpected error occurred.</p>
          {this.state.error && (
            <pre className="bg-red-100 dark:bg-red-800 p-2 rounded text-sm mb-4 max-w-full overflow-auto">
              <code>{this.state.error.toString()}</code>
            </pre>
          )}
          <button
            onClick={this.handleRetry}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
