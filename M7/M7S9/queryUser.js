const {update} = require('./User');
   const User = require('./User');
   // Sequelize, búsqueda por pk, findByPk
   User.findByPk(2).then((user) => {
    console.log(user.get({
    plain: true
    }));
    console.log('********************')
    console.log(`id: ${user.id}, name: ${user.name}`);
   }).finally(() => {
    User.close;
    });

    //Sequelize findOne
// Este método hace la búsqueda para una sola fila
    User.findOne({
        where: {
        id: 2
        }
    }).then(user => {
        console.log(user.get({
        plain: true
        }));
    }).finally(() => {
        User.close;
    });