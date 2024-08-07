
// Formulario

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    //Definir las constantes utilizando los ID del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const edad = parseInt(document.getElementById('edad').value.trim(), 10);
    const fecha = document.getElementById('fecha').value.trim();

    //Crear objeto
    let reserva = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        edad: edad,
        fechao: fecha
    };

    //Crear set: validador dentro del formulario
    let validador = {
        set: function(objeto, propiedad, valor) {
            if (propiedad === 'edad') {
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
            objeto[propiedad] = valor;
            return true;
        }
    };

    // Crear el proxy
    let reservaProxy = new Proxy(reserva, validador);
    console.log("Validador funciona");
    
    // Asignar los valores usando el proxy
    let formularioValido = true; 

    // Mostrar los resultados
        if (!validador.set(reservaProxy, 'edad', edad)) {
            formularioValido = false;
        }

        if (formularioValido) {
            alert('Formulario enviado con éxito.');
            console.log(reserva);
            console.log('Formulario enviado con éxito');
        } else {
            console.log('No se pudo enviar el formulario debido a errores de validación.');
        }
    
});
