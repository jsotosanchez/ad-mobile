import { Base64 } from 'js-base64';

const btoa = Base64.btoa;

export const fetchDelete = async (url, { credientals: { usuario, password } }) => {
  const response = await fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(usuario + ':' + password),
    },
  });
  return response.json();
};
