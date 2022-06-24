const jwt = require('jsonwebtoken');

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

const jwtValidation = async (req,res) => {
    const token = jwt.sign({userId : 1}, 'blabla', {
        expiresIn: 300
    })
    res.json({auth: true, token}) 
    
}

function verifyJWT(req,res, next){
    const token = req.headers['x-access-token'];
    jwt.verify(token, 'blabla', (err, decoded) => {
        if(err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    }) 
}

module.exports = {
    addTask, getTask, deleteTask, doneTask, jwtValidation, verifyJWT
}