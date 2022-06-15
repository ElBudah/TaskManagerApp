const express = require('express');
const router = require('./routes/routes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/', router)

const port = 5000;

app.listen(port, console.log(`The webser is running at: ${port}`))