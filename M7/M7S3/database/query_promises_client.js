const {Client} = require("pg");
   const cliente = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
   })
   cliente.connect()
   cliente
    .query('SELECT NOW() as now')
    .then(res => console.log(res.rows[0]))
    .catch(e => console.error(e.stack))
   // Consulta con promises
   cliente.query('SELECT * FROM usuarios')
    .then(res => {
    console.log(res.rows)
    cliente.end() // Cerrando la conexión
    })