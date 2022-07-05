const Sequelize = require('sequelize');
const sequelize = new Sequelize('Tasks','sa','Automac@1', {
    dialect: 'mssql',
    host: 'localhost',
    port: '49758',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})


module.exports = sequelize;