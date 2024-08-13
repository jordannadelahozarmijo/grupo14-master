//Formulario

document.getElementById('formulario').addEventListener('submit', (event) => {
    event.preventDefault();

    // Expresión regular para utilizar en la validación del formato email
    const simbolos = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Función para validar si el email cumple con el patrón definido por una expresión regular 
    const validarEmail = email => simbolos.test(email);

    // Crear clase vacía para contacto
    var contacto = {};

    // Crear set: validador dentro del formulario
    let validador = {
        set: (objeto, propiedad, valor) => {
            //Constantes de las propiedades utilizadas en el formulario
            const campoEmail = propiedad === 'email';
            const camposObligatorios = ['nombre', 'apellido', 'motivo', 'mensaje'].includes(propiedad);
    
            if (campoEmail && !validarEmail(valor)) {
                console.log('El correo electrónico no es válido');
                return false;
            }
            
            if (camposObligatorios && valor.trim() === '') {
                console.log(`${propiedad} es obligatorio`);
                return false;
            }
    
            // asignar valores al objeto
            objeto[propiedad] = valor;
            return true;
        }
    };

    // Crear el proxy: target y handler
    let proxy = new Proxy(contacto, validador);

    // Recoger valores del formulario para cumplir las condiciones y mostrar el alert
    proxy.nombre = document.getElementById('nombre').value.trim();
    proxy.apellido = document.getElementById('apellido').value.trim();
    proxy.email = document.getElementById('email').value.trim();
    proxy.motivo = document.getElementById('motivo').value.trim();
    proxy.mensaje = document.getElementById('mensaje').value.trim();
    

    // Keys ayuda a verificar si el objeto contacto tiene todos los valores, de ser así entonces el formulario es válido
    if (Object.keys(contacto).length === 5) {

        alert(`DE: ${proxy.nombre} (${proxy.email}) \n - ASUNTO: ${proxy.motivo} \n -MENSAJE: \n ${proxy.mensaje}`);
        console.log('Formulario enviado con éxito'); 

        // Limpia el formulario
        document.getElementById('formulario').reset();
    } 
    else {
        console.log('No se pudo enviar el formulario debido a errores de validación.');
    }
});
