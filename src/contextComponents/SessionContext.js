import React, { useState, useMemo } from 'react';

export const Context = React.createContext(null);
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState({ conectado: false });

  const sessionContext = useMemo(() => {
    const authenticate = ({ usuario, id, roles, pagoAlDia, password }) =>
      setSession({ ...session, conectado: true, usuario, id, roles, pagoAlDia, password });
    const unAuthorize = () =>
      setSession({ ...session, conectado: false, usuario: null, roles: null, pagoAlDia: false, password: null });
    const isAuthorized = () => session.conectado;
    const getUserId = () => session.id;
    const isMedico = () => (session.roles || []).includes('MEDICO');
    const getPagoAlDia = () => session.pagoAlDia;
    const getCredentials = () => ({ usuario: session.usuario, password: session.password });

    return { authenticate, unAuthorize, isAuthorized, getUserId, isMedico, getPagoAlDia, getCredentials };
  }, [session]);

  return (
    <React.Fragment>
      <Context.Provider value={sessionContext}>{children}</Context.Provider>
    </React.Fragment>
  );
};
