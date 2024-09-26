
//Importar módulos
const http = require('http');
const fs = require ('fs/promises');
const {v4: uuidv4} = require ('uuid'); //unique identify

//Crear servidor
http.createServer (async (req,res) => {
    //consulta la url de la petición
    const { searchParams, pathname} = new URL(req.url, `https://${req.headers.host}`);
    //sufijo del parámetro
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
        let datosComic;

        //recibir el objeto data del body
        req.on('data', (data) => {
            datosComic = JSON.parse(data);
            console.log(datosComic);
        })
        //modifica el objeto 
        req.on('end', async () => {
            datosOriginales[id] = datosComic;
            await fs.writeFile('comics.txt', JSON.stringify(datosOriginales, null,2));
            res.write("Comic agregado exitozamente");
            res.end()
        })
    }

    if(pathname == '/comics' && req.method == 'PUT'){
    }

    if(pathname == '/comics' && req.method == 'DELETE'){
    }


})



.listen(8000, function(){
    console.log("Servidor iniciado en puerto 8000");
}); 

