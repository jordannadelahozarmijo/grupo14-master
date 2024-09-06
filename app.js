
/*Importar http*/
const http = require ('http');

const port = 3000;

/*Se definen las constantes del servidor, este servidor mandará una única respuesta*/
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type':'text/plain; charset=utf8'});
    res.end('¡Hola mundo NODE JS!');
})

/*Armar servidor e inicializando, que puerto escucha y cuál va a ser su mensaje de bienvenida*/
server.listen(port, ()=> {
    console.log('Servidor escuchando http://localhost:3000');
} )


/*Ejecutar y hacer una petición a nuestro servidor con node*/ 