// Consultas callback

const {Pool} = require("pg");
   const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
   })
   pool.connect()
    .then((pool) => {pool.query('SELECT * FROM usuarios')
        .then(res => {
        for (let row of res.rows) {
        console.log(row);
        }
        })
        .catch(err => {
        console.error(err);
        })
    })