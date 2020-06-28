import { useEffect, useState, useContext } from 'react';
import AuthenticationError from '../AuthenticationError';
import { Context as SessionContext } from '../contextComponents/SessionContext';

function fetchData(url) {
  return fetch(url, {
    method: 'GET',
  })
    .then((res) => {
      if (res.ok) {
        return res;
      } else if (res.status === 401) {
        throw new AuthenticationError();
      }
      throw Error('Error');
    })
    .then((res) => {
      return res.json();
    });
}

/**
 * @template T expected type
 * @param {string} url
 * @return [T] data
 */
export const useGet = (url, refresh) => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('LOADING');

  const context = useContext(SessionContext);
  const unAuthorize = context.unAuthorize;

  useEffect(() => {
    const finish = (data) => {
      setData(data);
      setStatus('DONE');
    };
    const cancel = (error) => {
      setStatus('ERROR');
      unAuthorize();
      if (error instanceof AuthenticationError) return error;
    };
    fetchData(url).then(finish, cancel);
    return () => {};
  }, [url, refresh]);

  return { data, status };
};

/**
 *
 * @param {string} url
 * @param {import('./useSesion').LogIn} obj
 * @returns {Promise<import('./useSesion').Sesion>}
 */
export const logIn = async (url, obj) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      console.log();
      if (res.ok) {
        return res;
      }
      throw Error('Error');
    })
    .then((res) => res.json());
};
