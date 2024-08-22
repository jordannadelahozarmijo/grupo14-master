document.getElementById('Buscar').addEventListener('click', function() {
    const artista = document.getElementById('Artista').value.trim();
    const cancion = document.getElementById('Cancion').value.trim();
    
    if (artista && cancion) {
        // Reemplaza espacios por %20 para una URL válida
        const artistaURL = encodeURIComponent(artista);
        const cancionURL = encodeURIComponent(cancion);

        // Construye la URL para la API
        const url = `https://api.lyrics.ovh/v1/${artistaURL}/${cancionURL}`;

        // Realiza la petición fetch
        fetch(url)
            .then(res => {
                if (res.ok) {
                    console.log('Éxito');
                    return res.json();
                } else {
                    console.log('Falló');
                    throw new Error('Error al obtener la letra');
                }
            })
            .then(data => {           
                if (data.lyrics) {
                    const lyricsContainer = document.getElementById("Lyrics");
                    lyricsContainer.innerHTML = "";

                    // Divide la letra por líneas
                    const lines = data.lyrics.split('\n');

                    // Filtra las líneas vacías y las que contienen "Paroles de la chanson"
                    const filteredLines = lines.filter(line => {
                        return line.trim() !== "" && !line.toLowerCase().includes("paroles");
                    });

                    // Muestra las líneas filtradas
                    filteredLines.forEach(line => {
                        const lineElement = document.createElement('p');
                        lineElement.textContent = line;
                        lyricsContainer.appendChild(lineElement);
                    });
                } else {
                    console.log("Letra no encontrada");
                }
            })
            .catch(error => {
                console.error(error);
                alert('No se pudo obtener la letra. Verifica que el artista y la canción sean correctos.');
            });
    } else {
        alert('Por favor, ingresa el nombre del artista y la canción.');
    }
});
// Evento para borrar la letra cuando el usuario empieza a escribir en cualquiera de los campos
document.getElementById('Artista').addEventListener('input', function() {
    document.getElementById("Lyrics").innerHTML = "";
});

document.getElementById('Cancion').addEventListener('input', function() {
    document.getElementById("Lyrics").innerHTML = "";
});