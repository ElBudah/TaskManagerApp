const addTask = async (req,res) => {
    const database = require('../db');
    const Task = require('../tasks');

    await database.sync();

    let taksName = req.body.task;

    Task.create({
        task: taksName
    })

    res.send('ok');
}

module.exports = {
    addTask
}