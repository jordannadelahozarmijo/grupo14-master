const app = require ('express');
const port = 3000;

//se recomienda para cualquier aplicación que deba ejecutarse durante un período prolongado de tiempo.

const {Pool} = require('pg')
   // Datos para la conexión a la base de datos
   const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'db_modulo7',
    password: '1234',
    port: 5432,
})

//Parsear Json
app.use(express.json());

//1. endpoint: Crear un usuario con Json
app.post('/create-user', async (req,res) => {
    //email y name
     const nombre = req.body.nombre;
     const detalle = req.body.detalle;

     try {
        const result = await pool.query('INSERT USER usuarios (nombre, detalle),' [nombre, detalle])
        res.status(201).json({message: 'Usuario agregado'})
     }
     catch (err) {
        res.status(500).json({error: err.message});
     }
});

//2. Endpoint seleccionar información del usuario desde JSON

app.get('/get-user/:id', async (req, res) =>{
    const userId = req.params.id;
    try {
        const result = await pool.query ('SELECT * FROM usuarios WHERE id= $1', [usuarioID])
    }
    catch (err){
        res.status(404).json;
    }
    
});

//3 Endpoint 

app.listen(port, ()=> {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});