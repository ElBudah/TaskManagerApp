const jwt = require('jsonwebtoken');

const addTask = async (req, res) => {
    const database = require('../db');
    const Task = require('../tasks');

    await database.sync();

    let taksName = req.body.task;

    await Task.create({
        task: taksName
    })

    res.send('ok');
}

const getTask = async (req, res) => {

    const database = require('../db');
    const Task = require('../tasks');

    await database.sync();

    const AllData = await Task.findAll({
        raw: true
    })

    console.log(AllData)

    return res.json(AllData);
}

const deleteTask = async (req, res) => {
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

const doneTask = async (req, res) => {
    const database = require('../db');
    const Task = require('../tasks');
    await database.sync();

    let getId = req.body.idselected;
    let TaskDone = false;
    if (getId !== 0) {
        TaskDone = true
    }

    console.log(getId);

    await Task.update(
        { status: TaskDone },
        {
            where: {
                id: getId
            }
        }
    )

    res.send('ok');
}

const jwtSign = async (req, res) => {

    let txtName = req.body.txtName;
    let txtPassword = req.body.txtPassword;

    console.log(txtName);
    console.log(txtPassword);

    if (txtName == 'Ricardo' || txtPassword == 'teste') {
        const token = jwt.sign({ userID: 1 }, 'test123', { expiresIn: 7000 })
        console.log(token)
        res.cookie('token', token, {
            httpOnly: true,
        }).send(token);

    }else{
        res.json({value: 'zero'})
    }


}

const getToken = async (req, res) => {
    console.log("O valor do token é: " + req.cookies.token)
    res.json({value: req.cookies.token});
}

const destroy = async (req, res) => {
    res.clearCookie('token').send('ok')
}


module.exports = {
    addTask, getTask, deleteTask, doneTask, jwtSign, getToken, destroy
}