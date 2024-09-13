
async function getPosts() {
  const fetch = require('node-fetch');
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
}

module.exports = getPosts;