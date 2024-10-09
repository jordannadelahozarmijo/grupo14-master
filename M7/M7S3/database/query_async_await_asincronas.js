// CONSULTAS ASINCRONAS CON ASYNC/AWAIT Y CALLBACK

const {Client,Pool} = require("pg"); 
   const cliente = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
   })
   // Como Cliente
   async function buscarTodos() {
    try {
    await cliente.connect();
    const res = await cliente.query('SELECT * FROM usuarios');
    for (let row of res.rows) {
    console.log(row);
    }
    return res;
    cliente.end()
    } catch (err) {
    console.error(err);
    }
   }
   buscarTodos().then(res => console.log("Se mostraron todos los registros de usuarios"));