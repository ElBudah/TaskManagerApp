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
    }

})

module.exports = Task;