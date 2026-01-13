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
        <div className="flex flex-col items-center justify-center min-h-screen bg-secondary-red text-secondary-white p-4 text-center font-body">
          <img src="/logos/mascot.svg" alt="Sad Mascot" className="w-24 h-24 object-contain mb-4 opacity-70" />
          <h1 className="text-2xl md:text-3xl font-title mb-4">Oops! Something went wrong.</h1>
          <p className="mb-4 text-base md:text-lg">We're sorry, an unexpected error occurred.</p>
          {this.state.error && (
            <pre className="bg-secondary-red border border-red-700 p-2 rounded text-sm mb-4 max-w-full overflow-auto text-secondary-white">
              <code>{this.state.error.toString()}</code>
            </pre>
          )}
          <button
            onClick={this.handleRetry}
            className="px-6 py-3 bg-primary-maroon text-secondary-white rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-primary-teal focus:ring-opacity-50 transition-colors duration-200"
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
