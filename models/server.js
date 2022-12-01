const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');


class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8081;

    // Http Server
    this.server = http.createServer(this.app);
    
    // Configuraciones de sockets
    this.io = socketio(this.server, {/*configuraciones*/});

  }
  execute () {
    // inicializar middlewares
    this.middlewares();

    this.configureSocket();

    this.server.listen(this.port, () => {
      console.log(`Server corriendo en el piuerto ${this.port}`);
    });

  } 

  middlewares () {
    // desplegar el directorio publico
    this.app.use(express.static( path.resolve( __dirname, '../public')))
  }

  configureSocket () {
    new Sockets(this.io)
  }

};


module.exports = Server;
