/*
Dadas las demandas de salud para mantener el orden en el aforo de personas en su interior, un bar local
ofrece a sus clientes una fecha de reserva que pueden elegir en línea. El formulario para hacerlo es el
siguiente:


Como en cualquier establecimiento que vende alcohol, a este bar no pueden acceder personas menores
de la edad legal para consumirlo, por lo que ningún menor de 18 años puede hacer una reserva en línea.
Tu tarea es crear este formulario, e implementar la siguiente lógica: una vez que un usuario lo ha
completado, y ha pulsado “enviar”, tu código tiene que almacenar todos los valores del formulario en un
objeto "reserva". El desafío aquí es que debes utilizar un Proxy con su manejador para intervenir; pues si la
edad es inferior a 18 años, tu proxy debe mostrar una alerta que indique lo siguiente:


Pero si la edad ingresada es mayor a 18 años, entonces tu Proxy debe manejar estos valores y realizar el
almacenamiento de datos en el objeto “reserva”, el cual se mostrará por consola para comprobar el
correcto funcionamiento de la lógica.


 */

//leemos el formulario


document.getElementById('formularioReservaciones').addEventListener('submit', function(event) {

    event.preventDefault();

    const primerNombre = document.getElementById('nombrePersona').value.trim();
    const apellidoPaterno = document.getElementById('apellidoPersona').value.trim();
    const email = document.getElementById('email').value.trim();
    const edadPersona = parseInt(document.getElementById('edadPersona').value.trim(), 10);
    const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();

    let reserva = {
        primerNombre: primerNombre,
        apellidoPaterno: apellidoPaterno,
        email: email,
        edadPersona: parseInt(edadPersona, 10),
        fechaNacimiento: fechaNacimiento
    };

    let validador = {
        set: function(obj, propiedad, valor) {
            if (propiedad === 'edadPersona') {
                if (typeof valor !== 'number' || Number.isNaN(valor)) {
                    console.log('Edad debe ser un número');
                    return false;
                }
                if (valor < 0) {
                    console.log('Edad debe ser un número positivo');
                    return false;
                }
                if (valor < 18) {
                    alert('Debes ser mayor de edad para crear una reservación');
                    return false;
                }
            }
            obj[propiedad] = valor;
            return true;
        }
    };

    // Crear el proxy
    let reservaProxy = new Proxy(reserva, validador);
    console.log("paso el validador");
    // Asignar los valores usando el proxy
    let formularioValido = true;

    if (!validador.set(reservaProxy, 'edadPersona', edadPersona)) {
        formularioValido = false;
    }

    if (formularioValido) {
        alert('Formulario enviado con éxito.');
        // Aquí puedes enviar el formulario o realizar otras acciones necesarias
        console.log(reserva);
    } else {
        console.log('No se pudo enviar el formulario debido a errores de validación.');
    }
});
