const {update} = require('./User');
const User = require('./User');

// Creando instancias con el metodo create
User.create({
 name: "Pedro",
 age: 40
 })
 .then((result) => {
 console.log('Nuevo usuario creado: ' +
 result.getDataValue('name') +
 ' con el id: ' + result.getDataValue('id'));
 }).catch((err) => {
 console.log('Fallo la inserción del usuario');
 console.log(err);
 }).finally(() => {
 User.close;
 });

 // El método toma un array de objetos
let users = [{
    name: "José",
    age: 25
    },
    {
    name: "Pedro",
    age: 40
    },
    {
    name: "Carlos",
    age: 50
    },
    {
    name: "Antonio",
    },
    {
    name: "Felipe",
    age: 20
    },
    {
    name: "Juan",
    age: 30
    },
    ]
    User.bulkCreate(users, {
    validate: true
    }).then(() => {
    console.log('Usuarios Creados ');
    }).catch((err) => {
    console.log('Fallo la inserción de usuarios');
    console.log(err);
    }).finally(() => {
    User.close;
    });