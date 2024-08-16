//Definimos los datos que va a contener el objeto

const persona = {
    'nombre': 'Fernanda',
    'direccion': 'Avenida Central',
    'edad': 43,
    'hobby': 'pintar',
    'oficio': 'desarrolladora Front End'
}

const empleado = {
    'nombre': 'Rodrigo',
    'direccion': 'Pasaje Alba 324',
    'edad': 32,
    'departamento': {
        'nombre': 'Ventas',
        'turno': 'Mañana',
        'direccionCasa': {
            'ciudad': 'Punta Arenas',
            'calle': 'Calle Insdustrial 1020'
        }
    }
}

//Destructuring
console.log('----------Destructuring----------');

    //Opción 1: Destructuring usual, en el lado izquierdo van las propiedades, en el lado derecho se declara el objeto
    const { nombre, edad } = persona;
    console.log(nombre, edad);

    //Opción 2: Destructuring alternativo, el objeto destino almacena el valor de la propiedad, la declaración let debe estar en una linea distinta,
    let direccion
    ({direccion} = persona);
    console.log(direccion);

    //Opción 3: Concatenar propiedades, no añade nuevos valores a las propiedades
    const { nombreCompleto = `${persona.nombre} Lagos`} = persona;
    console.log(nombreCompleto);

    //Opción 4: Añadir un alias a la propiedad del objeto 
    const {direccion: domicilioLaboral} = persona;
    console.log(domicilioLaboral);

    //Opción 5: Anidaciones. Si queremos extraer dirección de departamento, la sintaxis es colocar el nombre del que está en el exterior, seguido por dos puntos “:”, y luego el otro que está anidado entre llaves { }. 
    const {
        departamento,
        departamento: {
            direccionCasa
        }
    } = empleado
    console.log(departamento)
    console.log(direccionCasa)

    //Opción 6: Uso del destructuring en funciones, el objeto es extraido a través de los parámetros
    const infoSobrePersona = ({nombre, edad, hobby}) => {
    console.log(`${nombre} tiene ${edad} años y su hobby favorito es ${hobby}.`)
    }
        // Pasamos un objeto como parámetro:
        infoSobrePersona(persona);

    //Opción 7: Retornar un objeto a través del método y utiliar sus valores
    const obtenerUsuario = () => {
        return {
        'usuario': 'Alex1',
        'correo': 'a23@correo.uk',
        'edadUsuario': 22
        }
    }
        // Desestructuramos el objeto retornado por el método:
        const {usuario, correo, edadUsuario} = obtenerUsuario();
        console.log(usuario, correo, edadUsuario)


//Operador Spread
console.log('----------OPERADOR SPREAD----------');

    //Opción 1: permitiéndonos tomar un elemento "condensado" como una matriz o un objeto, y solo usar dicho elemento por sus partes individuales,
    const suma = (x, y, z) => x + y + z;
    let numeros = [7, 8, 9]
    // Manera ES5:
    console.log(suma.apply(null, numeros)); //24
    // Manera ES6 con Spread:
    console.log(suma(...numeros));

    //Opción 2: Concatenar valores
    var a = [1, 2, 3, 4, 5]
    var b = [6, 7, 8, 9, 10]
    // Manera ES5:
    console.log(a.concat(b)) // [1,2,3,4,5,6,7,8,9,10]
    // Manera ES6 con Spread:
    console.log([...a, ...b]);

    //Opción 3 Mostrar valores 
    let numeros_2 = [7, 8, 9]
    // Manera ES6 con Spread:
    console.log([...numeros_2]);
