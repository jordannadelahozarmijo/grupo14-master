// Consultas callback

const { error } = require("console");
const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
})
pool.connect()
    .then((pool) => {
        pool.query('SELECT * FROM usuarios')
        .then(res => {
            for (let row of res.rows) {
                console.log(row);
            }
        })
        .catch(error => {
            if (error.code == '08003') {
                console.log("\n ERROR! \n Intentas realizar una operación en una conexión que ya no existe.\n")
            }
            else if (error.code == '08006') {
                console.log("\n ERROR! \n La conexión existente falla por alguna razón, pueden haber problemas con la red, el servidor, o pérdida de conectividad entre el cliente y el servidor de PostgreSQL.\n")
            }
            else if (error.code == '2F002') {
                console.log("\n ERROR! \n Hay una situación en la que no se permite modificar datos SQL.\n")
            }
            else if (error.code == '57P03') {
                console.log("\n ERROR! \n El servidor no está disponible para aceptar nuevas conexiones en ese momento. \n")
            }
            else if (error.code == '42601') {
                console.log("\n ERROR! \n Hay un error de sintaxis en la consulta SQL.\n")
            }
            else if (error.code == '42501') {
                console.log("\n ERROR! \n El usuario que está ejecutando la consulta no tiene suficientes privilegios para realizar la operación solicitadan")
            }
            else if (error.code == '42602') {
                console.log("\n ERROR! \n Nombre no válido.\n")
            }
            else if (error.code == '42622') {
                console.log("\n ERROR! \n El nombre de la tabla o columna es demasiado largo y excede el límite permitido por PostgreSQL.\n")
            }
            else if (error.code == '42939') {
                console.log("\n ERROR! \n El nombre ya está reservado en el sistema.\n")
            }
            else if (error.code == '42703') {
                console.log("\n ERROR! \n Estás haciendo referencia a una columna que no existe en la tabla. Esto puede deberse a un error tipográfico o a que la columna fue eliminada o nunca fue creada.\n")
            }
            else if (error.code == '42000') {
                console.log("\n ERROR! \n Este error cubre un amplio rango de errores relacionados con la sintaxis SQL o violaciones de reglas de acceso. Puede incluir errores de sintaxis general o intentar acceder a datos restringidos.\n")
            }
            else if (error.code == '42P01') {
                console.log("\n ERROR! \n  Estás intentando hacer referencia a una tabla que no existe en la base de datos.\n")
            }
            else if (error.code == '42P02') {
                console.log("\n ERROR! \n Estás intentando utilizar un parámetro que no ha sido definido en la consulta SQL.\n")
            }
            else if (error.code == '28P01') {
                console.log("\n ERROR! \n El error indica que la contraseña proporcionada para el usuario de la base de datos es incorrecta.\n")
            } else {
                console.error(error.stack);
                console.log(error.code)
            }

        })
    })