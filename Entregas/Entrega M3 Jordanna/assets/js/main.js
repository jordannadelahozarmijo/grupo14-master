//  En este archivo se encuentran las funciones que permiten al carro lo siguiente:
//  - Almacenar productos
//  - Agregar productos al carro
//  - Calcular la compra total
//  - Mostrar detalles de la compra
//  - Finalizar compra


// Crear template para Productos
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

// Crear Carrito, agregar productos, mostrar detalle, calcular total y finalizar compra
class Carrito {
    constructor() {
        this.productos = [];
        console.log(this.productos);
    }
    //Agregar productos al carrito
    agregarProducto(producto) {
        //Agregar producto al final del arreglo
        this.productos.push(producto);
        this.mostrarDetalles();
        console.log(producto.nombre);
    }

    mostrarDetalles() {
        const detallesDiv = document.getElementById('carritoDetalles');
        //Limpiar input antes de agregar detalles
        detallesDiv.innerHTML = '';
        
        //Index de productos agregados en el detalle del carro
        this.productos.forEach((producto, index) => {
            const p = document.createElement('p');
            p.textContent = `${index + 1}. ${producto.nombre}: $${producto.precio}`;
            detallesDiv.appendChild(p);
        });

        //Muestra el total de los productos seleccionados
        const totalP = document.getElementById('totalProducto');
        totalP.innerHTML = `El total es: $${this.calcularTotal()}`;
        
    }

    //Calcular el total antes de finalizar la compra 
    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    //Finalizar compra
    finalizarCompra() {
        const total = this.calcularTotal();
            alert(`Total a pagar: $${total}\n ¡Gracias por tu compra!`);
            console.log(`Total a pagar: $${total}\n ¡Gracias por tu compra!`);
        this.productos = [];
        this.mostrarDetalles();
    }
}

// Crear listado de productos disponibles
const productosDisponibles = [
    new Producto("Peluche", 1000),
    new Producto("Polera", 1500),
    new Producto("Polera", 2500),
    new Producto("Polerón", 3000),
    new Producto("Zapatillas", 3500),
    new Producto("Lentes", 4000),
];

// Mostrar productos disponibles
function mostrarProductosDisponibles() {
        const productosDiv = document.getElementById('productosDisponibles');
        productosDisponibles.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto');
            div.innerHTML = `${producto.nombre} $${producto.precio}`;
            productosDiv.appendChild(div);
        });
    }

    // Buscar producto por nombre
    function buscarProducto(nombre) {
        return productosDisponibles.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
    }

    // Instanciar objeto carrito
    const carrito = new Carrito();

    // Agregar productos disponibles al carrito
    function agregarProducto(){
        const nombreProducto = document.getElementById('productoNombre').value;
        const producto = buscarProducto(nombreProducto);
        if (producto) {
            carrito.agregarProducto(producto);
            console.log("Limpiar input"); 
            // Limpiar input
            document.getElementById('productoNombre').value = '';
        } 
        else {
            alert("Producto no encontrado. Debe ingresar producto del listado.");
        }
};

// Finalizar compra
function finalizarCompra () {
    const finalizar = document.getElementById('finalizarCompra');
    if (carrito.productos.length > 0) {
        carrito.finalizarCompra();
        console.log('Carrito tiene productos');
    } else {
        alert("No hay productos en el carro. Por favor, ingrese un producto válido del listado.");
        console.log('Carrito no tiene productos');
    }
}

//Inicializa la lista de productos disponibles al cargar la página
mostrarProductosDisponibles();

