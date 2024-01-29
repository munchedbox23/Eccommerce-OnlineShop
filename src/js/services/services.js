async function getResourses(url) {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Oops! It seems your link ${url} is broken`);
  }
  return await response.json();
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });

  return await response.json();
}
export {getResourses, postData};
