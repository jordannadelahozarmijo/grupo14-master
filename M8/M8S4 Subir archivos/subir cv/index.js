const express = require('express') // Cargando el modulo de Express.js
const fileUpload = require('express-fileupload') // Cargando la librería de express-fileupload
const PORT = 3000; // Este variable define el puerto del computador donde la API esta disponible
const path = require ('path');
const fs =  require('fs');

// Definimos la variable que inicializa la libreria Express.js y  Middleware
const app = express();
app.use(fileUpload());
app.use(express.json()); // Para que la API pueda recibir datos en formato JSON
app.use(express.static('public'));


app.get('/', (req,res ) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/upload', async (req, res) => {

    // Validando la no existencia de un archivo vacío
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send({
        error: true,
        codigo: 400,
        message: 'Archivo no subido al servidor',
        });
    } 
    else {
        let archivo = req.files.fileName;
        uploadPath = `./files/${archivo.name}`;
        //Validando que el archivo no sea solo texto plano .txt
        archivo.mv(uploadPath, err => {
            if (err) {
                    return res.status(500).send({
                    message: err
                    });
                }
            res.send ('Archivo subido con éxito');
        });
    }
});


// 1 - El puerto donde esta disponible la API
// 2 - Una función de llamada (callback) cuando la API esta lista
app.listen(PORT, () =>
 console.log(`Corriendo en el servidor, API REST subida de archivos
express-fileupload que se esta ejecutando en: http: //localhost:${PORT}.`)
);