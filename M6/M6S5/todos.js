

async function getTodos() {
    const fetch = require('node-fetch');
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();
  return data;
}

module.exports = getTodos;