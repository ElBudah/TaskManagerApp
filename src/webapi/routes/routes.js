const express = require('express');
const router = express.Router();
const routerLogin = express.Router();

const { addTask, getTask, deleteTask, doneTask, jwtValidation, verifyJWT } = require('../controller/tasks');

router.route('/').post(verifyJWT,addTask).get(verifyJWT, getTask);
router.route('/delete').delete(deleteTask);
router.route('/done').delete(doneTask);


module.exports =  router;
