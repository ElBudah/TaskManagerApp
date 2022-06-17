const express = require('express');
const router = express.Router();

const { addTask, getTask, deleteTask, doneTask} = require('../controller/tasks');

router.route('/').post(addTask).get(getTask);
router.route('/delete').delete(deleteTask);
router.route('/done').delete(doneTask)

module.exports = router;