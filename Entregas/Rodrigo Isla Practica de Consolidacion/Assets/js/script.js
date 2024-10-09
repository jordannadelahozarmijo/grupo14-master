class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }

    // Método para obtener el precio formateado
    getPrecioFormateado() {
        return this.precio.toLocaleString('es-CL');
    }
}

class Carrito {
    constructor() {
        this.productos = [];
    }

    agregarProducto(producto) {
        this.productos.push(producto);
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
    }

    calcularTotal() {
        return this.productos.reduce((total, producto) => total + producto.precio, 0);
    }

    mostrarDetalles() {
        return this.productos.map(producto => `${producto.nombre} - $${producto.getPrecioFormateado()}`).join("\n");
    }

    finalizarCompra() {
        alert(`Total de la compra: $${this.calcularTotal().toLocaleString('es-CL')}`);
        this.productos = [];
    }
}

const productosDisponibles = [
    new Producto("Manzana", 250),
    new Producto("Pan", 2_000),
    new Producto("Leche", 1_800),
    new Producto("Queso", 2_270)
];

const carrito = new Carrito();

$(document).ready(function() {
    productosDisponibles.forEach((producto, index) => {
        $('#product-list').append(`<li class="list-group-item product" data-index="${index}">${producto.nombre} - $${producto.getPrecioFormateado()} <button class="btn btn-primary btn-sm float-right add-to-cart">Agregar</button></li>`);
    });

    $(document).on('click', '.add-to-cart', function() {
        const index = $(this).parent().data('index');
        const producto = productosDisponibles[index];
        carrito.agregarProducto(producto);
        actualizarCarrito();
    });

    $(document).on('click', '.remove-from-cart', function() {
        const index = $(this).parent().data('index');
        carrito.eliminarProducto(index);
        actualizarCarrito();
    });

    $('#finalize').click(function() {
        carrito.finalizarCompra();
        actualizarCarrito();
    });

    function actualizarCarrito() {
        $('#cart-list').empty();
        carrito.productos.forEach((producto, index) => {
            $('#cart-list').append(`<li class="list-group-item" data-index="${index}">${producto.nombre} - $${producto.getPrecioFormateado()} <button class="btn btn-danger btn-sm float-right remove-from-cart">Eliminar</button></li>`);
        });
        $('#total').text(carrito.calcularTotal().toLocaleString('es-CL'));
    }
});
