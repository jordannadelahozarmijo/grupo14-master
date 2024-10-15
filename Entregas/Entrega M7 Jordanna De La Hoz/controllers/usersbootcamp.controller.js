const db = require('../models');
const UsersBootcamp = db.usersBootcamp;

exports.addUserToBootcamp = async (req, res) => {
  try {
    const { bootcampId, userId } = req.body;

    // Crear la asociación en la tabla intermedia
    const userBootcamp = await UsersBootcamp.create({
      BootcampId: bootcampId,
      UserId: userId
    });

    res.status(201).json({ message: "Usuario agregado al Bootcamp con éxito", userBootcamp });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el usuario al Bootcamp", error });
  }
};