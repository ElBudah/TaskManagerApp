const addTask = async (req,res) => {
    const database = require('../db');
    const Task = require('../tasks');

    await database.sync();

    let taksName = req.body.task;

    await Task.create({
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

const deleteTask = async (req,res) => {
    const database = require('../db');
    const Task = require('../tasks');
    await database.sync();

    
    let getId = req.body.idselected;

    console.log(getId);

    await Task.destroy({
        where: {
            id: getId
        }
    })

    res.send('ok');
    
}

const doneTask = async (req,res) => {
    const database = require('../db');
    const Task = require('../tasks');
    await database.sync();

    let getId = req.body.idselected;
    let TaskDone = false;
    if (getId !== 0){
        TaskDone = true
    }
    
    console.log(getId);

    await Task.update(
        {status : TaskDone},
        {where: {
            id: getId
        }}
    )

    res.send('ok');
}


module.exports = {
    addTask, getTask, deleteTask, doneTask
}