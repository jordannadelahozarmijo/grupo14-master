module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: '1234',
    DB: 'M7S10',
    dialect: 'postgres',
    pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
    }
   }