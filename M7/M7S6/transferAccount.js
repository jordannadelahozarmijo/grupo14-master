const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
})
// Función de trasferencia
async function transferAccount() {
    const [idClienteA, idClienteB, mont] = process.argv.slice(2);
    await pool.connect();
    try {
        // inicio de la trasacción
        await pool.query('BEGIN');
        try {
            const {
                rows
            } = await pool.query('SELECT "balance" FROM "cuentas" WHERE "id" = $1', [idClienteA]);
            const balance = rows[0].balance;

            // Verificamos si la cuenta posee balance, caso contrario no realizamos actualizaciones
            if (balance >= mont) {
                await pool.query('UPDATE "cuentas" SET "balance" = "balance" - $1 WHERE "id" = $2', [mont, idClienteA]);
                await pool.query('UPDATE "cuentas" SET "balance" = "balance" + $1 WHERE "id" = $2', [mont, idClienteB]);
                console.log("trasferencia realizada del ciente con id:" + idClienteA + " al cliente con id: " + idClienteB + " por un monto de " + mont)
            }
            // Enviamos que la transacción se ha completado
            await pool.query('COMMIT');
        } catch (error) {
            // Si existe un error, revertir todos los cambios has el punto de inicio de la trasacción
            await pool.query('ROLLBACK');
            console.error(error.stack); // muestra los errores por consola
        }
    } finally {
        pool.end(); // Finaliza la conexión
    }
   };
// llamamos a la función haciendo uso de: $ node trasferAccount.js 1 2 1000
transferAccount();