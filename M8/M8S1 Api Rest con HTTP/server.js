// Importar módulos
const http = require('http');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

// Crear servidor
const servidor = http.createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);
    // Obtener Tickets
    if (pathname == '/tickets' && req.method == 'GET') {
        try {
            const archivo = await fs.readFile('tickets.json');
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(archivo);
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al leer el archivo de tickets');
        }
    };

    // get ticket por id
    if(pathname.startsWith('/tickets/') && req.method == 'GET'){
        const id = pathname.split('/')[2];  // Extraer el ID desde la URL
        try {
            const archivoOriginal = await fs.readFile('tickets.json');
            const tickets = JSON.parse(archivoOriginal);

            const ticket = tickets.find(ticket => ticket.id == id);
            if (ticket) {
                res.statusCode = 200;
                res.write(JSON.stringify(ticket, null, 2));
            } else {
                res.statusCode = 404;
                res.write('Ticket no encontrado');
            }
            res.end();
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al leer el archivo');
        }
    }
    

    // Crear nuevo Ticket
    if (pathname == '/tickets' && req.method == 'POST') {
        try {
            const archivoOriginal = await fs.readFile('tickets.json');
            const datosOriginales = JSON.parse(archivoOriginal);
            let nuevoTicket;

            req.on('data', (data) => {
                nuevoTicket = JSON.parse(data);
            });

            req.on('end', async () => {
                const nuevoId = datosOriginales.length + 1; // Usar un ID numérico consecutivo
                nuevoTicket.id = nuevoId;
                nuevoTicket.created_at = new Date().toISOString();
                nuevoTicket.updated_at = new Date().toISOString();
                datosOriginales.push(nuevoTicket);

                await fs.writeFile('tickets.json', JSON.stringify(datosOriginales, null, 2));
                res.statusCode = 201;
                res.end('Ticket agregado exitosamente');
            });
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el ticket');
        }
    }

    // Actualizar un Ticket
    if (pathname == '/tickets' && req.method == 'PUT') {
        try {
            const id = parseInt(params.get('id'));
            const archivoOriginal = await fs.readFile('tickets.json');
            const objetosOriginales = JSON.parse(archivoOriginal);
            let datosParaModificar;

            req.on('data', (datos) => {
                datosParaModificar = JSON.parse(datos);
            });

            req.on('end', async () => {
                const index = objetosOriginales.findIndex(ticket => ticket.id === id);
                if (index === -1) {
                    res.statusCode = 404;
                    res.end('Ticket no encontrado');
                    return;
                }

                // Actualizar el ticket y mantener los valores antiguos donde no se modifica
                objetosOriginales[index] = { ...objetosOriginales[index], ...datosParaModificar, updated_at: new Date().toISOString() };

                await fs.writeFile('tickets.json', JSON.stringify(objetosOriginales, null, 2));
                res.statusCode = 200;
                res.end('Ticket actualizado exitosamente');
            });
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al actualizar el ticket');
        }
    }

    // Eliminar un Ticket
    if (pathname == '/tickets' && req.method == 'DELETE') {
        try {
            const id = parseInt(params.get('id'));
            const archivoOriginal = await fs.readFile('tickets.json');
            const objetosOriginales = JSON.parse(archivoOriginal);

            const index = objetosOriginales.findIndex(ticket => ticket.id === id);
            if (index === -1) {
                res.statusCode = 404;
                res.end('Ticket no encontrado');
                return;
            }

            objetosOriginales.splice(index, 1);
            await fs.writeFile('tickets.json', JSON.stringify(objetosOriginales, null, 2));
            res.statusCode = 200;
            res.end('Ticket eliminado exitosamente');
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al eliminar el ticket');
        }
    }

    // Obtener mensajes de un ticket específico
    if (pathname.startsWith('/tickets/') && pathname.endsWith('/messages') && req.method == 'GET') {
        const id_ticket = parseInt(pathname.split('/')[2]);
        try {
            const archivoMessages = await fs.readFile('messages.json');
            const messages = JSON.parse(archivoMessages);

            // Filtrar los mensajes del ticket específico
            const messagesForTicket = messages.filter(message => message.id_ticket === id_ticket);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(messagesForTicket));
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al leer los mensajes');
        }
    }

    // Crear nuevo Mensaje
    if (pathname == '/messages' && req.method == 'POST') {
        try {
            const archivoOriginal = await fs.readFile('messages.json');
            const datosOriginales = JSON.parse(archivoOriginal);
            let nuevoMensaje;

            req.on('data', (data) => {
                nuevoMensaje = JSON.parse(data);
            });

            req.on('end', async () => {
                nuevoMensaje.id = datosOriginales.length + 1; // Generar un nuevo ID numérico
                nuevoMensaje.created_at = new Date().toISOString();

                datosOriginales.push(nuevoMensaje);
                await fs.writeFile('messages.json', JSON.stringify(datosOriginales, null, 2));
                res.statusCode = 201;
                res.end('Mensaje agregado exitosamente');
            });
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el mensaje');
        }
    }


    // Actualizar un Mensaje
    if (pathname == '/messages' && req.method == 'PUT') {
        try {
            const id = parseInt(params.get('id'));
            const archivoOriginal = await fs.readFile('messages.json');
            const objetosOriginales = JSON.parse(archivoOriginal);
            let datosParaModificar;

            req.on('data', (datos) => {
                datosParaModificar = JSON.parse(datos);
            });

            req.on('end', async () => {
                const index = objetosOriginales.findIndex(message => message.id === id);
                if (index === -1) {
                    res.statusCode = 404;
                    res.end('Mensaje no encontrado');
                    return;
                }

                // Actualizar el mensaje
                objetosOriginales[index] = { ...objetosOriginales[index], ...datosParaModificar };

                await fs.writeFile('messages.json', JSON.stringify(objetosOriginales, null, 2));
                res.statusCode = 200;
                res.end('Mensaje actualizado exitosamente');
            });
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al actualizar el mensaje');
        }
    }

    // Eliminar un Mensaje
    if (pathname == '/messages' && req.method == 'DELETE') {
        try {
            const id = parseInt(params.get('id'));
            const archivoOriginal = await fs.readFile('messages.json');
            const objetosOriginales = JSON.parse(archivoOriginal);

            const index = objetosOriginales.findIndex(message => message.id === id);
            if (index === -1) {
                res.statusCode = 404;
                res.end('Mensaje no encontrado');
                return;
            }

            objetosOriginales.splice(index, 1);
            await fs.writeFile('messages.json', JSON.stringify(objetosOriginales, null, 2));
            res.statusCode = 200;
            res.end('Mensaje eliminado exitosamente');
        } catch (error) {
            res.statusCode = 500;
            res.end('Error al eliminar el mensaje');
        }
    }});

servidor.listen(9090, function () {
    console.log("Servidor iniciado en puerto 9090");
});

module.exports = { servidor };