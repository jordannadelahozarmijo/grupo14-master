// Requerimos la clase User y el modelo
const User = require('./user');
    (async function () {
    console.log("Ejecutando la migración del objeto User")
    await User.CreateTable()
    console.log("Migración Realizada")
    // Creamos el primer objeto user1 de nombre José Pérez y edad 35
    const user1 = new User("José Pérez", 35)
    console.log(user1)
    // Creamos el segundo objeto user2 de nombre Juan De Jesús y edad 40
    const user2 = new User("Juan De Jesús", 40)
    // insertamos en la base de datos con el metodo creado
    // insert() perteneciente a un metodo estático de la clase User
    await user1.insert()
    await user2.insert()
    // Buscamos un usuario segun el ID
    User.Find(2)
    // Buscamos todos los usuarios insertados en la base de datos
    // por el metodo creado All()
    let allUser = await User.All()
    console.log(allUser)
})();


