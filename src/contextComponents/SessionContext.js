import React from 'react';

export const Context = React.createContext(null);
export const SessionProvider = ({children}) => {
  return (
    <React.Fragment>
      <Context.Provider value={null}>{children}</Context.Provider>
    </React.Fragment>
  );
};
