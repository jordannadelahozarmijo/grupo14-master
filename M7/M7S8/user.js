const {pool} = require("./dataBase.js");
   
class User {

    //Constructor
        constructor(name, age) {
            this.name = name
            this.age = age
        }
    // Creando la tabla en la bases de datos
    static CreateTable() {
        const dropSql = `DROP TABLE IF EXISTS public.users`;
        const sql = `CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name TEXT,
                    age INTEGER)`
        console.log("Preparando para crear la tabla users...")
        
        return new Promise(async (resolve) => {
            await pool.query(dropSql);
            pool.query(sql, function () {
            console.log("...se ha creado la tabla users!")
            resolve("Satisfactoriamente")
            })
            })
    }
    // Método estático de la clase User que busca un usuario con un id
    static Find(id) {
        const sql = `SELECT * FROM users WHERE id = $1 LIMIT 1`
        console.log(`Consultando el usuario con id: ${id}...`)
        // Realizamos la consulta con una promesa
        return new Promise(function (resolve) {
        pool.query(sql, [id], function (err, resultRow) {
            if (err) {
            console.error(err)
            }
            console.log(`...encontrado${JSON.stringify(resultRow.rows)} ...!`)
            const user = new User(resultRow.rows.name,
                resultRow.rows.age)
                return user
                resolve(user)
            })
        })
    }
    
    // Método estatico para buscar todos los usuarios
    static All() {
        const sql = `SELECT * FROM users`
        console.log(`Realizando la consulta de todos los usuarios de la base de datos...`)
        // Realizamos la consulta con une promesa
        return new Promise(function (resolve) {
        pool.query(sql, function (err, results) {
        console.log(`...encontrados ${results.rowCount} usuarios registrados!`)
        // Seleccionamos los campos del objeto result con map()
        // y creamos cada uno de los objetos encontrados comoUser
        const users = results.rows.map(function (userRow) {
            const user = new User(userRow.name, userRow.age)
            user.id = userRow.id
            return user})
            resolve(users)
        })
        })
    }

    // Metodo de inserción de un usuario
    insert() {
        const self = this
        const sql = "INSERT INTO users (name,age) VALUES ($1,$2) RETURNING id"
        console.log(`Insertando el usuario: ${self.name} a la base de datos...`)
        // Resolviendo la consulta como una promesa
        return new Promise(function (resolve) {
                        pool.query(sql, [self.name, self.age], function (err, res){
                        if (err) {
                        console.log(err)
                        }
                        console.log(`...usuario con id: ${res.rows[0].id} insertado en la bases de datos`)
                        resolve(self)
                        }
                    )
                }
            )
        }

    
}
       // Exportamos la clase User
module.exports = User;