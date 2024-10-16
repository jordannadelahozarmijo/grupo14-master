//Importar módulos
const http = require('http');
const fs = require ('fs/promises');
const {v4: uuidv4} = require ('uuid');

//Crear servidor
const servidor = http.createServer (async (req,res) => {
    const { searchParams, pathname} = new URL(req.url, `https://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);
    console.log(pathname)
    
    //get Tickets
    if(pathname == '/tickets' && req.method == 'GET'){
        //Leer archivo
        try{
            const Archivo = await fs.readFile('tickets.json');
            res.statusCode = 200;
            res.write(Archivo);
            res.end('OK');
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al leer el archivo');
        }
  
    }

    
    //post Tickets
    if(pathname == '/tickets' && req.method == 'POST'){
        try {
            const archivoOriginal = await fs.readFile('tickets.json');
            const datosOriginales = JSON.parse(archivoOriginal);
            const id = uuidv4();
            let datostickets;

            req.on('data', (data) => {
                datostickets = JSON.parse(data);
                console.log(datostickets);
            });

            req.on('end', async () => {
                datosOriginales[id] = datostickets;
                await fs.writeFile('tickets.json', JSON.stringify(datosOriginales, null,2));
                res.statusCode = 200;
                res.write("tickets agregado exitosamente");
                res.end()
            });
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el tickets');
        }
    }

    //put tickets
    if(pathname == '/tickets' && req.method == 'PUT'){
        try {
            const id = params.get('id');
            const archivoOriginal = await fs.readFile('tickets.json');
            const objetosOriginales = JSON.parse(archivoOriginal);
            let datosParaModificar;
            
            req.on('data', (datos) => {
                datosParaModificar = JSON.parse(datos);
            })

            req.on('end', async () => {
                const ticketsOriginal = objetosOriginales[id]
                const ticketsActualizado = {...ticketsOriginal, ...datosParaModificar}

                objetosOriginales[id] = ticketsActualizado;
                await fs.writeFile('tickets.json', JSON.stringify(objetosOriginales, null,2));
                res.statusCode = 200;
                res.write("Los datos han sido actualizados de forma exitosa");
                res.end();
            })
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el tickets');
        }
    }

    //delete tickets
    if(pathname == '/tickets' && req.method == 'DELETE'){
        try {
        const archivoOriginal = await fs.readFile('tickets.json');
        const objetosOriginales = JSON.parse(archivoOriginal);
        const id = params.get('id');
        if (!objetosOriginales[id]) {
            res.statusCode = 404;
            res.end("tickets no encontrado");
        }

        delete objetosOriginales[id];
        await fs.writeFile('tickets.json', JSON.stringify(objetosOriginales, null, 2));
        res.statusCode = 200;
        res.write("Los datos han sido eliminados exitosamente");
        res.end('Ok');
        }
        catch {
            res.statusCode = 500;
            res.end('Error al eliminar el tickets');
        }

    }
    
    //get Messages
    if(pathname == '/messages' && req.method == 'GET'){
        //Leer archivo
        try{
            const Archivo = await fs.readFile('messages.json');
            res.statusCode = 200;
            res.write(Archivo);
            res.end('OK');
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al leer el archivo');
        }
  
    }
    //post Messages
    if(pathname == '/messages' && req.method == 'POST'){
        try {
            const archivoOriginal = await fs.readFile('messages.json');
            const datosOriginales = JSON.parse(archivoOriginal);
            const id = uuidv4();
            let datosmessages;

            req.on('data', (data) => {
                datosmessages = JSON.parse(data);
                console.log(datosmessages);
            });

            req.on('end', async () => {
                datosOriginales[id] = datosmessages;
                await fs.writeFile('messages.json', JSON.stringify(datosOriginales, null,2));
                res.statusCode = 200;
                res.write("messages agregado exitosamente");
                res.end()
            });
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el messages');
        }
    }

    //put messages
    if(pathname == '/messages' && req.method == 'PUT'){
        try {
            const id = params.get('id');
            const archivoOriginal = await fs.readFile('messages.json');
            const objetosOriginales = JSON.parse(archivoOriginal);
            let datosParaModificar;
            
            req.on('data', (datos) => {
                datosParaModificar = JSON.parse(datos);
            })

            req.on('end', async () => {
                const messagesOriginal = objetosOriginales[id]
                const messagesActualizado = {...messagesOriginal, ...datosParaModificar}

                objetosOriginales[id] = messagesActualizado;
                await fs.writeFile('messages.json', JSON.stringify(objetosOriginales, null,2));
                res.statusCode = 200;
                res.write("Los datos han sido actualizados de forma exitosa");
                res.end();
            })
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el message');
        }
    }
    //delete messages
    if(pathname == '/messages' && req.method == 'DELETE'){
        try {
        const archivoOriginal = await fs.readFile('messages.json');
        const objetosOriginales = JSON.parse(archivoOriginal);
        const id = params.get('id');
        if (!objetosOriginales[id]) {
            res.statusCode = 404;
            res.end("messages no encontrado");
        }

        delete objetosOriginales[id];
        await fs.writeFile('messages.json', JSON.stringify(objetosOriginales, null, 2));
        res.statusCode = 200;
        res.write("Los datos han sido eliminados exitosamente");
        res.end('Ok');
        }
        catch {
            res.statusCode = 500;
            res.end('Error al eliminar el messages');
        }

    }

});


servidor.listen(9090, function(){
    console.log("Servidor iniciado en puerto 9090");
}); 

module.exports = {servidor};

//Para consultar en postman utlizar esta url
// localhost:9090/tickets
