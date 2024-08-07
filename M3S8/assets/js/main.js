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

const primerNombre = '';
const ApellidoPaterno = '';
const email = '';
const edadPersona = '';
const fechaNacimiento = '';


document.getElementById('formularioReservaciones').addEventListener('submit', function(event) {
    event.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error').forEach(function(errorElement) {
        errorElement.textContent = '';
    });

    // Validate form
    let formularioValidoBooleano = true;

    primerNombre = document.getElementById('nombrePersona').value.trim();
    ApellidoPaterno = document.getElementById('apellidoPersona').value.trim();
    email = document.getElementById('email').value.trim();
    edadPersona = document.getElementById('edadPersona').value.trim();
    fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();

    /*
    if (!primerNombre) {
        document.getElementById('nombrePersonaError').textContent = 'El nombre es requerido.';
        formularioValidoBooleano = false;
    }
    if (!ApellidoPaterno) {
        document.getElementById('apellidoPersonaError').textContent = 'El apellido es requerido.';
        formularioValidoBooleano = false;
    }
    if (!email) {
        document.getElementById('emailError').textContent = 'El correo electrónico es requerido.';
        formularioValidoBooleano = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('emailError').textContent = 'El correo electrónico no es válido.';
        formularioValidoBooleano = false;
    }
    if (!edadPersona || edadPersona <= 0) {
        document.getElementById('edadPersonaError').textContent = 'La edad debe ser un número positivo.';
        formularioValidoBooleano = false;
    }
    if (!fechaNacimiento) {
        document.getElementById('fechaNacimientoError').textContent = 'La fecha es requerida.';
        formularioValidoBooleano = false;
    }

    // Submit form if valid
    if (formularioValidoBooleano) {
        alert('Formulario enviado con éxito.');

        //  this.submit();  
    }
    */

});

console.log(primerNombre);