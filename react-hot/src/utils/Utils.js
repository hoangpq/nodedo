export function query(queryStr) {
  return fetch('/api/graphql', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: queryStr,
    }),
  })
    .then(res => res.json());
}