//Crear una consulta tanto con callback como con promise a una tabla de una db

const {Client} = require("pg");
   const cliente = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
   })
   cliente.connect()
   cliente.query('SELECT NOW() as now', (err, res) => {
    if (err) {
        console.log(err.stack)
    } 
    else {
        console.log(res.rows[0])
    }
})
// Consulta con callback
cliente.query('SELECT * FROM usuarios', (err, res) => {
    if (err) {
    console.log(err.stack)
    } else {
    console.log(res.rows)
    cliente.end() // Cerrando la conexión
    }
})