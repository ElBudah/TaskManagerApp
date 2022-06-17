const express = require('express');
const router = express.Router();

const { addTask, getTask, deleteTask} = require('../controller/tasks');

router.route('/').post(addTask).get(getTask).delete(deleteTask);

module.exports = router;