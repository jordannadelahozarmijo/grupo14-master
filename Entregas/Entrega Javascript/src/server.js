const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 
app.use(express.static('public'));

app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public',  'index.html'));
});

//---------------------------------------------------------------------------------
//Función para leer los archivos json
const leerArchivo = async (file) => {
    try {
        const data = await fs.readFile(file, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer el archivo:', error);
        throw error;
    }
};

// Función para escribir en los archivos json
const escribirArchivo = async (file, data) => {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
        console.log('Archivo escrito correctamente');
    } catch (error) {
        console.error('Error al escribir en el archivo:', error);
        throw error;
    }
};

//Función para eliminar en los archivos json
const eliminarArchivo = async (file, data) => {
    try {
        await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
        console.log('Archivo eliminado correctamente');
    } catch (error) {
        console.error('Error al eliminar el archivo:', error);
        throw error;
    }
};


//---------------------------------------------------------------------------------
// Rutas para gestionar ventas
app.get('/ventas', async(req,res) => {
    try {
        const ventas = await leerArchivo('../db/ventas.json');
        res.status(200).json({
            error: false,
            codigo:  200,
            mensaje: 'Ventas obtenidas correctamente',
            response: ventas});
    } 
    catch (error) {
            res.status(500).json({
                error: true,
                codigo:  500,
                message: 'Error al obtener ventas'});
    }

});

app.get('/ventas/:id', async (req, res) => {
    try {
        const {id}  = req.params;
        const ventas = await leerArchivo('../db/ventas.json');
        const venta = ventas.find((venta) => venta.id === (id));
        
        if (!venta) {
            return res.status(404).json({ 
                error: true,
                codigo: 404, 
                mensaje: 'Venta no encontrada' 
            });
        }
        res.status(200).json({
            error: false,
            codigo:  200,
            mensaje: 'Ventas obtenidas por ID correctamente',
            response: venta
        });
    } 
    catch (error) {
        res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al obtener la venta'
        });
    }
});

app.post('/ventas', async (req, res) => {
    try {
        const { sku, numeroFactura } = req.body;
        const ventas = await leerArchivo('../db/ventas.json');
        const id = uuidv4();

        //Restricción por si la venta ya existe, verifica por el numero de factura
        const ventaExistente = ventas.findIndex((venta) => venta.numeroFactura === numeroFactura);

        if (ventaExistente !==-1 ) {
            return res.status(400).json({
                error: true,
                codigo: 400,
                mensaje: 'La venta ya existe'
            });
        }

        const nuevaVenta = {
            id,
            sku,
            numeroFactura
        };
        ventas.push(nuevaVenta);
        await escribirArchivo('../db/ventas.json', ventas);
        res.status(200).json({
            error: false,
            codigo: 200,
            mensaje: 'Venta creada correctamente',
            response: nuevaVenta
        });

    } catch (err) {
        return res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al procesar la solicitud'
        });
    }
});

app.put('/ventas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { sku, numeroFactura } = req.body;
        const ventas = await leerArchivo('../db/ventas.json');
        const venta = ventas.findIndex(v => v.id === id);

        if (venta === -1) {
            return res.status(404).json({
                error: true, 
                codigo: 404,
                mensaje: 'Venta no encontrada'
            });
        }
        if (sku) ventas[venta].sku = sku;
        if (numeroFactura) ventas[venta].numeroFactura = numeroFactura;

        await escribirArchivo('../db/ventas.json', ventas);
        res.json({
            error: false,
            codigo: 200,
            mensaje: 'Venta actualizada exitosamente', 
            response: ventas[venta]
        });
    } catch (err) {
        res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al actualizar la venta',
        });
    }
});

app.delete('/ventas/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const ventas = await leerArchivo('../db/ventas.json');
        const ventaIndex = ventas.findIndex(venta => venta.id === id);

        if (ventaIndex === -1) {
            return res.status(404).json({
                error: true,
                codigo: 404,
                mensaje: 'Venta no encontrada'
            });
        }

        ventas.splice(ventaIndex, 1);
        await eliminarArchivo('../db/ventas.json', ventas);

        res.json({ mensaje: 'Venta eliminada exitosamente' });
    } catch (err) {
        return res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al procesar la solicitud'
        });
    }
});

