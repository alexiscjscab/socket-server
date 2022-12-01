const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;

    // Http Server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    this.io = socketio(this.server, {
      /*configuraciones*/
    });
  }
  execute() {
    // inicializar middlewares
    this.middlewares();

    this.configureSocket();

    this.server.listen(this.port, () => {
      console.log(`Server corriendo en el piuerto ${this.port}`);
    });
  }

  middlewares() {
    // desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, '../public')));

    this.app.use(cors());

    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
      );
      next();
    });
  }

  configureSocket() {
    new Sockets(this.io);
  }
}

module.exports = Server;
