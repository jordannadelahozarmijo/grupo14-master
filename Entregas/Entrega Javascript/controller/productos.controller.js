const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const getProductos = async (req, res) => {
    try {
        const { nombre, marca, precio, cantidad } = req.body;
        const productos = await leerArchivo('../db/productos.json');
        
        if (!nombre || !marca|| !precio || !cantidad) {
          return res.status(400).json({
              error: true,
              codigo:  400,
              mensaje: 'Faltan campos obligatorios'
          });
        }
        res.status(204).send({
          error: false,
          codigo: 204,
          mensaje: 'Relación venta-producto eliminada correctamente',
          response: productos
        });
    } catch (error) {
        res.status(500).json({ 
          error: true, 
          codigo:  500, 
          mensaje: 'Error al leer el archivo de productos' });
    }
};

const getProductoById = async (req, res) => {
    try {
        const productos = await leerArchivo('../db/productos.json');
        const producto = productos.find(p => p.id === req.params.id);
        
        if (!producto) {
            return res.status(404).json({ 
              error: true, 
              codigo:   404, 
              mensaje: 'Producto no encontrado' 
            });
        }
        res.status(204).send({
          error: false,
          codigo: 204,
          mensaje: 'Relación venta-producto eliminada correctamente',
          response: producto
        });
    } catch (error) {
        res.status(500).json({ 
          error: true, 
          codigo:  500,
          mensaje: 'Error al obtener el producto' 
        });
    }
};

const createProducto = async (req, res) => {
    const { nombre, precio } = req.body;
    try {
        const productos = await leerArchivo('../db/productos.json');
        const id = uuidv4();
        const nuevoProducto = { id, nombre, precio };
        productos.push(nuevoProducto);
        await escribirArchivo('../db/productos.json', productos);
        res.status(201).send({
          error:  false,
          codigo: 201,
          mensaje: 'Producto agregado exitosamente', 
          reponse: nuevoProducto 
        });
    } catch (error) {
        res.status(500).json({ 
          error: true, 
          codigo:  500,
          mensaje: 'Error al crear el producto' 
        });
    }
};

const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio } = req.body;
        const productos = await leerArchivo('../db/productos.json');
        const producto = productos.find(p => p.id === id);

        if (!producto) {
            return res.status(404).json({ 
              error: true,
              codigo:  404,
              mensaje: 'Producto no encontrado' 
            });
        }

        if (nombre) producto.nombre = nombre;
        if (precio) producto.precio = precio;
        await escribirArchivo('../db/productos.json', productos);
        res.status(204).send({
          error: false,
          codigo: 204,
          mensaje: 'Relación venta-producto eliminada correctamente',
          response: producto
        });
    } catch (error) {
        res.status(500).json({ 
          error: true, 
          codigo:  500,
          mensaje: 'Error al actualizar el producto' 
        });
    }
};

const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const productos = await leerArchivo('../db/productos.json');
        const index = productos.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ 
              error: true, 
              codigo:  404,
              mensaje: 'Producto no encontrado' 
            });
        }

        productos.splice(index, 1);
        await escribirArchivo('../db/productos.json', productos);
        res.status(200).send({
          error: false,
          codigo: 200,
          mensaje: 'Producto eliminado'
      });
    } catch (error) {
        res.status(500).json({ 
          error: true, 
          codigo:   500,
          mensaje: 'Error al eliminar el producto' 
        });
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};