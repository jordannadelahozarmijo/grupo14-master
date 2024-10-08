const {
    pool
} = require("./dataBase");
async function deleteUser() {
    const [id] = process.argv.slice(2);
    try {
        const res = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        console.log(`Se ha eliminado correctamente el usuario con id:${id}`);
    } catch (error) {
        console.error(error);
    }
}
deleteUser();