const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

// Ruta del archivo JSON para la persistencia de datos
const path = './libros.json';

// Middleware con body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Para analizar JSON también

let listaLibros = [];

//------------------------------------------------------------------------------------

// Función para leer los libros desde el archivo JSON
const leerLibros = async () => {
    try {
        const data = await fs.readFile(path, 'utf8');
        listaLibros = JSON.parse(data); // Inicializamos listaLibros con los datos del archivo
        console.log('Libros cargados correctamente');
        return listaLibros; // Retornamos los libros para ser usados
    } catch (error) {
        console.error('Error al cargar el archivo libros.json:', error);
        throw new Error('Error al leer los libros');
    }
};

// Llamamos a leerLibros al inicio del servidor
leerLibros();

//------------------------------------------------------------------------------------

// Ruta para obtener todos los libros
app.get('/libros', async (req, res) => {
    try {
        const libros = await leerLibros(); // Esperamos a que se lean los libros
        res.status(200).send({
            error: false,
            codigo: 200,
            mensaje: 'Libros leídos correctamente',
            respuesta: libros // Enviamos todos los libros
        });
    } catch (error) {
        res.status(500).send({
            error: true,
            codigo: 500,
            mensaje: 'Los libros no pudieron ser leídos',
        });
    }
});

//------------------------------------------------------------------------------------

// Ruta para agregar libros (POST)
app.post('/libros', (req, res) => {
    const { isbn, nombre, autor } = req.body;

    // Verificamos si todos los datos requeridos están presentes
    if (!isbn || !nombre || !autor) {
        return res.status(400).send({
            error: true,
            codigo: 400,
            mensaje: 'Datos incompletos. Se requiere ISBN, nombre y autor.',
        });
    }

    // Verificamos si el libro ya existe en la lista
    const isbnBusqueda = listaLibros.find(l => l.isbn === isbn);
    if (isbnBusqueda) {
        return res.status(200).send({
            error: true,
            codigo: 200,
            mensaje: 'El libro ya existe en la lista, no se agregó',
            respuesta: listaLibros,
        });
    }

    // Agregamos el nuevo libro a la lista
    const nuevoLibro = { isbn, nombre, autor };
    listaLibros.push(nuevoLibro);

    // Enviamos respuesta
    res.status(201).send({
        error: false,
        codigo: 201,
        mensaje: 'El libro fue agregado correctamente',
        respuesta: listaLibros,
    });
});

//------------------------------------------------------------------------------------

// Ruta para actualizar libros (PUT)
app.put('/libros/:isbn', (req, res) => {
    const { isbn } = req.params; // Obtenemos el isbn de los parámetros
    const libroActualizado = req.body; // Obtenemos los datos actualizados del body

    const indice = listaLibros.findIndex(l => l.isbn === isbn); // Buscamos el índice del libro
    if (indice === -1) {
        return res.status(404).send({
            error: true,
            codigo: 404,
            mensaje: 'El libro no existe, no se puede actualizar',
        });
    }

    // Actualizamos las propiedades del libro encontrado
    listaLibros[indice] = { ...listaLibros[indice], ...libroActualizado };

    // Enviamos respuesta
    return res.status(200).send({
        error: false,
        codigo: 200,
        mensaje: 'El libro fue actualizado correctamente',
        respuesta: listaLibros,
    });
});

//------------------------------------------------------------------------------------

// Middleware de respuestas para error 404 (URL no encontrada)
app.use((req, res) => {
    res.status(404).send({ error: true, codigo: 404, mensaje: 'URL no encontrada' });
});

// Middleware de respuestas para error 500 (Error interno del servidor)
app.use((err, req, res, next) => {
    res.status(500).send({ error: true, codigo: 500, mensaje: 'Error interno del servidor' });
});

//------------------------------------------------------------------------------------

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});