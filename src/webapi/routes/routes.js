const express = require('express');
const router = express.Router();

const { addTask} = require('../controller/tasks');

router.route('/').post(addTask);

module.exports = router;