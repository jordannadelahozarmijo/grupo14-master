const express = require('express');
const cors = require ('cors');
const fs = require('fs').promises;
const { v4: uuidv4 } = require ('uuid');
const app = express();
const port = 3000;


app.use(cors());
//formato de respuesta
app.use(express.json()); 


//llamar el archivo de jugadores.json para utilizarlo y leerlo
// Función para leer el archivo jugadores.json
const leerArchivo = async (file) => {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data); // Parseamos y retornamos los datos
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        throw error; // Lanzamos el error para manejarlo más adelante
    }
};


// Función para escribir en el archivo jugadores.json
const escribirArchivo = async (file, data) => {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
        console.log('Archivo escrito correctamente');
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
        throw error; // Lanzamos el error para manejarlo más adelante
    }
};


// Crear las consultas crud para leer el archivo json 
app.get('/jugadores', async (req,res)=> {
    try {
        const jugadores = await leerArchivo('./jugadores.json');
        res.json({jugadores:jugadores});
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({message: 'Error al leer el archivo json'});
    }       
});

app.get('/jugadores/:id', async (req, res) => {
    try {
        const jugadores = await leerArchivo('./jugadores.json');
        
        // Compara el ID como una cadena
        const jugador = jugadores.find(u => u.id === parseInt(req.params.id)); // No uses parseInt si el ID es string
        
        if (!jugador) {
            return res.status(404).json({ mensaje: 'Jugador no encontrado' });
        }
        res.json(jugador);
    } 
    catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el jugador', error });
    }
});


app.post('/jugadores', async (req, res) => {
    const { nombre = 'Jugador desconocido', posicion = 'Entrenamiento' } = req.body;

    try {
        const jugadores = await leerArchivo('./jugadores.json'); // Leemos el archivo

        const id = uuidv4(); // Genera un nuevo id usando uuidv4()
        
        const nuevoJugador = {
            id,
            nombre,
            posicion
        };

        jugadores.push(nuevoJugador); // Agregamos el nuevo jugador

        await escribirArchivo('./jugadores.json', jugadores); // Escribimos el archivo

        // Respondemos al cliente con el nuevo jugador
        res.status(201).json({ mensaje: 'Jugador agregado exitosamente', nuevoJugador });
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
});

//Crear el PUT
app.put('/jugadores/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre = 'Jugador desconocido', posicion = 'Entrenamiento' } = req.body;
        const jugadores = await leerArchivo('./jugadores.json');
        const jugador = jugadores.findIndex(u => u.id === parseInt(req.params.id)); 

        if  (jugador === -1) {
            return res.status(404).json({ mensaje: 'Jugador no encontrado' });
        }
        if (nombre) jugadores[jugador].nombre = nombre;
        if (posicion) jugadores[jugador].posicion = posicion;
        await escribirArchivo('./jugadores.json', jugadores);
        res.json({mensaje :  'Jugador actualizado exitosamente', jugador: jugadores[jugador]});

    }  catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el jugador', error });
    }
});


//Crear el DELETE
app.delete('/jugadores/:id', async (req, res) => {
    const { id } = req.params; // Obtenemos el ID del jugador de los parámetros
 
    try {
        const jugadores = await leerArchivo('./jugadores.json'); // Leemos el archivo
 
        const jugadorIndex = jugadores.findIndex(jugador => jugador.id === id); // Buscamos el jugador por ID
 
        if (jugadorIndex === -1) {
            return res.status(404).json({ mensaje: 'Jugador no encontrado' }); // Si no lo encontramos, respondemos con 404
        }
 
        jugadores.splice(jugadorIndex, 1); // Eliminamos el jugador del arreglo
 
        await escribirArchivo('./jugadores.json', jugadores); // Escribimos el archivo actualizado
 
        res.json({ mensaje: 'Jugador eliminado exitosamente' }); // Respondemos que se eliminó con éxito
    } catch (err) {
        return res.status(500).json({ mensaje: 'Error al procesar la solicitud' });
    }
});


//Correr servidor

app.listen(port, () => {
    console.log(`Servidor está corriendo en el puerto ${port}`);
});