
//-----Ejercicio 2 -----------------------------------------

// Aplicar método REPLACE
let str = `Hazlo funcionar, hazlo bien, hazlo rápido`;

// expresión regular
// g indica que la expresión regular debe probarse con todas las coincidencias posibles en una cadena 
// i indica que ignorará las mayúsculas y minúsculas
let patron = /hazlo/gi;

console.log(str.replaceAll(patron, function (match) {
    //Argumentos
    if (match === 'Hazlo') return '1234';
    if (match === 'hazlo') return 'ABC';
}))

//Aplicando ejemplo 1

function aplicarEjemploReplace () {

let refran = `Al pan, pan; y al vino, vino.`;
let patron2 = /pan/gi;
let resultado1 = refran.replaceAll(patron2, function (match) 
    {
    //Argumento
    if (match === 'pan') return 'pan de molde';
})
console.log(resultado1);


let patron3 = /vino/gi;
let resultado2 = refran.replaceAll(patron3, function (match) 
    {
    //Argumento
    if (match === 'vino') return 'cerveza';
})
console.log(resultado2);

}


// Aplicar método trimStart
const str2 = ' Quita el espacio al inicio ';
const resultadoStart = str2.trimStart();
console.log({ str2 });
console.log({ resultadoStart });


// Aplicar método trimEnd

const str3 = ' Quita el espacio al final ';
const resultadoEnd = str3.trimEnd();
console.log({ str3 });
console.log({ resultadoEnd });




//-----Ejercicio 2 -----------------------------------------

//Separador numérico 
const presupuestoAnual = 1_000_000_000;
    //Permite agregar . a los  números
    console.log(presupuestoAnual.toLocaleString('es-CL'));

const presupuestoAnual2 = 1000000000;
    console.log(presupuestoAnual2);

//Agrega un decimal
const presupuestoAnual3 = 10.000000000;
    console.log(parseInt(presupuestoAnual3));



//Operador de fusión nula

const nombre = null ?? 'Aquiles';
    console.log(nombre);

const edad = undefined ?? 84;
    console.log(edad);

const colorFav = 'azul' ?? 'rojo';
    console.log(colorFav);


//Operadores lógicos de asignación


// OR ||=

//Cuando saludo es falsy
let saludo;
saludo ||= 'Lorem ipsum dolor sit amet'
console.log(saludo);

//Cuando saludo es truthy
saludo = 'hola'
saludo ||= 'Lorem ipsum dolor sit amet'
console.log(saludo);


// AND &&=
let persona = {
    nombre: 'Alejando',
    apellido: 'Minor',
    };
    persona.apellido &&= 'Magno';
    console.log(persona);

//Aplicando contraejemplo
    let login = {
        usuario: 'HelloKitty',
        contrasenna: 'GatitosDelMundo@',
        };
        login.contrasenna &&= '*****';
        console.log(login);
        console.log(login.contrasenna);
        //No se puede aplicar en este caso porque reemplaza el dato


// Fusión Nula ??=
let dimensiones = {
        altura: 54.2
    };
    dimensiones.ancho ??= 33.7;
    console.log(dimensiones);

    //Aplicar ejemplo 
    let dimensionesMaderas = {
        corte1: 200
    };
    //dimensionesMaderas.corte2 ??= 300;
    console.log(dimensionesMaderas.corte1 ??= 300);
    console.log(dimensionesMaderas.corte2 ??= 300);


//Operador de encadenamiento opcional 

const pacienteVeterinario = {
    amo: 'Amanda Salamanca',
    mascota: {
    tipo: 'gato',
    nombre: 'Chispas',
    mostrarVacunas: () => ['rabia', 'parvovirus', 'virus de la leucemia felina']
    }
    };
    // Éste método si existe
    console.log(pacienteVeterinario.mascota.mostrarVacunas?.())
    // Éste método NO existe
    console.log(pacienteVeterinario.mascota.registrarVacunas?.())

//Aplicando ejemplo mascotas de Fabian

const pacienteVeterinario1 = {
    amo: 'Fabian Castillo',
    mascota: {
        tipo: 'perro',
        nombre: 'Valentin',
        mostrarVacunas: () => ['rabia', 'parvovirus','sextuple']
    }
    };
    // Éste método si existe
    console.log(pacienteVeterinario.mascota.mostrarVacunas?.())
    // Éste método NO existe
    console.log(pacienteVeterinario.mascota.registrarVacunas?.())