//---------------------------------------------------------------------------------
// Rutas para gestionar productos
app.get('/productos', async (req, res) => {
    try {
        const productos = await leerArchivo('../db/productos.json');
        res.status(200).send({
            error: false,
            codigo:  200,
            mensaje: 'Productos obtenidos exitosamente',
            response: productos
        });
        } catch (error) {
            res.status(500).json({
                error: true,
                codigo: 500,
                mensaje: 'Error al leer los productos',
                error
                });
                }
});

app.get('/productos/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const productos = await leerArchivo('../db/productos.json');
        const productoIndex = productos.findIndex(producto => producto.id === (id));
        if (productoIndex === -1) {
            return res.status(404).json({
                error: true,
                codigo: 404,
                mensaje: 'Producto no encontrado'
                });
        }
        res.status(200).send({
            error: false,
            codigo: 200,
            mensaje: 'Producto encontrado exitosamente',
            response: productos[productoIndex]
            });
    } 
    catch (error) {
        res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al leer el producto',
            error
        });
    }

});

app.post('/productos', async (req, res) => {
    try {
        const { nombre, precio, cantidad } = req.body;
        const productos = await leerArchivo('../db/productos.json');
        const id = uuidv4();
        //agregar una restricción de si  el producto ya existe
        const productoName = productos.findIndex(producto => producto.nombre === nombre);


        if (productoName !== -1) {
            return res.status(400).json({
                error: true,
                codigo: 400,
                mensaje: 'El producto ya existe'
            });
        }

        const nuevoProducto = {
            id,
            nombre,
            precio,
            cantidad
        };
        productos.push(nuevoProducto);
        await escribirArchivo('../db/productos.json', productos);
        res.status(200).json({
            error: false,
            codigo:  200,
            mensaje: 'Producto agregado exitosamente',
            response: nuevoProducto
        });
    } 
    catch (error) {
        res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al crear el producto',
        });
    }
});

app.put('/productos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nombre, precio, cantidad } = req.body;
        const productos = await leerArchivo('../db/productos.json');
        const productoIndex = productos.findIndex((producto) => producto.id === (id));
        if (productoIndex === -1) {
            res.status(404).json({
                error: true,
                codigo: 404,
                mensaje: 'Producto no encontrado',
            });
        } 
        else if (!nombre && !precio && !cantidad) {
        res.status(400).json({
            error: true,
            codigo: 400,
            mensaje: 'Falta información para actualizar el producto: nombre, precio o cantidad',
        });
        } else {
            // Solo actualiza los campos proporcionados en el cuerpo de la solicitud
            if (nombre) productos[productoIndex].nombre = nombre;
            if (precio) productos[productoIndex].precio = precio;
            if (cantidad) productos[productoIndex].cantidad = cantidad;

            // Guardar los cambios en el archivo
            await escribirArchivo('../db/productos.json', productos);

            res.status(200).json({
                error: false,
                codigo: 200,
                mensaje: 'Producto actualizado exitosamente',
                response: productos[productoIndex]
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al actualizar el producto',
            error
            });
    }
});

app.delete('/productos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const productos = await leerArchivo('../db/productos.json');
        const productoIndex = productos.findIndex((producto) => producto.id === (id));
        if (productoIndex === -1) {
            res.status(404).json({
                error: true,
                codigo: 404,
                mensaje: 'Producto no encontrado',
                });
        } 
        else {
            productos.splice(productoIndex, 1);
            await eliminarArchivo('../db/productos.json', productos);
            res.status(200).json({
                error:  false,
                codigo: 200,
                mensaje: 'Producto eliminado exitosamente',
                response: productos
            });

        }
    } catch (error) {
        res.status(500).json({
            error: true,
            codigo: 500,
            mensaje: 'Error al eliminar el producto'
        });
    }
});


//---------------------------------------------------------------------------------
// Middleware de error 404
app.use((req, res) => {
    res.status(404).send({
        error: true,
        codigo: 404,
        mensaje: 'URL no encontrada'
    });
});

// Middleware de error 500
app.use((err, req, res, next) => {
    res.status(500).send({
        error: true,
        codigo: 500,
        mensaje: 'Error interno del servidor'
    });
});

//---------------------------------------------------------------------------------
// Iniciar servidor con node server.js
app.listen(port, () => {
    console.log(`Servidor está corriendo en el puerto ${port}`);
});