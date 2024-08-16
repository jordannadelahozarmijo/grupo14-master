//Parte 1 Mejorar Pizza
// Definir clase Pedido
class Pedido {
    constructor(total, propina = 1000) {
        this.total = total;
        this.propina = propina;
    }

    describir() {
        return `Total: ${this.total}, Propina: ${this.propina}`;
    }
}

// Definir clase Pizza que extiende de Pedido
class Pizza extends Pedido {
     //Definir la clase pizza con un array vacío
    //Crear una función de recorrer array para contar los ingredientes extras
    constructor(total, propina, precio = 15000, ingredientes = []) {
        super(total, propina);
        this.precio = precio;
        this.ingredientes = ingredientes;
    }

    calcularExtras() {
        // Si hay más de 3 ingredientes seleccionados, los extras cuestan 800 cada uno
        const extraCount = this.ingredientes.length > 3 ? this.ingredientes.length - 3 : 0;
        console.log(extraCount);
        return extraCount*800;

    }

    calcularTotal() {
        let extras = this.calcularExtras();
        this.total = this.precio + extras;
        console.log(this.calcularExtras());
        return this.total + this.propina;
    }

    describir() {
        let extras = this.calcularExtras();
        let total = this.calcularTotal();
        console.log(extras);
        return `
        Precio pizza XL: ${this.precio}
        Ingredientes Extras: ${extras}
        Propina: ${this.propina} 
        Precio total: ${total}`;
    }
}

//Parte 2 Resumen del pedido

/* // Función para actualizar el resumen del pedido
function actualizarResumen() {
    //Utilizar valor de ingredientes extras
    const ingredientesSeleccionados = [];
    const checkboxes = document.querySelectorAll('.form-check-input');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            ingredientesSeleccionados.push(checkbox.value);
        }
    });

    const pizza = new Pizza(0, 1000, 15000, ingredientesSeleccionados);

    //Utilizar el valor de los radio button e ingresarlos en el array de ingredientes disponibles
    // Mostrar ingredientes seleccionados, 
    document.getElementById('ingredientes_seleccionados').innerText = ingredientesSeleccionados.slice(0, 3).join(', ');
    document.getElementById('ingredientes_extras').innerText = ingredientesSeleccionados.slice(3).join(', ');

    // Actualizar el resumen del pedido
    const totalElementos = document.querySelectorAll('.list-group-item');
    totalElementos[0].querySelector('.der').innerText = `$${pizza.precio}`;
    totalElementos[1].querySelector('.der').innerText = `$${pizza.calcularExtras()}`;
    totalElementos[2].querySelector('.der').innerText = `$${pizza.propina}`;


}

// Manejar evento de ingresar propina
document.querySelector('.btn-dark').addEventListener('click', function () {
    const propinaInput = document.querySelector('.input-group-text').value;
    //utilizar el valor por defecto 1000 al seleccionar el input de propinas
    const propina = propinaInput ? parseInt(propinaInput) : 1000;

    //utilizar el valor por defecto en PIZZA XL
    pizza.calcularTotal();

    //Enviar alert de Propina enviada / Propina no enviada
    alert(`Pedido enviado. ${pizza.describir()}`);
}); */

// Declarar la pizza fuera de las funciones para que sea accesible globalmente
let pizza;

// Función para actualizar el resumen del pedido
function actualizarResumen() {
    // Utilizar valor de ingredientes extras
    const ingredientesSeleccionados = [];
    const checkboxes = document.querySelectorAll('.form-check-input');

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            ingredientesSeleccionados.push(checkbox.value);
        }
    });

    // Si la pizza ya está creada, actualizar sus propiedades, de lo contrario, crear una nueva
    if (pizza) {
        pizza.ingredientes = ingredientesSeleccionados;
    } else {
        pizza = new Pizza(0, 1000, 15000, ingredientesSeleccionados);
    }

    // Mostrar ingredientes seleccionados
    document.getElementById('ingredientes_seleccionados').innerText = ingredientesSeleccionados.slice(0, 3).join(', ');
    document.getElementById('ingredientes_extras').innerText = ingredientesSeleccionados.slice(3).join(', ');

    // Actualizar el resumen del pedido
    const totalElementos = document.querySelectorAll('.list-group-item');
    totalElementos[0].querySelector('.der').innerText = `$${pizza.precio}`;
    totalElementos[1].querySelector('.der').innerText = `$${pizza.calcularExtras()}`;
    totalElementos[2].querySelector('.der').innerText = `$${pizza.propina}`;
}

// Manejar evento de ingresar propina
document.querySelector('.btn-dark').addEventListener('click', function () {
    const propinaInput = document.querySelector('.input-group-text').value;
    const propina = propinaInput ? parseInt(propinaInput) : 1000;

    // Actualizar la propina en la instancia de pizza
    pizza.propina = propina;

    // Calcular el total con la nueva propina
    pizza.calcularTotal();

    // Enviar alert con la descripción del pedido
    alert(`Pedido enviado. ${pizza.describir()}`);
});

// Agregar listeners a los checkboxes
const checkboxes = document.querySelectorAll('.form-check-input');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', actualizarResumen);
});

// Actualizar el resumen al cargar la página
document.addEventListener('DOMContentLoaded', actualizarResumen);


