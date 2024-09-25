
//Importar módulos
const http = require('http');
const fs = require ('fs/promises');
const {v4: uuidv4} = require ('uuid');

//Crear servidor
http.createServer (async (req,res) => {
    const { searchParams, pathname} = new URL(req.url, `https://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);
    console.log(pathname)

    if(pathname == '/comics' && req.method == 'GET'){
        //Leer archivo
        const leerArchivo = await fs.readFile('comics.txt');
        res.write(leerArchivo);
        res.end();
    }

    if(pathname == '/comics' && req.method == 'POST'){
        const archivoOriginal = await fs.readFile('comics.txt');
        const datosOriginales = JSON.parse(archivoOriginal);
        const id = uuidv4();

        req.on('data', (data) => {
            const datosComic = JSON.parse(data);
            console.log(datosComic);
        }
        
        ) 
    }

    if(pathname == '/comics' && req.method == 'PUT'){
    }

    if(pathname == '/comics' && req.method == 'DELETE'){
    }


})



.listen(3000, function(){
    console.log("Servidor iniciado en puerto 3000");
}); 

