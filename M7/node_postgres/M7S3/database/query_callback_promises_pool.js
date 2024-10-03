const {Pool} = require("pg");
const pool = new Pool({
 user: 'postgres',
 host: 'localhost',
 database: 'db_modulo7',
 password: '1234',
 port: 5432,
})
// Consulta con callback
console.log('Consulta con Callback')
pool.query('SELECT * FROM usuarios WHERE id = 1', (err, res) => {
    if (err) {
    console.log(err.stack)
    } else {
    console.log(res.rows)
    }
});
// Consulta con promises
console.log('Consulta con Promesas')
pool.query('SELECT * FROM usuarios WHERE id = 3')
    .then(res => {
    console.log(res.rows)
    pool.end() // Cerrando la conexión
});