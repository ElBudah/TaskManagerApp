const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./routes/routes');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(cookieParser())

app.use('/', router);

const port = 5000;

app.listen(port, console.log(`The webser is running at: ${port}`))