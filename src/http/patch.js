export const fetchPatch = async (url, obj) => {
  const response = await fetch(url, {
    method: 'patch',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return response.json();
};
