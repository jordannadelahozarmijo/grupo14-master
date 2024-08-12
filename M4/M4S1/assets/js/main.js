//Evaluación modulo 4 sesión 1
/*document.getElementById('formulario').addEventListener('submit', function(event) {

    event.preventDefault();

    //Definir las constantes utilizando los ID del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const motivo = document.getElementById('motivo').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    // Ayuda a rastrear el estado de validación del formulario
    let formularioValido = true; 

    if (formularioValido) {
        alert(`DE: ${nombre} (${email}) \n - ASUNTO: ${motivo} \n -MENSAJE: \n ${mensaje}`);
        console.log('Formulario enviado con éxito');
            
        // Limpia el formulario
        document.getElementById('formulario').reset();
    } 
    else {
        console.log('No se pudo enviar el formulario debido a errores de validación.');
    }

});*/
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    // Crear objeto vacío para la contacto
    let contacto = {};

    // Crear set: validador dentro del formulario
    let validador = {
        set: function(objeto, propiedad, valor) {
            if (propiedad === 'email') {
                const emailValido = validarEmail(valor);
                if (!emailValido) {
                    console.log('El correo electrónico no es válido');
                    return false;
                }
            } else if (['nombre', 'apellido', 'motivo', 'mensaje'].includes(propiedad)) {
                if (valor.trim() === '') {
                    console.log(`${propiedad} es obligatorio`);
                    return false;
                }
            }
            // Definir el valor asociado a la propiedad
            objeto[propiedad] = valor;
            return true;
        }
    };

    // Crear el proxy: target y handler
    let contactoProxy = new Proxy(contacto, validador);

    // Recoger valores del formulario
    contactoProxy.nombre = document.getElementById('nombre').value.trim();
    contactoProxy.apellido = document.getElementById('apellido').value.trim();
    contactoProxy.email = document.getElementById('email').value.trim();
    contactoProxy.motivo = document.getElementById('motivo').value.trim();
    contactoProxy.mensaje = document.getElementById('mensaje').value.trim();

    // Si el objeto contacto tiene todos los valores, entonces el formulario es válido
    if (Object.keys(contacto).length === 5) {
        alert(`DE: ${contactoProxy.nombre} (${contactoProxy.email}) \n - ASUNTO: ${contactoProxy.motivo} \n -MENSAJE: \n ${contactoProxy.mensaje}`);
        console.log('Formulario enviado con éxito');
        
        // Limpia el formulario
        document.getElementById('formulario').reset();
    } else {
        console.log('No se pudo enviar el formulario debido a errores de validación.');
    }
});

// Función para validar formato de email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}