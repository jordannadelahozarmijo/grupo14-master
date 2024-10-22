const express = require('express'); // Cargando el modulo de Express.js
const fileUpload = require('express-fileupload'); // Cargando la librería de express-fileupload
const path = require('path');
const fs = require('fs');

const PORT = 3000; // Definimos el puerto donde la API estará disponible

// Inicializamos la librería Express.js y Middleware
const app = express();
app.use(fileUpload());
app.use(express.json()); // Para que la API pueda recibir datos en formato JSON
app.use(express.static('public'));

// Crear la carpeta 'files' si no existe
const uploadDir = './files';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

app.get('/', (req, res) => {
    console.log("Accediendo a la ruta raíz");
    const filePath = path.join(__dirname, 'public', 'index.html');
    res.sendFile(filePath);
});

app.post('/upload', async (req, res) => {
    console.log("Subida de archivo iniciada");

    // Validando que no se suba un archivo vacío
    if (!req.files || Object.keys(req.files).length === 0) {
        console.log("No se ha enviado ningún archivo");
        return res.status(400).send({
            error: true,
            codigo: 400,
            message: 'Archivo no subido al servidor',
        });
    }

    let archivo = req.files.fileInput; // Asegúrate de que el nombre coincide con el del formulario
    let uploadPath = path.join(uploadDir, archivo.name);
    console.log(`Archivo recibido: ${archivo.name}`);

    archivo.mv(uploadPath, err => {
        if (err) {
            console.log("Error al mover el archivo:", err);
            return res.status(500).send({
                message: 'Error al mover el archivo'
            });
        }

        console.log("Archivo subido exitosamente, redirigiendo...");
        res.send('Archivo subido con éxito');
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Corriendo en el servidor, API REST subida de archivos
    express-fileupload que se está ejecutando en: http://localhost:${PORT}.`);
});