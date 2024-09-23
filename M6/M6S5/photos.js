

async function getPhotos() {
  const fetch = require('node-fetch');
  const response = await fetch('https://jsonplaceholder.typicode.com/photos');
  const data = await response.json();
  return data;
}

module.exports = getPhotos;