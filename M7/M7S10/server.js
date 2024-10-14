const db = require('./app/models')
const controller = require('./app/controllers/user.controller')
const run = async () => {
 // Crear un Usuario
 const user1 = await controller.createUser({
 name: 'José Alberto',
 })
 const user2 = await controller.createUser({
 title: 'Carlos Mejias',
 })
 //Crear un proyecto
 const project1 = await controller.createProject(user1.id, {
 name: 'Projecto A',
 })
 await controller.createProject(user1.id, {
 name: 'Projecto B',
 })
 const project2 = await controller.createProject(user2.id, {
 name: 'Proyecto X',
 })
 await controller.createProject(user2.id, {
 name: 'Proyecto Z',
 })


    // obtener los usuarios por id
    const user1Data = await controller.findUserById(user1.id)
    console.log(
    '>> Usuario id=' + user1Data.id,
    JSON.stringify(user1Data, null, 2)
    )

    // Obtener los proyectos por ID
    const projectData = await controller.findProjectById(project1.id)
    console.log(
    '>> Proyecto id=' + project1.id,
    JSON.stringify(projectData, null, 2)
    )

    // obtener todos los Usuarios
    const users = await controller.findAll()
    console.log('>> Todos los Usuarios ', JSON.stringify(users, null, 2))
}
// db.sequelize.sync()
db.sequelize.sync({
 force: true
}).then(() => {
 console.log('Eliminando y resincronizando la base de datos.')
 run()
})

