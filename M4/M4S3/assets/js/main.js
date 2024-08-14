//Parte 1 Mejorar Pizza
    //Definir la clase pizza con un array vacío
    
    //Utilizar el valor de los radio button e ingresarlos en el array de ingredientes disponibles

    //Crear una función de recorrer array para contar los ingredientes extras
        // i>2 * 800


//Parte 2 Resumen del pedido

    //utilizar el valor por defecto en PIZZA XL

    //Utilizar valor de ingredientes extras

    //utilizar el valor por defecto 1000 al seleccionar el input de propinas
        //Enviar alert de Propina enviada / Propina no enviada

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
    // Definir constructor con parámetros adicionales y parámetros por defecto
    constructor(total, propina, precio=15000,ingredientes) {
        // Llamar al constructor de la clase padre con parámetros específicos
        super(total, propina);
        // Asignar valor a la propiedad precio
        this.precio = precio;
        this.ingredientes = ingredientes;
    }

    describir() {
        return `Total: ${this.total}, Propina: ${this.propina}, Precio: ${this.precio}, Ingredientes ${this.ingredientes}.`;
    }
}

