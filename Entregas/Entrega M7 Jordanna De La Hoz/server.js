const express = require('express');
const app = express();
const port = 3000;
const userController = require('./controllers/user.controller');
const bootcampController = require('./controllers/bootcamp.controller');
const usersBootcampController = require('./controllers/usersbootcamp.controller');
const db = require('./models');

app.use(express.json());

// Crear Usuarios a través del controlador
app.post('/user', async (req, res) => {
    userController.createUser(req, res);
});

// Crear Bootcamp a través del controlador
app.post('/bootcamp', async (req, res) => {
    bootcampController.createBootcamp(req, res);
});

// Agregar usuarios a bootcamps
app.post('/addUserToBootcamp', async (req, res) => {
    usersBootcampController.addUserToBootcamp(req, res);
});

// Función para crear usuarios iniciales
const createInitialUsers = async () => {
    try {
        const users = [
            { firstName: 'Mateo', lastName: 'Díaz', email: 'mateo.diaz@correo.com' },
            { firstName: 'Santiago', lastName: 'Mejías', email: 'santiago.mejias@correo.com' },
            { firstName: 'Lucas', lastName: 'Rojas', email: 'lucas.rojas@correo.com' },
            { firstName: 'Facundo', lastName: 'Fernandez', email: 'facundo.fernandez@correo.com' }
        ];

        // Iterar sobre cada usuario y crearlo en la base de datos
        for (const user of users) {
            await userController.createUser({ body: user }, { status: (status) => ({ json: (response) => console.log(response) }) });
        }
    } catch (error) {
        console.error('Error creando usuarios iniciales:', error);
    }
};

// Función para crear bootcamps iniciales
const createInitialBootcamps = async () => {
    try {
        const bootcamps = [
            {
                title: 'Introduciendo El Bootcamp De React',
                cue: 10,
                description: 'React es la librería más usada en JavaScript para el desarrollo de interfaces.',
            },
            {
                title: 'Bootcamp Desarrollo Web Full Stack',
                cue: 12,
                description: 'Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.',
            },
            {
                title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
                cue: 18,
                description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados.',
            },
        ];

        // Iterar sobre cada bootcamp y crearlo en la base de datos
        for (const bootcamp of bootcamps) {
            await bootcampController.createBootcamp({ body: bootcamp }, { status: (status) => ({ json: (response) => console.log(response) }) });
        }
    } catch (error) {
        console.error('Error creando bootcamps iniciales:', error);
    }
};

// Función para asociar usuarios a bootcamps
const asociarUsuariosBootcamp = async () => {
    console.log('----------Asociar usuarios a bootcamps---------')
    try {
        const bootcampUsers = [
            {
                title: 'Introduciendo El Bootcamp De React',
                users: ['mateo.diaz@correo.com', 'santiago.mejias@correo.com']
            },
            {
                title: 'Bootcamp Desarrollo Web Full Stack',
                users: ['mateo.diaz@correo.com']
            },
            {
                title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning',
                users: ['mateo.diaz@correo.com', 'santiago.mejias@correo.com', 'lucas.rojas@correo.com']
            },
        ];

        for (let bootcampUser of bootcampUsers) {
            // Obtener el Bootcamp
            const bootcamp = await db.Bootcamp.findOne({ where: { title: bootcampUser.title } });

            if (bootcamp) {
                for (const email of bootcampUser.users) {
                    // Obtener el Usuario
                    const user = await db.User.findOne({ where: { email } });
                    if (user) {
                        // Asociar el usuario al bootcamp
                        await bootcamp.addUser(user.id);
                        // Imprime el usuario en formato JSON
                        console.log('---Datos del usuario:', JSON.stringify(user.id)); 
                    }
                    else {
                        console.error(`Usuario con email ${email} no encontrado.`);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error asociando usuarios con bootcamps:', error);
    }
};

// Función para consultar el usuario por ID, incluyendo los Bootcamp
const getUserById = async (id) => {
    console.log('----------Consultar el usuario por ID---------')
    try {
        const user = await db.User.findByPk(id, {
            include: [{
            // Incluye los bootcamps asociados
            model: db.Bootcamp, 
            as: 'bootcamp'
            }]
        });
        // Imprime los datos del usuario en la consola
        console.log('-------Datos del usuario:', JSON.stringify(user.id, null, 2)); // Imprime el usuario en formato JSON
        return user;
    } catch (error) {
        console.error('Error al consultar el usuario:', error);
    }
};

// Listar los usuarios con sus Bootcamp
const getAllUsers = async () => {
    try {
        const users = await db.User.findAll({
            include: [{
                model: db.Bootcamp, // Incluye los bootcamps asociados
                as: 'bootcamp'
            }]
        });
        console.log('-------Datos del usuarios:', JSON.stringify(users,null, 10)); // Imprime el usuario en formato JSON
        return users;
    } catch (error) {
        console.error('Error al listar los usuarios:', error);
    }
};

// Actualizar el usuario según su ID
const updateUserById = async (id, newUserData) => {
    try {
        const user = await db.User.findByPk(id);
        if (user) {
            await user.update(newUserData); // Actualiza los datos del usuario
            console.log('Acción exitosa :D')
            console.log('-------Usuario actualizado:', JSON.stringify(user, null, 10)); // Imprime el usuario en formato JSON
            return user; // Devuelve el usuario actualizado
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
    }
};

// Eliminar un usuario por ID
const deleteUserById = async (id) => {
    try {
        const user = await db.User.findByPk(id);
        if (user) {
            await user.destroy(); // Elimina el usuario
            console.log('-------Acción exitosa:', JSON.stringify(user, null, 10)); // Imprime el usuario en formato JSON
            return { message: 'Usuario eliminado correctamente' };
        } else {
            throw new Error('Usuario no encontrado');
        }
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }
};


// Iniciar el servidor
app.listen(port, async () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
    
    // Crear usuarios y bootcamps iniciales cuando el servidor se inicia
    await createInitialUsers();
    await createInitialBootcamps();
    await asociarUsuariosBootcamp();
    await getUserById(2);
    await getAllUsers();
    await updateUserById(2, { firstName: 'Juanito' });
    await deleteUserById(2);

 

});