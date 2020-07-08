import React, { Component } from 'react';
import AuthenticationError from './AuthenticationError';
import { Context as SessionContext } from './contextComponents/SessionContext';

export default class AuthenticationErrorBoundary extends Component {
  static contextType = SessionContext;

  constructor(props, context) {
    super(props, context);
  }

  static getDerivedStateFromError(_error) {
    // copied from react docs, not 100% why it's needed
    return { hasError: true };
  }

  componentDidCatch(error) {
    if (!error instanceof AuthenticationError) {
      return;
    }
    setTimeout(() => {
      this.context.unAuthorize();
    });
  }

  render() {
    return <>{this.props.children}</>;
  }
}
