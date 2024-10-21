const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;

const getVentas = async (req, res) => {
    try {
        const { id, sku, numeroFactura} = req.body;
        const ventas = await leerArchivo('../db/ventas.json');
        
        if (!id || !sku|| !numeroFactura) {
            return res.status(400).json({
                error: false,
                codigo:  400,
                mensaje: 'Faltan campos obligatorios'
            });
          }
        res.status(204).send({
            error: false,
            codigo: 204,
            mensaje: 'Ventas OKKKKK',
            response: ventas
          });
    } catch (error) {
        res.status(500).json({ 
            error: true, 
            codigo:  500, 
            mensaje: 'Error al leer el archivo de VENTAS.JSON' 
        });
    }
};

const getVentaById = async (req, res) => {
    try {
        const ventas = await leerArchivo('../db/ventas.json');
        const venta = ventas.find(v => v.id === req.params.id);
        
        if (!venta) {
            return res.status(404).json({ 
                error: true, 
                codigo: 404,
                mensaje: 'Venta no encontrada' 
            });
        }
        res.status(200).send({
            error: false,
            codigo: 200,
            mensaje: 'Relación venta-producto eliminada correctamente',
            response: venta
          });
    } catch (error) {
        res.status(500).json({ 
            error: true, 
            codigo:   500, 
            mensaje: 'Error al obtener la venta' 
        });
    }
};

const createVenta = async (req, res) => {
    
    try {
        const {sku, numeroFactura } = req.body;
        const ventas = await leerArchivo('../db/ventas.json');
        const id = uuidv4();
        const nuevaVenta = { id, sku, numeroFactura };
        ventas.push(nuevaVenta);
        await escribirArchivo('../db/ventas.json', ventas);
        res.status(201).json({
            error: false,
            codigo: 201,
            mensaje: 'Venta agregada exitosamente', 
            reasponse: nuevaVenta 
        });
    } catch (error) {
        res.status(500).json({ 
            error: true,
            codigo: 500,
            mensaje: 'Error al crear la venta' 
        });
    }
};

const updateVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const { sku, numeroFactura } = req.body;
        const ventas = await leerArchivo('../db/ventas.json');
        const venta = ventas.find(v => v.id === id);

        if (!venta) {
            return res.status(404).json({ 
                error: true,
                codigo:  404,
                mensaje: 'Venta no encontrada' 
            });
        }

        if (sku) venta.sku = sku;
        if (numeroFactura) venta.numeroFactura = numeroFactura;
        await escribirArchivo('../db/ventas.json', ventas);
        res.status(202)({ 
            error: false,
            codigo: 200,
            mensaje: 'Venta actualizada', 
            response: venta 
        });
    } catch (error) {
        res.status(500).json({ 
            error: true,
            codigo:  500,
            mensaje: 'Error al actualizar la venta' 
        });
    }
};

const deleteVenta = async (req, res) => {
    try {
        const { id } = req.params;
        const ventas = await leerArchivo('../db/ventas.json');
        const index = ventas.findIndex(v => v.id === id);

        if (index === -1) {
            return res.status(404).json({ 
                error: true,
                codigo:  404,
                mensaje: 'Venta no encontrada' 
            });
        }

        ventas.splice(index, 1);
        await escribirArchivo('../db/ventas.json', ventas);
        res.json({ mensaje: 'Venta eliminada' });
    } catch (error) {
        res.status(500).json({ 
            error: true, 
            codigo:  500,
            mensaje: 'Error al eliminar la venta' 
        });
    }
};

module.exports = {
    getVentas,
    getVentaById,
    createVenta,
    updateVenta,
    deleteVenta
};