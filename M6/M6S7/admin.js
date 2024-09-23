const yargs = require ('yargs');

//Configuración de comandos

const createConfig = {
    id:{
        description: 'título de la tarea',
        alias: 'i',
        type: 'number',
        demandOption: true
    },
    title: {
        description: 'título de la tarea',
        alias: 't',
        type: 'string',
        demandOption: true
    },
    description: {
        description: '',
        alias: 'd',
        type: 'string',
        demandOption: true
    }
};

//Funciones para manejar cda comando



//Definición de comandos

.command ('create')
.command ('read')
.command ('update')
.command ('delete')
