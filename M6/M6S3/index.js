//Paso 1: npm init
//Paso 2: npm install moment lodash


//Definir constantes con los módulos moment y lodash
const moment = require('moment');
const lodash = require('lodash');
const moduloCelular = require('./celular');



/*Crear función flecha para mostrar los datos del objeto*/
const mostrarCelular = (celular) => {
    const { marca, modelo, color, almacenamiento, camara, fechaCompra} = celular;
    console.log(`Mi celular es un ${marca} ${modelo}, de color ${color}, con ${almacenamiento} de almacenamiento, cámara de ${camara}, y lo compré el ${fechaCompra}.`);
};
  
//Mostrar función
mostrarCelular(moduloCelular.celular);
//mostrar el nombre de la variable que tiene asociada la nueva función de celular
mostrarCelular(moduloCelular.celularActualizado);



//Crear una función flecha con callback
const callback = () => {
    console.log('La función callback es ejecutada cada 1 segundo.');
  };
  
  setTimeout(callback, 1000);