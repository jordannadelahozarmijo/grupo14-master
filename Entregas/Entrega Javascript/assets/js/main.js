const API_URL_PRODUCTOS = 'http://localhost:3000/productos';

//función para leer productos
async function leerProductos() {
    //Realiza una solicitud a la URL especificada en API_URL para obtener datos
    const response = await fetch(API_URL_PRODUCTOS);
    //Convierte la respuesta en formato JSON.
    const productos = await response.json();
    //Toma los datos JSON y los muestra en un elemento del DOM con el ID lista-productos, formateándolos de manera legible.
    document.getElementById('lista-productos').textContent = JSON.stringify(productos, null, 2);
}

//Mostrar datos en pantalla
document.getElementById('read-btn').addEventListener('click', async () => {
    console.log('Lectura de productos correctamente');
    leerProductos();
    mostrarProductos();
});

//Función para ingresar productos
document.getElementById('create-btn').addEventListener('click', async () => {
    console.log("Boton presionado");
    const nombre = prompt('Ingrese el nombre del producto:');
    const marca = prompt('Ingrese la marca del producto:');
    const precio = prompt('Ingrese el precio del producto:');
    const cantidad = prompt('Ingrese la cantidad del producto:');

    if (nombre && marca && precio && cantidad) {
        const response = await fetch(API_URL_PRODUCTOS, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, marca, precio, cantidad })
        });

        const result = await response.status(200).json({
            error:  false,
            codigo:  200,
            message: 'Producto creado con éxito' 
        });
        alert(result.mensaje);
        leerProductos(); // Actualizar la lista después de agregar
    }
});