const { pool } = require("./dataBase.js");

async function insertUser() {
    const [email, firstname, lastname, age] = process.argv.slice(2);
    console.log(email, firstname, lastname, age);

    try {
        // Realiza la consulta para insertar los datos en la tabla 'users'
        const result = await pool.query(
            'INSERT INTO users (email, firstname, lastname, age) VALUES ($1, $2, $3, $4)',
            [email, firstname, lastname, age]
        );

        console.log("User inserted successfully:", result.rowCount);
    } catch (err) {
        console.error("Error inserting user:", err);
    } finally {
        // Cerramos la conexión una vez finalizada la operación
        pool.end();
    }
}

insertUser();