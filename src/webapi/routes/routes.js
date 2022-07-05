const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {

    const token = req.cookies.token;
    console.log('Valor do token: ' + token);
    jwt.verify(token, 'test123', (err, decoded) => {
        if (err) {
            console.log(err)
            return res.sendStatus(401).end();
        }
        next();
    })
}

const { addTask, getTask, deleteTask, doneTask, jwtSign, getToken, destroy } = require('../controller/tasks');

router.post('/', verifyJWT , addTask).get('/', getTask);
router.delete('/delete', deleteTask);
router.delete('/done', doneTask);

router.post('/login', jwtSign);
router.get('/token', getToken);
router.get('/destroy', destroy);


module.exports =  router;
