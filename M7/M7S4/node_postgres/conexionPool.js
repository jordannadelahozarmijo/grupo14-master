//se recomienda para cualquier aplicación que deba ejecutarse durante un período prolongado de tiempo.

const {Pool} = require('pg')
   // Datos para la conexión a la base de datos
   const pool = new Pool({
    user: 'node_user',
    host: 'localhost',
    database: 'db_node',
    password: 'node_password',
    port: 5432,
})
// Realizando una consulta para verificar si hay error
pool.query('SELECT NOW()', (err, res) => {
 console.log(err, res)
 pool.end()
})