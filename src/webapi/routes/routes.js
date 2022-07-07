const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    const token = req.cookies.token;

    console.log('Valor do token: ' + token);
    jwt.verify(token, 'test123', (err, decoded) => {
        if (err) {
            console.log(err)
            return res.json({value: 'invalid'}).end();
        }
        next();
    })
}

const { addTask, getTask, deleteTask, checkTask, getToken, doneTasks} = require('../controller/tasks');
const { login, logout } = require('../controller/users');

router.post('/', verifyJWT, addTask).get('/', getTask);
router.delete('/delete', deleteTask);
router.delete('/done', checkTask);
router.get('/donetasks', doneTasks);

/* router.post('/login', jwtSign); */
router.get('/token', getToken);
/* router.get('/destroy', destroy); */

//user rotes
router.post('/login', login);
router.get('/logout', logout);


module.exports = router;
