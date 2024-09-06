// Definición de variables
var contadorDeTiempo = 0;

// Definición de función callback
function mostrarContador () {
    contadorDeTiempo++;
    console.log('Este es el segundo:' + contadorDeTiempo);
}


//Declaración de intervalo de tiempo
setInterval (mostrarContador, 1000);