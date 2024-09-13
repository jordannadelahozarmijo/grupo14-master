
async function getAlbums() {
    const fetch = require('node-fetch');
  const response = await fetch('https://jsonplaceholder.typicode.com/albums');
  const data = await response.json();
  return data;
}

module.exports = getAlbums;