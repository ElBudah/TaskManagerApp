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

const getTask = async (req,res) => {
    const database = require('../db');
    const Task = require('../tasks');

    await database.sync();

    const AllData = await Task.findAll({
        raw: true
    })
    
    console.log(AllData)

    return res.json(AllData);
}

module.exports = {
    addTask, getTask
}