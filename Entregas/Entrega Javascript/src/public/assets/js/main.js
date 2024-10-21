const API_URL_PRODUCTOS = 'http://localhost:3000/productos';

//función para leer productos
async function leerProductos() {
    //Realiza una solicitud a la URL especificada en API_URL para obtener datos
    const response = await fetch(API_URL_PRODUCTOS);
    //Convierte la respuesta en formato JSON.
    const productos = await response.json();
    //Toma los datos JSON y los muestra en un elemento del DOM con el ID lista-productos, formateándolos de manera legible.
    console.log(JSON.stringify(productos, null, 2))
    //recorrer arreglo productos e insertar una fila a una tabla
    productos.response.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>`
        document.getElementById('tabla-productos').append(fila);
    });
}

//Mostrar datos en pantalla
document.getElementById('read-btn').addEventListener('click', async () => {
    console.log('Lectura de productos correctamente');
    leerProductos();
});

//Función para ingresar productos
document.getElementById('create-btn').addEventListener('click', async () => {
    console.log("Boton presionado");
    const nombre = prompt('Ingrese el nombre del producto:');
    const precio = prompt('Ingrese el precio del producto:');
    const cantidad = prompt('Ingrese la cantidad del producto:');

    if (nombre && precio && cantidad) {
        const response = await fetch(API_URL_PRODUCTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, cantidad})
        });

        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            const result = await response.json(); // Convierte la respuesta a JSON
            alert(result.message); // Muestra el mensaje de éxito
            leerProductos(); // Actualiza la lista después de agregar
        } else {
            // Manejo de errores
            const errorResult = await response.json();
            alert(`Error: ${errorResult.message}`);
        }
        leerProductos(); // Actualizar la lista después de agregar
    }
});