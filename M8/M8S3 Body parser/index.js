const express = require('express');
const bodyParser = require ('body-parser');
const port = 3000;
const app = express();

//Ruta del archivo json para la persistencia de datos
const path = './libros.json'
//app.use(express.json()); 


//----- Middleware para dar soporte a mis endpoint que consuman datos/ tipos de codificación, Sirven para mandar distintos tipos de formatos a mi endpoint. Es para trabajar y procesar los datos. 

//Middleware para agregar el json 
app.use(bodyParser.json());

//Middleware para datos sin procesar con raw
app.use(bodyParser.raw());

//Middleware paa agregar el texto, tipo pdf
app.use(bodyParser.text());

//Middleware sirve para enviar formularios
app.use(bodyParser.urlencoded({extended: true}));

//-------------------------------------------------------------------------------------------

app.post('/api/json', (req,res) => {
    const data = req.body;
    res.send(`Datos recibidos: ${JSON.stringify(data)}`);
    
});

app.post('/api/text', (req,res) => {
    const textData = req.body;
    res.status(201).send(`Datos recibidos exitosamente: ${textData}`);

});

app.post('/api/form', (req,res)=>{
    const formData = req.body;
    res.status(201).send(`Datos recibidos: ${JSON.stringify(formData)}`);
});

app.post('/api/usuario', (req,res) => {
    const {nombre, apellido} = req.body;

    if  (!nombre || apellido) {
        res.status(400).send({
            error: true, 
            codigo: 404, 
            mensaje: 'URL no encontrada'
        });
    }
    const usuario =  {nombre, apellido};
    res.status(201).send({
        error: false,
        codigo: 201,
        mensaje: 'Usuario creado exitosamente',
        respuesta:  usuario
    });
});

//-----------------------------------------------------------------------------------------------

//Middlware de respuestas para error 400
app.use((req, res) => {
    res.status(404).send({error: true, codigo: 404, mensaje: 'URL no encontrada'});
});
//Middlware de respuestas para error 500
app.use((err,req, res, next) => {
    res.status(500).send({error: true, codigo: 500, mensaje: 'Error interno del servidor'});
});

//-----------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`Servidor corriendo en ${port}`) 
});