export const fetchPatch = async (url, { credientals: { usuario, password } }, obj) => {
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
