const db = require('./models');
const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors')
const port =  3000;

//Controladores
const userControler = require('./controllers/user.controler');
const bootcampControler = require('./controllers/bootcamp.controler');
const authControler = require('./controllers/auth.controler');

//Middleware
const app = express();
app.use(express.json());
app.use(cookieParser());

//app.use(cors());
app.use(cors({
  origin: 'http://127.0.0.1:3000', //Cambia esto al origen del frontend
  credentials: true //Permitir el envío de cookies o credenciales
}));


//Middleware de autenticación
const secretPassword = "claveSuperSecreta";
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
    try {
        // Crear un Usuario
        const user1 = await userControler.createUser({body: {
            firstName: "Mateo", 
            lastName: "Díaz", 
            email: "mateo.diaz@correo.com", 
            password: "mateo123456" 
        }},
        {status: (status) => ({ json: (response) => console.log(response) }) });

        const user2 = await userControler.createUser({ body: {
                firstName: "Santiago", 
                lastName: "Mejias", 
                email: "santiago.mejias@correo.com", 
                password: "santiago123456"
            
        }},
        {status: (status) => ({ json: (response) => console.log(response) }) });

        const user3 = await userControler.createUser({ body: {
            firstName: "Lucas", 
            lastName: "Rojas", 
            email: "lucas.rojas@correo.com", 
            password: "lucas123456"
        
        }},
        {status: (status) => ({ json: (response) => console.log(response) }) });

        const user4 = await userControler.createUser({ body:{
            firstName: "Facundo", 
            lastName: "Fernández", 
            email: "facundo.fernandez@correo.com", 
            password: "facundo123456"
        }},
        {status: (status) => ({ json: (response) => console.log(response) }) });
    

        // Crear un Bootcamp
        const bootcamp1 = await bootcampControler.createBootcamp({body: {
            title: 'Introduciendo El Bootcamp De React',
            cue: 10,
            description: "React es la librería más usada en JavaScript para el desarrollo de interfaces",
        }},
        {status: (status) => ({ json: (response) => console.log(response) })
        });
        
    
        const bootcamp2 = await bootcampControler.createBootcamp({body: {
            title: 'Bootcamp Desarrollo Web Full Stack',
            cue: 12,
            description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares como JavaScript, nodeJS, Angular, MongoDB, ExpressJS",
        }},
        {status: (status) => ({ json: (response) => console.log(response) })
        });
    
        const bootcamp3 = await bootcampControler.createBootcamp({body: {
            title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
            cue: 12,
            description: "Domina Data Science todo el ecosistema de lenguajes y herramientas de Big Data e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning",
        }},
        {status: (status) => ({ json: (response) => console.log(response) })
        });
    
        // Agregando usuarios a los Bootcamp
        await bootcampControler.addUser(bootcamp1.id, user1.id);
        await bootcampControler.addUser(bootcamp1.id, user2.id);
        await bootcampControler.addUser(bootcamp2.id, user1.id);
        await bootcampControler.addUser(bootcamp3.id, user1.id);
        await bootcampControler.addUser(bootcamp3.id, user2.id);
        await bootcampControler.addUser(bootcamp3.id, user3.id);
        await bootcampControler.addUser(bootcamp3.id, user4.id);
    
    
        // Consultando el bootcamp(id) incluyendo los usuarios
        const _bootcamp1 = await bootcampControler.findById(bootcamp1.id);
        console.log(" Bootcamp  ", JSON.stringify(_bootcamp1, null, 2));
    
        // Consultado  todos los bootcamp
        const bootcamps = await bootcampControler.findAll();
        console.log(" Bootcamps: ", JSON.stringify(bootcamps, null, 2));
    
        // Consultado los usuarios (id) incluyendo los bootcamp
        const _user = await userControler.findUserById(user1.id);
        console.log(" user1: ", JSON.stringify(_user, null, 2));
    
        // Listar todos los usuarios con sus bootcamp
        const users = await userControler.findAll();
        console.log(">> usuarios: ", JSON.stringify(users, null, 2));
    
        // Actualización de usuario por id
        const user = await userControler.updateUserById(user1.id, "Pedro", "Sánchez", "psanchez@gmail.com");
        const _user1 = await userControler.findUserById(user1.id);
        console.log(" user1: ", JSON.stringify(_user1, null, 2));
    
        //Eliminar un usuario por id
        const duser1 = await userControler.deleteUserById(user1.id);
        console.log(">> usuario eliminado: ", JSON.stringify(duser1, null, 2
        ));
    } catch (error) {
    console.error(error);
    }
    
};

//db.sequelize.sync()
db.sequelize.sync({ force: true })
    .then(() => {console.log('Base de datos sincronizada'); run();})
    .catch((err) => {console.error('Error al sincronizar la base de datos:', err);}
);

//Endpoint get utiliza el middelware para dar acceso
app.post('/signup', authControler.signup); //Registro de nuevo usuario
app.post('/login', authControler.login);   //Inicio de sesión
app.post('/logout', authControler.logout); //Cerrar sesión (opcional)

//Endpoints de User
app.get('/user/:id', userControler.findUserById);
app.get('/users', userControler.findAll);
app.post('/user', userControler.createUser);
app.put('/user/:id', userControler.updateUserById);
app.delete('/user/:id', verificarToken, userControler.deleteUserById);

//Endpoinsts de bootcamp
app.get('/bootcamps', bootcampControler.findAll);
app.get('/bootcamp/:id', bootcampControler.findById);
app.post('/bootcamp', verificarToken, bootcampControler.createBootcamp);
app.post('/bootcamp/:id', bootcampControler.addUser);
app.put('/bootcamp/:id', bootcampControler.update);
app.delete('/bootcamp/:id', verificarToken, bootcampControler.deleteById);

//Puerto
app.listen (port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});