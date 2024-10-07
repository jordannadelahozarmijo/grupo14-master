// Consultas callback

const { error } = require("console");
const {Pool} = require("pg");
   const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
   })
   pool.connect()
    .then((pool) => {pool.query('SElECT * FROM usuarios')
        .then(res => {
        for (let row of res.rows) {
        console.log(row);
        }
        })
        .catch(error => {
            if (error.code == '08003') {
                console.log("\n ERROR! \n connection_does_not_exist\n")
            }
            if (error.code == '08006') {
                console.log("\n ERROR! \n connection_failure\n")
            }
            if (error.code == '2F002') {
                console.log("\n ERROR! \n modifying_sql_data_not_permitted\n")
            }
            if (error.code == '57P03') {
                console.log("\n ERROR! \n cannot_connect_now\n")
            }
            if (error.code == '42601') {
                console.log("\n ERROR! \n syntax_error\n")
            }
            if (error.code == '42501') {
                console.log("\n ERROR! \n insufficient_privilege\n")
            }
            if (error.code == '42602') {
                console.log("\n ERROR! \n invalid_name\n")
            }
            if (error.code == '42622') {
                console.log("\n ERROR! \n name_too_long\n")
            }
            if (error.code == '42939') {
                console.log("\n ERROR! \n reserved_name\n")
            }
            if (error.code == '42703') {
                console.log("\n ERROR! \n undefined_column\n")
            }
            if (error.code == '42000') {
                console.log("\n ERROR! \n syntax_error_or_access_rule_violation\n")
            }
            if (error.code == '42P01') {
                console.log("\n ERROR! \n undefined_table\n")
            }
            if (error.code == '42P02') {
                console.log("\n ERROR! \n undefined_parameter\n")
            }
            if (error.code == '28P01') {
                console.log("\n ERROR! \n Password inválido\n")
            } else {
                console.error(error.stack);
                console.log(error.code)
            }

        })
    })