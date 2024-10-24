const express = require('express'); // Cargando el modulo de Express.js
const fileUpload = require('express-fileupload'); // Cargando la librería de express-fileupload
const path = require('path');
const jwt = require ('jsonwebtoken');
const fs = require('fs');
const baseUrl = "http://localhost:4000/files/";
const cookieParser = require ('cookie-parser');
const secretKey = "secret";

const PORT = 4000; // Definimos el puerto donde la API estará disponible

// Inicializamos la librería Express.js y Middleware
const app = express();
app.use(fileUpload());
app.use(express.json()); // Para que la API pueda recibir datos en formato JSON
app.use(cookieParser());
app.use(express.static('public'));


const usuarios = [
    { id: 1, nombre: 'admin', contrasena: '123456', rol: 'admin' },
    { id: 2, nombre: 'usuario', contrasena: 'password', rol: 'usuario' }
];


//Crear endpoint para verificar con jwt 
app.post("/login", (req, res) => {
    const { nombre, contrasena } = req.body;
    //Verificar si el usuario existe y la contraseña es correcta
    const usuario = usuarios.find(u => u.nombre === nombre && u.contrasena === contrasena);

    if (!usuario) {
        return res.status(401).json({
            error: true,
            codigo: 401,
            mensaje: 'Credenciales inválidas' 
        });
    }
    //Crear el payload del token JWT
    const payload = {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
    };

    //Generar el token JWT
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    //Guardar el token en una cookie del navegador
    res.cookie('token', token, { httpOnly: true });
    res.json({ 
        mensaje: 'Inicio de sesión exitoso, token generado',
        token: token
    });
    });

  //Middleware para verificar el token
function verifyToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(403).json({ mensaje: 'No se encontró el token, acceso denegado' });
    }
  
    jwt.verify(token, secretKey, (err, usuario) => {
      if (err) {
        return res.status(403).json({ mensaje: 'Token inválido o expirado' });
      }
      //Si el token es válido, guardamos la información del usuario en la request
      req.usuario = usuario;
      next();
    });
  }

//endpoint get utiliza el middelware para dar acceso
app.get("/protected", verifyToken, (req, res) => {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({ mensaje: 'No tienes permisos de administrador' });
    }
    res.json({ mensaje: `Bienvenido a la página de administración, ${req.usuario.nombre}` });
});


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
    console.log(`Corriendo en el servidor, API REST subida de archivos,
    express-fileupload que se está ejecutando en: http://localhost:${PORT}.`);
});