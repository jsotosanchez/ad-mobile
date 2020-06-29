import AuthenticationError from '../AuthenticationError';
import { Base64 } from 'js-base64';

const btoa = Base64.btoa;

export const fetchPost = async (url, { credientals: { usuario, password } }, obj) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(usuario + ':' + password),
    },
    body: JSON.stringify(obj),
  })
    .then((res) => {
      if (res.ok) {
        return res;
      } else if (err.status === 401) {
        throw new AuthenticationError();
      }
      throw Error('Error');
    })
    .then((res) => res.json());
};
