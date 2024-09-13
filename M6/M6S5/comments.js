

async function getComments() {
  const fetch = require('node-fetch');
  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  const data = await response.json();
  return data;
}

module.exports = getComments;