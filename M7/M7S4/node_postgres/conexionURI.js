//La cadena de conexión de la base de datos se proporciona a su aplicación a través de una variable de entorno. 

// Modulo npm node-postgres
const {
    Pool,
    Client
   } = require("pg");
   // URI de conexión en string
   const connectionString =
   'postgresql://node_user:node_password@localhost:5432/db_node'
   // conectando con una conexión al pool.
   const pool = new Pool({
    connectionString,
   })
   pool.query('SELECT NOW()', (err, res) => { console.log(err, res)
    pool.end()
   })
   const client = new Client({connectionString,})
   client.connect()
   client.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    client.end()
   })