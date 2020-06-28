import React, { useState, useMemo } from 'react';

export const Context = React.createContext(null);
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({ conectado: false });

  const sessionContext = useMemo(() => {
    const authenticate = ({ usuario, id, roles }) => setSession({ ...session, conectado: true, usuario, id, roles });
    const unAuthorize = () => setSession({ ...session, conectado: false, usuario: null, roles: null });
    const isAuthorized = () => session.conectado;
    const getUserId = () => session.id;
    const isMedico = () => (session.roles || []).includes('MEDICO');

    return { authenticate, unAuthorize, isAuthorized, getUserId, isMedico };
  }, [session]);

  return (
    <React.Fragment>
      <Context.Provider value={sessionContext}>{children}</Context.Provider>
    </React.Fragment>
  );
};
