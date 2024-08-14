//Declarar arreglo
let frutas = ['manzana', 'naranja', 'pera', 'frutilla', 'kiwi'];

//Crear generador
function* generador() {
    //iterador
    let i = 0
    //yield pone la función en pausa.
    yield frutas[i];
    i++
    yield frutas[i];
    i++
    yield frutas[i];
    i++
    yield frutas[i];
    i++
    yield frutas[i];
    i++
    return 'Termina de iterar';
}


//Instanciar generador
let gen1 = generador();


//utilizar método next para retornar el valor (value) y la propiedad (done) del objeto
console.log(gen1.next().value)
console.log(gen1.next().value)
console.log(gen1.next().value)
console.log(gen1.next().value)
console.log(gen1.next().value)
console.log(gen1.next().value)