const fs = require('fs');
const express = require('express');
const getComments = require('./comments');
const getPhotos = require('./photos');
const getAlbums = require('./albums');
const getTodos = require('./todos');
const getPosts = require('./posts');

const app = express();

async function saveDataToFile(endpoint, filename) {
  let data;
  
  switch(endpoint) {
    case 'comments':
      data = await getComments();
      break;
    case 'photos':
      data = await getPhotos();
      break;
    case 'albums':
      data = await getAlbums();
      break;
    case 'todos':
      data = await getTodos();
      break;
    case 'posts':
      data = await getPosts();
      break;
    default:
      return 'Invalid option';
  }

  fs.writeFileSync(`${filename}.txt`, JSON.stringify(data, null, 2));
  console.log(`${filename}.txt has been saved.`);
}

app.get('/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  
  // Call the function and save data
  await saveDataToFile(endpoint, endpoint);

  res.send(`Data from ${endpoint} saved to ${endpoint}.txt`);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});