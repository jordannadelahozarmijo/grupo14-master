const {
    users
   } = require('../models')
   const db = require('../models')
   const User = db.users
   const Project = db.projects
   // Crear y Guardar Usuarios
   exports.createUser = (user) => {
    return User.create({
    name: user.name
    })
    .then(user => {
    console.log(`>> Se ha creado el usuario: ${JSON.stringify(user,
   null, 4)}`)
    return user
    })
    .catch(err => {
    console.log(`>> Error al crear el usuario ${err}`)
    })
   }
   // Crear y guardar un nuevo proyecto
   exports.createProject = (userId, project) => {
    return Project.create({
    name: project.name,
    userId: userId
    })
    .then(project => {
    console.log(`>> Creado el proyecto: ${JSON.stringify(project,
   null, 4)}`)
    return project
    })
    .catch(err => {
    console.log(`>> Error al crear el proyecto: ${err}`)
    })
   }
   // obtener los proyectos de un usuario
   exports.findUserById = (userId) => {
    return User.findByPk(userId, {
    include: ['projects']
    })
    .then(user => {
    return user
    })
    .catch(err => {
    console.log(`>> Error mientras se encontraba los usuario:
        ${err}`)
    })
   }
   // Obtener los Proyectos por el id del proyecto
   exports.findProjectById = (id) => {
    return Project.findByPk(id, {
    include: ['user']
    })
    .then(project => {
    return project
    })
    .catch(err => {
    console.log(`>> Error buscado los proyectos: ${err}`)
    })
   }
   // obtener todos los Usuarios incluyendo los proyectos
   exports.findAll = () => {
    return User.findAll({
    include: ['projects']
    }).then(users => {
    return users
    })
   }