//Crear constante con el módulo moment
const moment = require('moment');

//Definir objeto de celular
const celular = {
  marca: 'Samsung',
  modelo: 'Galaxy',
  color: 'Negro',
  almacenamiento: '128GB',
  camara: '12MP',
  fechaCompra: moment().format('YYYY-MM-DD')
};

//Exportar objeto
module.exports = celular;


//Crear un nuevo objeto con el operador spread
const actualizarCelular = (celular) => ({
    ...celular,
    marca: 'Apple',
    modelo: 'SE',
    color: 'Rojo'
  });
  
  const celularActualizado = actualizarCelular(celular);
  
  console.log(celularActualizado);

  module.exports = {
    celular, actualizarCelular, celularActualizado
  }