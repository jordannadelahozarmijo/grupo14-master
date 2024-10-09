const {Pool} = require("pg");
   const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
   })
   // Creamos el Objeto
   const query = {
    text: 'SELECT * FROM usuarios WHERE detalles > $1',
    values: [2990],
    rowMode: 'array' // Definiendo modo fila
   }
   // Realizamos la consulta con el Objeto query
   pool.query(query, (err, res) => {
    if (err) {
    console.log(err.stack)
    } else {
    console.log(res.rows)
    }
   })