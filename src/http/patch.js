import { Base64 } from 'js-base64';

const btoa = Base64.btoa;

export const fetchPatch = async (url, { credentials: { usuario, password } }, obj) => {
  const response = await fetch(url, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(usuario + ':' + password),
    },
    body: JSON.stringify(obj),
  });
  return response.json();
};
