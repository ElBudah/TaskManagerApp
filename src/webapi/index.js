const express = require('express');
const router = require('./routes/routes');
const app = express();
const cors = require('cors');
const routerjwt = require('./routes/routejwt');
const { verifyJWT } = require('./controller/tasks');

app.use(express.json());
app.use(cors());

app.use('/', router);

app.use('/login', routerjwt);

const port = 5000;

app.listen(port, console.log(`The webser is running at: ${port}`))