//Función para Agregar Jugadores

var jugadores = [];
// Symbol para identificar a los jugadores
var simboloJugador = Symbol('id');

// Clase Jugador
function Jugador(nombre) {
    // Nombre del jugador
    this.nombre = nombre;
    this.adivinanza = null;
    // ID del jugador usando Symbol
    this[simboloJugador] = 'jugador_' + (jugadores.length + 1);
}
// Proxy para validar y manejar los jugadores
var manejadorJugador = {
    set: function (target, prop, value) {
        // Validar y establecer el nombre del jugador
        if (prop === 'nombre') {
            if (typeof value === 'string' && value.trim().length > 0) {
                target[prop] = value.trim();
                console.log('nombre Válido');
            } else {
                console.log('Nombre inválido');
                return false; // Prevenir la asignación de un nombre inválido
            }
        } else {
            target[prop] = value; // Asignar otras propiedades sin validación
        }
        return true; // Confirmar que la operación fue exitosa
    },
    get: function (target, prop) {
        // Obtener el ID del jugador usando Symbol
        if (prop === 'id') {
            return target[simboloJugador];
        }
        return target[prop];
    }
};
// Función para agregar un jugador
function agregarJugador() {

    for (let i = 0; i < 2; i++) {
        var nombreJugador = prompt("Ingrese el nombre del jugador:");
        if (nombreJugador) {
            // Crear un nuevo jugador
            var jugador = new Jugador(nombreJugador);
            // Crear un proxy para el jugador
            var proxyJugador = new Proxy(jugador, manejadorJugador);
            // Agregar el jugador al arreglo de jugadores
            jugadores.push(proxyJugador);
            console.log('Jugador agregado: ' + proxyJugador.nombre + ' (' + proxyJugador.id + ')');
        }
    }
}

//--------------------------------------------------------------------------------------------------

// Generar el Número Aleatorio

function numeroRandom() {
    //Retorna un numero aleatorio
    return Math.floor(Math.random() * 100) + 1;
}

console.log(numeroRandom());

//--------------------------------------------------------------------------------------------------


function adivinarNumero(numeroAleatorio) {
    //Función para Adivinar el numero
    var numeroAleatorio = numeroRandom();

    // Mostrar el número aleatorio en el párrafo con id "resultado"
    document.getElementById('resultado').textContent = "El número aleatorio es: " + numeroAleatorio;

    // Limpiar la información previa de jugadores
    var jugadoresInfo = document.getElementById('jugadores-info');
    jugadoresInfo.innerHTML = "";

    // Solicitar la adivinanza a cada jugador
    jugadores.forEach(jugador => {
        const adivinanza = parseInt(prompt(`${jugador.nombre}, ingrese su adivinanza:`), 10);
        jugador.adivinanza = adivinanza;
        console.log("jugador");
        console.log(jugador);

        // Crear un nuevo párrafo para mostrar la información del jugador
        var jugadorInfo = document.createElement('p');
        jugadorInfo.textContent = `${jugador.nombre} ingresó el número: ${jugador.adivinanza}`;
        jugadoresInfo.appendChild(jugadorInfo);

    });
    //validar qeu existan a lo menos 2 jugadores antes de ejecutar este bloque
    // Comprobar si alguno de los jugadores adivino el numero
    
    console.log(jugadores);
    if (jugadores[0].adivinanza === numeroAleatorio) {
        alert("Jugador 1 gana");
    }
    else if (jugadores[1].adivinanza === numeroAleatorio) {
        alert("Jugador 2 gana");
    }
    else {
        // Calcular la diferencia entre las adivinanzas y el numero aleatorio
        console.log("jugadores");
        console.log(jugadores);
        let diferencia1 = parseInt(jugadores[0].adivinanza) - parseInt(numeroAleatorio);
        let diferencia2 = parseInt(jugadores[1].adivinanza) - parseInt(numeroAleatorio);
        console.log(diferencia1)
        console.log(diferencia2)


        // Determina quien estuvo mas cerca
        if (diferencia1 < diferencia2) {
            alert("Jugador 1 estuvo más cerca y gana");
        }
        else if (diferencia2 < diferencia1) {
            alert("Jugador 2 estuvo más cerca y gana");

        } else {
            alert("Empate");
        }

    }
}


