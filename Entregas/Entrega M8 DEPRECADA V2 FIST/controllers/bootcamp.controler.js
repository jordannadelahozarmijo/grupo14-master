const {User, Bootcamp} = require('../models')

// Crear y guardar un nuevo bootcamp
const createBootcamp = (bootcamp) => {
  return Bootcamp.create({
      title: bootcamp.title,
      cue: bootcamp.cue,
      description: bootcamp.description
    })
    .then(bootcamp => {
      console.log(`>> Creado el bootcamp: ${JSON.stringify(bootcamp, null, 4)}`)
      return bootcamp
    })
    .catch(err => {
      console.log(`>> Error al crear el bootcamp: ${err}`)
    })
}

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
        bootcamp.addUser(user);
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
const findById = (Id) => {
  return Bootcamp.findByPk(Id, {
      include: [{
        model: user,
        as: "users",
        attributes: ["id", "fistName", "lastName", "email"],
        through: {
          attributes: [],
        }
      }, ],
    })
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
      model: user,
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
