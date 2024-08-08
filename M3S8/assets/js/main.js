
// Formulario

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    //Definir las constantes utilizando los ID del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const edad = parseInt(document.getElementById('edad').value.trim(), 10);
    const fecha = document.getElementById('fecha').value.trim();

    //Crea objeto
    let reserva = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        edad: edad,
        fecha: fecha,
    };

    //Crea set: validador dentro del formulario
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
            //Definimos el valor asociado a la propiedad que estamos tratando de interceptar dentro del objeto
            objeto[propiedad] = valor;
            return true;
        }
    };

    // Crear el proxy: target y handler
    let reservaProxy = new Proxy(reserva, validador);
    console.log("Validador funciona");
    
    // Asignar los valores usando el proxy
    // Ayuda a rastrear el estado de validación del formulario
    let formularioValido = true; 

    // Mostrar los resultados
    if (!validador.set(reservaProxy, 'edad', edad)) {
        formularioValido = false;
        alert('Formulario no enviado, edad inválida');
    }

    if (formularioValido) {
        alert('Formulario enviado con éxito.');
        console.log(reserva);
        console.log('Formulario enviado con éxito');
            
        // Limpia el formulario
        document.getElementById('formulario').reset();
    } 
    
    else {
        console.log('No se pudo enviar el formulario debido a errores de validación.');
    }

});
