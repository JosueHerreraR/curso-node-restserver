
// Sección 8 => 104. Iniciando el proyecto - RESTServer

/*
require('dotenv').config();

const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Home Page')
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto:', process.env.PORT);
});
*/

// Sección 8 => 105. EXPRESS basado en clases

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();