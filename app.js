const express = require('express');
const app = express();
const cors = require('cors');
const configureRoutes = require('./route');
const handleErrors = require('./middleware/error');
const { apiResponse } = require('./middleware');
// const errorLogger = require('./logger');
const handleRequest = require('./middleware/handleRequest');

//middlewares
app.use(express.json());
app.use(cors());
app.use(handleRequest);
app.use(apiResponse);

configureRoutes(app);
// app.use(errorLogger());
app.use(handleErrors);

app.get('/', (req, res) => {
    res.send('Route is working!');
});

module.exports = app;
