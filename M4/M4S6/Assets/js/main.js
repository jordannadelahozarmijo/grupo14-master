//Ejemplo funcion de callback--------

/* function saludo(nombre) {
    alert(`Hola ${nombre}`);
}

function procesaEntrada(callback) {
    var nombre = prompt('Ingresa tu nombre por favorM.');
    callback(nombre);
}
procesaEntrada(saludo); */

//otra forma de hacerla-----

/* function procesaEntrada(callback) {
    var nombre = prompt('Ingresa tu nombre por favor.');
    callback(nombre)
   }
// Pasando el callback completo como parámetro
procesaEntrada(function (nombre) {
alert(`Hola ${nombre}`);
}); */

// Otra forma usando funcion de flecha-----------

/* function procesaEntrada(callback) {
    var nombre = prompt('Ingresa tu nombre por favor.');
    callback(nombre)
}
// Usando arrow functions.
procesaEntrada((nombre) => {
    alert(`Hola ${nombre}`);
}); */

//Funciones Asincronas-------------------------------

/* let primeraAccion = () => console.log("primero");
let segundaAccion = () => console.log("segundo");

primeraAccion();
segundaAccion(); */

//usando setTimeOut

/* let primeraAccion = () => console.log("primero");
let segundaAccion = () => console.log("segundo");
// pasamos primeraAccion como callback
setTimeout(primeraAccion,3000)
segundaAccion(); */

//usamos setInterval

function mostrarHora() {
    let d = new Date();
   
   document.getElementById("reloj").innerHTML=`${d.getHours()}:${d.getMinutes(
   )}:${d.getSeconds()}`;
   }
   setInterval(mostrarHora, 1000); 


//En el siguiente ejemplo, usaremos un callback para mostrar un recurso de un archivo local, el cual simulará 
//cómo lo haría un programa al interactuar con un servidor o al esperar un archivo.

// Definimos nuestro callback
function mostrar(algo) {
    document.getElementById("aqui").innerHTML = algo;
}
// Metodo para consumir un recurso externo
function consumirArchivo(myCallback) {
    // Se inicializa el objeto XMLHttpRequest
    let req = new XMLHttpRequest();
    // Se configura una solicitud de tipo GET
    req.open('GET', "referencia.html");
    // En esta funcion se carga los datos del doc.
    req.onload = function () {
        // Si existe el recurso, usar el contenido.
        if (req.status == 200) {
            myCallback(this.responseText);
        } else {
            // Si no existe, mostrar un error.
            myCallback("Error: " + req.status);
        }
    }
    // Inicializa el request.
    req.send();
   }
consumirArchivo(mostrar);