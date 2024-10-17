async function agregarJugador() {
    const nombre = prompt("Ingrese el nombre del jugador:", "Jugador desconocido");
    const posicion = prompt("Ingrese la posición del jugador:", "Entrenamiento");

    const response = await fetch('http://localhost:3000/jugadores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, posicion }),
    });

    const result = await response.json();
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerText = result.mensaje;
}

async function consultarJugador() {
    const id = prompt("Ingrese el ID del jugador:");
    const response = await fetch(`http://localhost:3000/jugadores/${id}`);

    if (response.ok) {
        const jugador = await response.json();
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').innerText = `Jugador encontrado: ${jugador.nombre}, Posición: ${jugador.posicion}`;
    } else {
        const result = await response.json();
        document.getElementById('result').style.display = 'block';
        document.getElementById('result').innerText = result.mensaje;
    }
}

async function listarJugadores() {
    const response = await fetch('http://localhost:3000/jugadores');
    const data = await response.json();
    const jugadores = data.jugadores;

    let resultText = "Jugadores:\n";
    jugadores.forEach(jugador => {
        resultText += `ID: ${jugador.id}, Nombre: ${jugador.nombre}, Posición: ${jugador.posicion}\n`;
    });

    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerText = resultText;
}