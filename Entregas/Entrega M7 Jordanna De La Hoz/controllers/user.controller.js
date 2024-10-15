const db = require('../models'); // Asegúrate de que los modelos están correctamente importados
const User = db.User;
const Bootcamp = db.Bootcamp;

//método para Crear y guardar usuarios
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El usuario con este correo ya existe" });
    }

    //Crear un nuevo usuario
    const user = await User.create({ firstName, lastName, email });
    // Respuesta exitosa
    return res.status(201).json({ message: "Usuario creado con éxito", user });
    
  } 
  catch (error) {
    // Manejar errores de Sequelize, como errores de validación
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: "Error de validación", error: error.errors });
    }

    // Otros errores
    return res.status(500).json({ message: "Error al crear el usuario", error: error.message });
  }
}

//método para Obtener los Bootcamp de un usuario
exports.findUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = await User.findByPk(userId, {
      include: Bootcamp // Incluir los Bootcamps asociados
    });
    
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los Bootcamps del usuario", error });
  }
}

//método para Obtener todos los Usuarios, incluyendo los Bootcamps asociados
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      include: Bootcamp // Incluir los Bootcamps asociados
    });
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todos los usuarios", error });
  }
};

//método para Actualizar un Usuario por su Id
exports.updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName, email } = req.body;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar los campos del usuario
    await user.update({
      firstName,
      lastName,
      email,
    });
    
    res.status(200).json({ message: "Usuario actualizado con éxito", user });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un Usuario por su Id
exports.deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    await user.destroy();
    
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

