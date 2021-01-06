import React, { Component, ErrorInfo, ReactNode } from "react";

interface props {
  children: ReactNode;
}

interface state {
  hasError: boolean,
  error: {
    name: string | null,
    message: string | null
  }
}

class ErrorBoundaries extends Component<props, state> {
  public state: state = {
    hasError: false,
    error: {
        name: null,
        message: null
    }
  };

  public static getDerivedStateFromError = ({name, message}: Error): state => {
    return { 
        hasError: true,  
        error: {
           name,
           message
        }
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return(
          <div>
              <h1>Uncaught error:</h1>
              <h3>{this.state.error.name}</h3>
              <p>{this.state.error.message}</p>
          </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaries;