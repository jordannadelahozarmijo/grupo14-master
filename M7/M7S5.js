const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
})
// Función para registrar una transferencia entre cuentas
const registrarTransferencia = async (id_origen, id_destino, monto) => {
    const client = await pool.connect(); // Conectar al cliente de la base de datos
    try {
        await client.query('BEGIN'); // Iniciar la transacción

        // Actualizar el balance de la cuenta de origen restando el monto
        await client.query(
            'UPDATE cuentas SET balance = balance - $1 WHERE id = $2',
            [monto, id_origen]
        );

        // Actualizar el balance de la cuenta de destino sumando el monto
        await client.query(
            'UPDATE cuentas SET balance = balance + $1 WHERE id = $2',
            [monto, id_destino]
        );

        await client.query('COMMIT'); // Confirmar la transacción
        console.log('Transferencia registrada y balances actualizados.');
    } catch (error) {
        await client.query('ROLLBACK'); // Revertir la transacción en caso de error
        console.error('Error en la transacción, se ha revertido:', error);
    } finally {
        client.release(); // Liberar el cliente
    }
};

// Llamar a la función para registrar una transferencia (ejemplo)
registrarTransferencia(1, 2, 1000);