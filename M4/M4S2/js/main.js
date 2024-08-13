//importar función desde utils.js
/*
import {doblar, nombre} from "./utils.js";
    console.log(doblar(1));
    console.log(nombre);
*/

// importamos todos los elementos del modulo.
/*
import * as utils from "./utils.js";
console.log(utils.doblar(2));
console.log(utils.nombre);
*/


/*
import {default as doblar} from "./utils_2.js";
console.log(doblar(3));
*/
    
// De manera simplificada:
import doblar from "./utils_2.js";
    console.log(doblar(4));