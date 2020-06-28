import { useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import { fetchPost } from '../http/post';
import { Context as SessionContext } from '../contextComponents/SessionContext';
import { loginUrl } from '../config/urls';

export const useLogIn = () => {
  const context = useContext(SessionContext);
  const authenticate = context.authenticate;
  const unAuthorize = context.unAuthorize;

  const logIn = useCallback((documento, password) => {
    fetchPost(loginUrl, { username: documento, password })
      .then(({ usuario, roles }) => {
        authenticate({ usuario, roles });
      })
      .catch(() => {
        Alert.alert('Revise sus datos');
        unAuthorize();
      });
  }, []);
  return logIn;
};
