
// Sección 8 => 105. EXPRESS basado en clases

require('dotenv').config();
const Server = require('./models/server');

const server = new Server();

server.listen();