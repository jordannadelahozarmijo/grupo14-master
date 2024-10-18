document.addEventListener('DOMContentLoaded', function() {
    const personajes = (id) => {
        return fetch(`https://swapi.dev/api/people/${id}/`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`Error al obtener el personaje con ID ${id}`);
                }
            });
    };

    const Rangos = (cardId, range) => {
        const card = document.getElementById(cardId);
        const detalles = document.createElement('div');
        detalles.className = 'details';
        card.appendChild(detalles);
        const parametros = range.map(id => personajes(id));

        Promise.all(parametros)
            .then(contenido => {
                contenido.forEach(personaje => {
                    const descripcion = document.createElement('p');
                    descripcion.className = 'card';
                    descripcion.textContent = `
                        Nombre: ${personaje.name},\n 
                        Estatura: ${personaje.height}cm,\n 
                        Peso: ${personaje.mass}kg`;
                    detalles.appendChild(descripcion);
                });
            })
            .catch(error => {
                console.error(error);
                detalles.textContent = 'Error al cargar los personajes';
            });
    };

    // Rango 1: Personajes populares (ID 1-5)
    Rangos('Rango1', [1, 2, 3, 4, 5]);

    // Rango 2: Personajes secundarios (ID 6-12)
    Rangos('Rango2', [6, 7, 8, 9, 10, 11, 12]);

    // Rango 3: Personajes significativos (ID 13-17)
    Rangos('Rango3', [13, 14, 15, 16]);
});