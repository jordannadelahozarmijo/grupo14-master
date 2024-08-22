// Utilización del objeto promesa

    // Ejercicio 1, como opera la Promesa------------------------------------------
        //Configurar promesa:
        const Promesa1 = new Promise((resolver, rechazar) => {
            setTimeout(() => {
                resolver('foo');
            }, 300);
        });

        /*Llamamos a la promesa con el callback de caso exitoso y caso fallido
        Promesa1
            .then(manejadorResueltoA, manejadorRechazadoA)
            .then(manejadorResueltoB, manejadorRechazadoB)
            .then(manejadorResueltoC, manejadorRechazadoC);
        */
    
    // Ejercicio 2 aplicar métodos .then y catch ----------------------------------
        //Configurar promesa con 2 parámetros
        let Promesa2 = new Promise(function(miResolucion, miRechazo) {
                setTimeout(function() {
                        //promesa en true o false
                        if(true) { 
                            miResolucion("Funcionó wuaaau :D");
                        } 
                        //muestra promesa fallida en console log
                        else {
                            miRechazo("No funcionó, a seguir intentando");
                        }
                    }, 1000
                );
            }
        );

        //Método .then, se utiliza para manejar el resultado exitoso de una promesa
            Promesa2.then(function(value) { 
                //En caso de cumplirse la promesa muestra en pantalla el valor
                document.getElementById("d1").innerHTML = value;
                }, 
                function(value) { 
                //En caso de fallar, el valor se muestra en consola/alert
                console.log(value)
                }
            );


        //Método .catch, manejar cualquier error que ocurra en la cadena de promesas
            Promesa2.catch(function(value) {
                console.log(value)
                })
    
//Utilización de funciones Async y Await en las funciones promesas

    //Ejercicio 1  Operador Async ----------------------------------
        //Función normal
            function funcNormal() {
                return "Hola";
            }
        // Funcion Async:
            async function funcAsync() {
                return "Hola"
            }
        // Muestra de resultados:
        console.log(funcNormal())
        console.log(funcAsync())

        // Función Async mediante uso de función flecha
            const funcionAsync = async () => {return "Hola";}
            console.log(funcionAsync())

    //Ejercicio 2 Operador Await 
        
        //Promesa A, tarde 3 segundos.
            function a() {
                return new Promise(resolve => {
                    setTimeout(() => {
                    resolve('Esto tarda 3 segundos');
                }, 3000);
                });
            }
        // Promesa B, tarda 1 segundo.
            function b() {
                return new Promise(resolve => {
                    setTimeout(() => {
                    resolve('Esto tarda 1 segundo');
                }, 1000);
                });
            }

        // Definimos funcion async y utilizamos await en la constante para mostrar el resultado. 
        // El operador await solo se puede usar dentro de una función async.
            async function llamadaAsync() {
                    console.log('--INICIANDO--');

                // Primer await:
                const resultado1 = await a();
                    console.log(resultado1);
                    console.log('... pausa entre promesas ...')

                // Segundo await:
                const resultado2 = await b();
                    console.log(resultado2);
                    console.log('--FINALIZANDO--');
            }
            llamadaAsync();

//Probando ejemplos
            //Definir promesa
            let PromesaEjemplo = new Promise((resolver, rechazar) => {
                setTimeout(() => {
                  // La promesa se resuelve o rechaza
                  if (true) { 
                    resolver("Promesa ejemplo funcionando");
                  } else {
                    rechazar("No funcionó, a seguir intentando");
                  }
                }, 500);
              });
              
              // Definimos la función async
              async function obtenerDatos() {
                try {
                    // Esperar a que la promesa se resuelva o se rechace
                    let resultadoPromesa = await PromesaEjemplo;
                    // Va a retornar el valor del if (si es true) o else (si el if es falso)
                    console.log(resultadoPromesa);
                
                    // Si la promesa se resuelve, se continua con el fetch
                    let respuesta = await fetch('https://dog.ceo/api/breeds/image/random');
                    if (!respuesta.ok) {
                        throw new Error("Error al obtener los datos");
                    }

                    let datos = await respuesta.json();
                    console.log(datos);

                    document.getElementById('imagenPerro').src = datos.message;
              
                } catch (error) {
                    console.error(error);
                }
              }
              
              // Ejecutamos la función
              obtenerDatos();

              document.getElementById('recargarImagen').addEventListener('click', obtenerDatos);