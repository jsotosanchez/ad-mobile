import React from 'react';
import {SessionProvider} from './SessionContext';

export default function ApplicationContext({children}) {
  return <SessionProvider>{children}</SessionProvider>;
}
