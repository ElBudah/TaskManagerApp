const Sequelize = require('sequelize');
const database = require('./db');

const Task = database.define('taskmanager', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    task: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
    }

})

module.exports = Task;