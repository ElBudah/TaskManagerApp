const express = require('express');
const routerjwt = express.Router();

const { jwtValidation } = require('../controller/tasks');

routerjwt.route('/').post(jwtValidation);

module.exports = routerjwt;