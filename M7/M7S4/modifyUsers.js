const {
    pool
} = require("./dataBase");
async function modifyUser() {
    const [id, email] = process.argv.slice(2);
    try {
        const res = await pool.query("UPDATE users SET email = $1 WHERE id = $2", [email,id,]);
        console.log(`Se han actualizado el usuario ${id} con el nuevo correo ${email}`);
    } catch (error) {
        console.error(error);
    }
    }
modifyUser();