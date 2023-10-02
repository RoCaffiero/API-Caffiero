const dotenv = require('dotenv');
dotenv.config();

const Server=require('./src/models/server');
const server = new Server();

server.listen(3000, '0.0.0.0');
