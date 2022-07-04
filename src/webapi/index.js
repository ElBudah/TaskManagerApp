const express = require('express');
const router = require('./routes/routes');
const app = express();
const cors = require('cors');
const cookie = require('cookie-parser')

app.use(express.json());
app.use(cors());
app.use(cookie())

app.use('/', router);

const port = 5000;

app.listen(port, console.log(`The webser is running at: ${port}`))