const db = require('../models');
const Ventas = db.ventas;
const Productos = db.productos;
const VentasProductos = db.ventas_productos; // Asegúrate de definir el modelo intermedio

// Obtener todas las relaciones ventas-productos
const getVentasProductos = async (req, res) => {

    try {
        const { ventas_productosId } = req.body;
        const ventasProductos = await VentasProductos.findAll({
            where: { id: ventas_productosId },
            include: [Ventas, Productos]  
        });
        res.status(200).json({
            error: false,
            codigo: 200,
            mensaje: 'Ventas-productos obtenidas correctamente',
            response: ventasProductos
        });
    } catch (error) {
        console.error(error); // Para ayudarte a entender el error
        res.status(500).json({ 
            error: true,
            codigo: 500,
            mensaje: 'Error al obtener las ventas-productos',
        });
    }
};

// Crear una nueva relación venta-producto
const createVentaProducto = async (req, res) => {

    try {
        const { ventaId, productoId, cantidad } = req.body;
        const nuevaRelacion = await VentasProductos.create({
            VentaId: ventaId,
            ProductoId: productoId,
            cantidad: cantidad
        });
        res.status(201).json({
            error: false,
            codigo: 201,
            mensaje: 'Relación venta-producto creada con éxito',
            response: nuevaRelacion
        });
    } catch (error) {
        res.status(500).json({ 
            error: true,
            codigo: 500,
            mensaje: 'Error al crear la relación venta-producto' 
        });
    }
};

// Obtener una relación venta-producto por ID
const getVentaProductoById = async (req, res) => {

    try {
        const { ventaId, productoId } = req.params;
        const ventaProducto = await VentasProductos.findOne({
            where: { VentaId: ventaId, ProductoId: productoId },
            include: [Ventas, Productos]
        });

        if (!ventaProducto) {
            return res.status(404).json({ 
                error: true, 
                codigo: 404,
                mensaje:'Relación venta-producto no encontrada' 
            });
        }

        res.status(200).json({
            error:  false,
            codigo: 200,
            mensaje: 'Relación venta-producto encontrada',
            response: ventaProducto
        });
    } catch (error) {
        res.status(500).json({ 
            error: true,
            codigo:  500,
            mensaje: 'Error al obtener la relación venta-producto' 
        });
    }
};

// Actualizar una relación venta-producto por ID
const updateVentaProducto = async (req, res) => {

    try {
        const { ventaId, productoId } = req.params;
        const { cantidad } = req.body;
        const ventaProducto = await VentasProductos.findOne({
            where: { VentaId: ventaId, ProductoId: productoId }
        });

        if (!ventaProducto) {
            return res.status(404).json({ 
                error: true, 
                codigo:  404,
                mensaje: 'Relación venta-producto no encontrada' 
            });
        }

        ventaProducto.cantidad = cantidad;
        await ventaProducto.save();

        res.status(200).json({
            error: false,
            codigo:  200,
            mensaje: 'Relación venta-producto actualizada correctamente',
            response: ventaProducto
        });
    } catch (error) {
        res.status(500).json({ 
            error: true,
            codigo: 500,
            mensaje: 'Error al actualizar la relación venta-producto' 
        });
    }
};

// Eliminar una relación venta-producto por ID
const deleteVentaProducto = async (req, res) => {

    try {
        const { ventaId, productoId } = req.params;
        const ventaProducto = await VentasProductos.findOne({
            where: { VentaId: ventaId, ProductoId: productoId }
        });

        if (!ventaProducto) {
            return res.status(404).json({ 
                error: true,
                codigo: 404,
                mensaje: 'Relación venta-producto no encontrada' 
            });
        }

        await ventaProducto.destroy();
        res.status(204).send({
            error: false,
            codigo: 204,
            mensaje: 'Relación venta-producto eliminada correctamente'
        });
    } catch (error) {
        res.status(500).json({ 
            error:  true,
            codigo: 500,
            mensaje: 'Error al eliminar la relación venta-producto' 
        });
    }
};

module.exports = {
    getVentasProductos,
    getVentaProductoById,
    createVentaProducto,
    updateVentaProducto,
    deleteVentaProducto
}