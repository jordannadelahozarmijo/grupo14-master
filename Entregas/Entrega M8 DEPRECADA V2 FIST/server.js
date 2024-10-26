const db = require('./models');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')

//Controladores
const userController = require('./controllers/user.controler');
const bootcampController = require('./controllers/bootcamp.controler');
const authController = require('./controllers/auth.controler');

const { update } = require('lodash');
const port =  3000;

//Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

//app.use(cors());
app.use(cors({
  origin: 'http://127.0.0.1:5500', //Cambia esto al origen del frontend
  credentials: true //Permitir el envío de cookies o credenciales
}));

const secretPassword = "claveSuperSecreta";
//Middleware de autenticación
const verificarToken = (req, res, next) => {
  const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, secretPassword);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};


const run = async () => {
    // Crear un Usuario
    const user1 = await userController.createUser({ fistName: "Mateo", lastName: 'Díaz', email: 'mateo.diaz@correo.com', password: 'mateo123456' }); 
    const user2 = await userController.createUser({ fistName: 'Santiago', lastName: 'Mejias', email: 'santiago.mejias@correo.com', password: 'santiago123456'});
    const user3 = await userController.createUser({ fistName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com', password: 'lucas123456',});
    const user4 = await userController.createUser({ fistName: 'Facundo', lastName: 'Fernández', email: 'facundo.fernandez@correo.com', password: 'facundo123456',});
  
    // Crear un Bootcamp
    const bootcamp1 = await bootcampController.createBootcamp({
      title: 'Introduciendo El Bootcamp De React',
      cue: 10,
      description: "React es la librería más usada en JavaScript para el desarrollo de interfaces",
    });
  
    const bootcamp2 = await bootcampController.createBootcamp({
      title: 'Bootcamp Desarrollo Web Full Stack',
      cue: 12,
      description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS",
    });
  
    const bootcamp3 = await bootcampController.createBootcamp({
      title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
      cue: 12,
      description: "Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning",
    });
  
    // Agregando usuarios a los Bootcamp
    await bootcampController.addUser(bootcamp1.id, user1.id);
    await bootcampController.addUser(bootcamp1.id, user2.id);
    await bootcampController.addUser(bootcamp2.id, user1.id);
    await bootcampController.addUser(bootcamp3.id, user1.id);
    await bootcampController.addUser(bootcamp3.id, user2.id);
    await bootcampController.addUser(bootcamp3.id, user3.id);
    await bootcampController.addUser(bootcamp3.id, user4.id);
  
  
    // Consultando el bootcamp(id) incluyendo los usuarios
    const _bootcamp1 = await bootcampController.findById(bootcamp1.id);
    console.log(" Bootcamp  ", JSON.stringify(_bootcamp1, null, 2));
  
    // Consultado  todos los bootcamp
    const bootcamps = await bootcampController.findAll();
    console.log(" Bootcamps: ", JSON.stringify(bootcamps, null, 2));
  
    // Consultado los usuarios (id) incluyendo los bootcamp
    const _user = await userController.findUserById(user1.id);
    console.log(" user1: ", JSON.stringify(_user, null, 2));
  
    // Listar todos los usuarios con sus bootcamp
    const users = await userController.findAll();
    console.log(">> usuarios: ", JSON.stringify(users, null, 2));
  
    // Actualización de usuario por id
    const user = await userController.updateUserById(user1.id, "Pedro", "Sánchez");
    const _user1 = await userController.findUserById(user1.id);
    console.log(" user1: ", JSON.stringify(_user1, null, 2));
  
    //Eliminar un usuario por id
    const duser1 = await userController.deleteUserById(user1.id);
    console.log(">> usuario eliminado: ", JSON.stringify(duser1, null, 2
    ));
    
};
run();

//db.sequelize.sync()
db.sequelize.sync(
  { force: true }
  ).then(() => {
    console.log('Base de datos sincronizada');
    run();
    }).catch((err) => {
      console.error('Error al sincronizar la base de datos:', err);
});;




//endpoint get utiliza el middelware para dar acceso
app.post('/signup', authController.signup); //Registro de nuevo usuario
app.post('/login', authController.login);   //Inicio de sesión
app.post('/logout', authController.logout); //Cerrar sesión (opcional)


//Endpoints de User
app.get('/user/:id', userController.findUserById);
app.get('/users', userController.findAll);
app.post('/user', userController.createUser);
app.put('/user/:id', userController.updateUserById);
app.delete('/user/:id', verificarToken, userController.deleteUserById);


//Endpoinsts de bootcamp
app.get('/bootcamps', bootcampController.findAll);
app.get('/bootcamp/:id', bootcampController.findById);
app.post('/bootcamp', verificarToken, bootcampController.createBootcamp);
app.post('/bootcamp/:id', bootcampController.addUser);
app.put('/bootcamp/:id', bootcampController.update);
app.delete('/bootcamp/:id', verificarToken, bootcampController.deleteById);


//Puerto
app.listen (port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});