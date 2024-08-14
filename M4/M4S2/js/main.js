//importar función desde utils.js

import {doblar, nombre} from "./utils.js";
    console.log(doblar(1));
    console.log(nombre);

    

//Importar todos los elementos del módulo.

import * as utils from "./utils.js";
console.log(utils.doblar(2));
console.log(utils.nombre);



//importar función desde utils_2.js

import {default as doblar} from "./utils_2.js";
console.log(doblar(3));

    

// Importar función desde utils_2.js de manera simplificada:
import doblar from "./utils_2.js";
    console.log(doblar(4));

