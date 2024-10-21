//Importar módulos
const http = require('http');
const fs = require ('fs/promises');
const {v4: uuidv4} = require ('uuid');

//Crear servidor
const servidor = http.createServer (async (req,res) => {
    const { searchParams, pathname} = new URL(req.url, `https://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);
    console.log(pathname)

    if(pathname == '/animes' && req.method == 'GET'){
        //Leer archivo
        try{
            const Archivo = await fs.readFile('anime.json');
            res.statusCode = 200;
            res.write(Archivo);
            res.end('OK');
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al leer el archivo');
        }
  
    }

    

    if(pathname == '/animes' && req.method == 'POST'){
        try {
            const archivoOriginal = await fs.readFile('anime.json');
            const datosOriginales = JSON.parse(archivoOriginal);
            const id = uuidv4();
            let datosAnime;

            req.on('data', (data) => {
                datosAnime = JSON.parse(data);
                console.log(datosAnime);
            });

            req.on('end', async () => {
                datosOriginales[id] = datosAnime;
                await fs.writeFile('anime.json', JSON.stringify(datosOriginales, null,2));
                res.statusCode = 200;
                res.write("Anime agregado exitosamente");
                res.end()
            });
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el anime');
        }
    }

    if(pathname == '/animes' && req.method == 'PUT'){
        try {
            const id = params.get('id');
            const archivoOriginal = await fs.readFile('anime.json');
            const objetosOriginales = JSON.parse(archivoOriginal);
            let datosParaModificar;
            
            req.on('data', (datos) => {
                datosParaModificar = JSON.parse(datos);
            })

            req.on('end', async () => {
                const animeOriginal = objetosOriginales[id]
                const animeActualizado = {...animeOriginal, ...datosParaModificar}

                objetosOriginales[id] = animeActualizado;
                await fs.writeFile('anime.json', JSON.stringify(objetosOriginales, null,2));
                res.statusCode = 200;
                res.write("Los datos han sido actualizados de forma exitosa");
                res.end();
            })
        }
        catch (error) {
            res.statusCode = 500;
            res.end('Error al agregar el anime');
        }
    }

    if(pathname == '/animes' && req.method == 'DELETE'){
        try {
        const archivoOriginal = await fs.readFile('anime.json');
        const objetosOriginales = JSON.parse(archivoOriginal);
        const id = params.get('id');
        if (!objetosOriginales[id]) {
            res.statusCode = 404;
            res.end("Anime no encontrado");
        }

        delete objetosOriginales[id];
        await fs.writeFile('anime.json', JSON.stringify(objetosOriginales, null, 2));
        res.statusCode = 200;
        res.write("Los datos han sido eliminados exitosamente");
        res.end('Ok');
        }
        catch {
            res.statusCode = 500;
            res.end('Error al eliminar el anime');
        }

    }
    
});


servidor.listen(9090, function(){
    console.log("Servidor iniciado en puerto 9090");
}); 

module.exports = {servidor};

//Para consultar en postman utlizar esta url
// localhost:9090/animes
