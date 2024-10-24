const express = require('express'); // Cargando el modulo de Express.js
const fileUpload = require('express-fileupload'); // Cargando la librería de express-fileupload
const path = require('path');
const fs = require('fs');
const baseUrl = "http://localhost:3000/files/";

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

//listar archivos
app.get('/files', async (req, res) => {
    // El método fs.readdir() se utiliza para leer de forma
    // asíncrona el contenido de un directorio determinado.
    fs.readdir(uploadDir, function(err, files) {
        if (err) {
        res.status(500).send({
        message: "No se puede buscar archivos en el directorio!",
        });
        }
        // Variable que contiene el listado de archivos en el servidor
    
        let listFiles = [];
        files.forEach((file) => {
            listFiles.push({
                name: file,
                url: baseUrl + file,
            });
        });

        res.status(200).send(listFiles);
    });
});

//descargar 
app.get('/files/:name', async (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "./files/";
    // La función res.download() transfiere el archivo en la ruta
    // como un "archivo adjunto". Por lo general, los navegadores
    // le pedirán al usuario que descargue.
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "No se puede descargar el archivo. " + err,
            });
        }
    });
});
// eliminar
app.delete('/files/:name', async (req, res) => {
    const fileName = req.params.name;
    const directoryPath = "./files/";
    try {
        // fs.unlinkSync elimina un archivo y espera hasta que se terminela
        // operación para seguir ejecutando el código, también se puede
        // usar fs.unlink() que ejecuta dicha operación de forma asíncrona
        fs.unlinkSync(directoryPath + fileName);
        console.log('File removed')
        res.status(200).send("Archivo Eliminado Satisfactoriamente");
    } catch (err) {
        console.error('ocurrió algo incorrecto al eliminar el archivo',err)
    }
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Corriendo en el servidor, API REST subida de archivos
    express-fileupload que se está ejecutando en: http://localhost:${PORT}.`);
});