const express = require('express');
const router = express.Router();

const { addTask, getTask} = require('../controller/tasks');

router.route('/').post(addTask).get(getTask);

module.exports = router;