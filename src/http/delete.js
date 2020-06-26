export const fetchDelete = async url => {
  const response = await fetch(url, {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};
