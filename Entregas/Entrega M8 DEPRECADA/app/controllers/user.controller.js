const {users} = require('../models')
const db = require('../models')
const User = db.users
const Bootcamp = db.bootcamps

// Crear y Guardar Usuarios
exports.createUser = (user) => {
  return User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password:  user.password
    })
    .then(user => {
      console.log(`>> Se ha creado el usuario: ${JSON.stringify(user, null, 4)}`)
      return user
    })
    .catch(err => {
      console.log(`>> Error al crear el usuario ${err}`)
    })
}

// obtener los bootcamp de un usuario
exports.findUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [{
        model: Bootcamp,
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
exports.findAll = async () => {
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

// Actualizar usuarios
exports.updateUserById = (userId, fName, lName) => {
  return User.update({
      firstName: fName,
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
exports.deleteUserById = (userId) => {
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