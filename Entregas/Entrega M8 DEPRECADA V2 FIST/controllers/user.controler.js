const db = require('../models'); // Asegúrate de que los modelos están correctamente importados
const User = db.User;
const Bootcamp = db.Bootcamp;

// Crear y Guardar Usuarios   post/user
const createUser  = async (req, res) => {
  try {
    const { fistName, lastName, email, password } = req.body;
    const user = await User.create({ fistName, lastName, email, password });
    res.status(200).json(user);

     // Validación básica
    if (!fistName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }
    res.status(201).json({ message: 'Usuario creado con éxito', user });
  } catch (error) {
    console.log('error al crear el usuario');
  };
}


// obtener los bootcamp de un usuario get/user:uid
const findUserById = async (req, res) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{
        model: bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [], // Excluir atributos de la tabla intermedia
        }
      }],
    });
    
    if (!user) {
      console.log(`No se encontró el usuario con ID: ${userId}`);
      return null; // o manejar de otra manera si es necesario
    }
    return user;
  } catch (err) {
    console.error(`>> Error mientras se encontraba el usuario: ${err}`);
    throw err; // Lanza el error para que el llamador pueda manejarlo
  }
};

// obtener todos los Usuarios incluyendo los bootcamp
const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{
        model: Bootcamp,
        as: "bootcamps",
        attributes: ["id", "title"],
        through: {
          attributes: [], // Excluye atributos de la tabla intermedia
        }
      }],
    });
    
    return users; // Devuelve la lista de usuarios
  } catch (error) {
    console.error(`>> Error al obtener los usuarios: ${error}`);
    throw error; // Lanza el error para que la función que llame a findAll lo maneje
  }
};

// Actualizar usuarios /put/user:id
const updateUserById = (userId, fName, lName) => {
  return User.update({
      fistName: fName,
      lastName: lName,
      email:  email,
      password:  hashedPassword
    }, {
      where: {
        id: userId
      }
    })
    .then(user => {
      console.log(`>> Se ha actualizado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se actualizaba el usuario: ${err}`)
    })
}

// Actualizar usuarios
const deleteUserById = (userId) => {
  return User.destroy({
      where: {
        id: userId
      }
    })
    .then(user => {
      console.log(`>> Se ha eliminado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error mientras se eliminaba el usuario: ${err}`)
    })
}

module.exports = {
  createUser,
  findUserById,
  findAll,
  updateUserById,
  deleteUserById 
};