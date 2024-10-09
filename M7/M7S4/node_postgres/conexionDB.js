// Modulo npm node-postgres
const { Client } = require('pg')
// Datos para la conexión a la base de datos
const cliente = new Client({
 user: 'node_user',
 host: 'localhost',
 database: 'db_node',
 password: 'node_password',
 port: 5432,
})
// Conectando al cliente
cliente.connect()

// Realizando una consulta para verificar si hay error
cliente.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    cliente.end()
})