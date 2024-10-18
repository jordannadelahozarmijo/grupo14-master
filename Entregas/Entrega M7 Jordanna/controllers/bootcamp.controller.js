const db = require('../models'); // Asegúrate de que los modelos están correctamente importados
const Bootcamp = db.Bootcamp;
const User = db.User;



// Crear y guardar un nuevo Bootcamp
exports.createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;

    // Crear un nuevo Bootcamp
    const bootcamp = await Bootcamp.create({
      title,
      cue,
      description
    });

    res.status(201).json({ message: "Bootcamp creado con éxito", bootcamp });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el Bootcamp", error });
  }
};

// Agregar un Usuario a un Bootcamp (relacionar usuario con bootcamp)
exports.addUser = async (req, res) => {
  try {
    const { bootcampId, userId } = req.body;

    // Encontrar el Bootcamp y el Usuario
    const bootcamp = await Bootcamp.findByPk(bootcampId);
    const user = await User.findByPk(userId);

    if (!bootcamp || !user) {
      return res.status(404).json({ message: "Bootcamp o Usuario no encontrado" });
    }

    // Agregar el usuario al Bootcamp (asociación)
    await bootcamp.addUser(user);

    res.status(200).json({ message: "Usuario agregado al Bootcamp con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar el Usuario al Bootcamp", error });
  }
};

// Obtener un Bootcamp por su Id
exports.findById = async (req, res) => {
  try {
    const bootcampId = req.params.id;

    const bootcamp = await Bootcamp.findByPk(bootcampId, {
      include: User // Incluir los usuarios asociados al Bootcamp
    });

    if (!bootcamp) {
      return res.status(404).json({ message: "Bootcamp no encontrado" });
    }

    res.status(200).json(bootcamp);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el Bootcamp", error });
  }
};

// Obtener todos los Bootcamps incluyendo los Usuarios asociados
exports.findAll = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: User // Incluir los usuarios asociados a cada Bootcamp
    });

    res.status(200).json(bootcamps);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todos los Bootcamps", error });
  }
};