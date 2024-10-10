const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
})
async function getUsers() {
    const [idClienteA, idClienteB] = process.argv.slice(2);
    try {
        const res = await pool.query('SELECT * FROM "cuentas" WHERE "id" = $1 OR "id" = $2',[idClienteA,idClienteB])
        console.table(res.rows);
    } catch (error) {
        console.error(error);
    }
}

getUsers()