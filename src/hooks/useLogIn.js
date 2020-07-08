import { useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { fetchPost } from '../http/post';
import { Context as SessionContext } from '../contextComponents/SessionContext';
import { loginUrl } from '../config/urls';

export const useLogIn = () => {
  const context = useContext(SessionContext);
  const authenticate = context.authenticate;
  const unAuthorize = context.unAuthorize;

  const logIn = useCallback((username, password) => {
    fetchPost(loginUrl, { credentials: { usuario: username.toLowerCase(), password } })
      .then(({ usuario, id, roles, pagoAlDia }) => {
        authenticate({ usuario, id, roles, pagoAlDia, password });
      })
      .catch(() => {
        Alert.alert('Please verify your username and password');
        unAuthorize();
      });
  }, []);
  return logIn;
};
