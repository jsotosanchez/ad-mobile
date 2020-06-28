import React, { useState, useMemo } from 'react';

export const Context = React.createContext(null);
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({ conectado: false });

  const sessionContext = useMemo(() => {
    const authenticate = ({ usuario, roles }) => setSession({ ...session, conectado: true, usuario, roles });
    const unAuthorize = () => setSession({ ...session, conectado: false, usuario: null, roles: null });
    const isAuthorized = () => session.conectado;
    return { authenticate, unAuthorize, isAuthorized };
  }, [session]);

  return (
    <React.Fragment>
      <Context.Provider value={sessionContext}>{children}</Context.Provider>
    </React.Fragment>
  );
};
