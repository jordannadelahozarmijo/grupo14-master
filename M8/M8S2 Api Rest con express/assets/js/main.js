const API_URL = 'http://localhost:3000/jugadores';

// Función para crear un nuevo jugador
document.getElementById('create-btn').addEventListener('click', async () => {
    console.log("Boton presionado");
    const nombre = prompt('Ingrese el nombre del jugador:');
    const posicion = prompt('Ingrese la posición del jugador:');

    if (nombre && posicion) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, posicion })
        });

        const result = await response.json();
        alert(result.mensaje);
        leerJugadores(); // Actualizar la lista después de agregar
    }
});

// Función para leer todos los jugadores
document.getElementById('read-btn').addEventListener('click', leerJugadores);

async function leerJugadores() {
    const response = await fetch(API_URL);
    const jugadores = await response.json();
    document.getElementById('jugadores-list').textContent = JSON.stringify(jugadores, null, 2);
}

// Función para actualizar un jugador
document.getElementById('update-btn').addEventListener('click', async () => {
    const id = prompt('Ingrese el ID del jugador a actualizar:');
    const nombre = prompt('Ingrese el nuevo nombre del jugador:');
    const posicion = prompt('Ingrese la nueva posición del jugador:');

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, posicion })
    });

    const result = await response.json();
    alert(result.mensaje);
    leerJugadores(); // Actualizar la lista después de actualizar
});

// Función para eliminar un jugador
document.getElementById('delete-btn').addEventListener('click', async () => {
    const id = prompt('Ingrese el ID del jugador a eliminar:');

    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();
    alert(result.mensaje);
    leerJugadores(); // Actualizar la lista después de eliminar
});