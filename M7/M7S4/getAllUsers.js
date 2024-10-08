const {
    pool
   } = require("./dataBase");
async function getAllUsers() {
    try {
    const res = await pool.query("SELECT * FROM users");
    console.table(res.rows);
    } catch (error) {
    console.error(error);
    }
}
getAllUsers()