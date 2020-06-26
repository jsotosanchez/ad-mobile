export const fetchPost = async (url, obj) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then(res => {
      if (res.ok) {
        return res;
      }
      throw Error('Error');
    })
    .then(res => res.json());
};
