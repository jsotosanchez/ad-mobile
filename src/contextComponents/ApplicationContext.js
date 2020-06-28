import React from 'react';
import { SessionProvider } from './SessionContext';
import AuthenticationErrorBoundary from '../AuthenticationErrorBoundary';

export default function ApplicationContext({ children }) {
  return (
    <SessionProvider>
      <AuthenticationErrorBoundary>{children}</AuthenticationErrorBoundary>
    </SessionProvider>
  );
}
