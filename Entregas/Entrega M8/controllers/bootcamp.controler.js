const db = require('../models'); // Asegúrate de que los modelos están correctamente importados
const User = db.user;
const Bootcamp = db.bootcamp;

// Crear y guardar un nuevo bootcamp
const createBootcamp = async (req, res) => {
    try {
      const { title, cue, description } = req.body;
      const crearBootcamp = await Bootcamp.create({title, cue, description});
      return crearBootcamp;
      res.status(201).json({
      message: 'Bootcamp creado con exito',
      codigo: 201,
      error: false,
      bootcampCreado: crearBootcamp
      });

  } catch (error) {
  res.status(400).json({
      message: 'Error al crear el bootcamp',
      codigo: 400,
      error: true,
      error: error.message
    });
  }
};


// Agregar un Usuario al Bootcamp post/bootcamp
const addUser = (bootcampId, userId) => {
  return Bootcamp.findByPk(bootcampId)
    .then((bootcamp) => {
      if (!bootcamp) {
        console.log("No se encontro el Bootcamp!");
        return null;
      }
      return User.findByPk(userId).then((user) => {
        if (!user) {
          console.log("Usuario no encontrado!");
          return null;
        }
        bootcamp.addUser(user.id);
        console.log('***************************')
        console.log(` Agregado el usuario id=${user.id} al bootcamp con id=${bootcamp.id}`);
        console.log('***************************')
        return bootcamp;
      });
    })
    .catch((err) => {
      console.log(">> Error mientras se estaba agregando Usuario al Bootcamp", err);
    });
};

// obtener los bootcamp por id   get/bootcamp:id
const findById = (id) => {
  return Bootcamp.findByPk(id)
    .then(bootcamp => {
      return bootcamp
    })
    .catch(err => {
      console.log(`>> Error mientras se encontraba el bootcamp: ${err}`)
    })
}

// obtener todos los Usuarios incluyendo los Bootcamp get/bootcamps
const findAll = () => {
  return Bootcamp.findAll({
    include: [{
      model: User,
      as: "users",
      attributes: ["id", "fistName", "lastName", "email"],
      through: {
        attributes: [],
      }
    }, ],
  }).then(bootcamps => {
    return bootcamps
  }).catch((err) => {
    console.log(">> Error Buscando los Bootcamps: ", err);
  });
}

// actualizar bootcamp
const update = (id, bootcamp) => {
  return Bootcamp.update(bootcamp, {
    where: {
      id: id
  }
  }).then(() => {
    return Bootcamp.findByPk(id)
    }).catch((err) => {
      console.log(">> Error Actualizando el Bootcamp: ", err);
      });
}
          
//delete  bootcamp por id 
const deleteById = (id) => {
  return Bootcamp.destroy({
    where: {
      id: id
      }
      }).then(() => {
        return Bootcamp.findByPk(id)
        }).catch((err) => {
          console.log(">> Error Eliminando el Bootcamp: ", err);
          });
          }  // fin de la clase BootcampController


module.exports = {
  createBootcamp,
  addUser,
  findById,
  findAll,
  update,
  deleteById
}
