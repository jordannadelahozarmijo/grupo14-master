//Consultas parametrizadas

const {Pool} = require("pg");
   const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
   })
   // callback
   console.log('Consulta parametrizada con callback')
   const text = 'SELECT * FROM usuarios WHERE detalles BETWEEN $1 AND $2'
   const values = [2000, 6000] // Array de valores, seleccionamos los mayores de 2000
   pool.query(text, values, (err, res) => {
    if (err) {
    console.log(err.stack)
    } else {
    console.log(res.rows)
    }
   })
   // Promise
   console.log('Consulta parametrizada con promesa')
    const sql = 'SELECT * FROM usuarios WHERE id = $1'
    const value = [2] // Array de valores, seleccionamos los mayores de 2
    pool
        .query(sql, value)
        .then(res => {
            console.log(res.rows[0])
        })
        .catch(e => console.error(e.stack))