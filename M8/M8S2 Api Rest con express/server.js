const express = require('express');
const cors = require ('cors');
const fs = require ('fs');
const { v4: uuidv4 } = require ('uuid');
const app = express();
const port = 3000;


app.use(cors());
//formato de respuesta
app.use(express.json()); 


//llamar el archivo de jugadores.json para utilizarlo y leerlo
const leerArchivo = async (file) => {
    try {
        const jugadoresFile = file;
        const jugadores = await JSON.parse(fs.readFileSync(jugadoresFile, 'utf8'));
        return jugadores;
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        return null;  // o cualquier manejo de error que prefieras
    }
};


const escribirArchivo = (file, data, callback) => {
    fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            console.error('Error al escribir en el archivo:', err);
            return callback(err); // Si hay error, llamamos al callback con el error
        }
        console.log('Archivo escrito correctamente');
        callback(null); // Llama al callback indicando que todo salió bien
    });
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


app.post('/jugadores', (req, res) => {
    const { nombre = 'Jugador desconocido', posicion = 'Entrenamiento' } = req.body;

    leerArchivo('./jugadores.json', (err, jugadores) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error al leer el archivo de jugadores' });
        }
        
        const id = uuidv4(); // Genera un nuevo id usando uuidv4()
        
        const nuevoJugador = {
            id,
            nombre,
            posicion
        };

        jugadores.push(nuevoJugador); // Agrega el nuevo jugador

        escribirArchivo('./jugadores.json', jugadores, (err) => {
            if (err) {
                return res.status(500).json({ mensaje: 'Error al escribir en el archivo de jugadores' });
            }
            res.status(201).json({ mensaje: 'Jugador agregado exitosamente', nuevoJugador });
        });
    });
});


//Correr servidor

app.listen(port, () => {
    console.log(`Servidor está corriendo en el puerto ${port}`);
});