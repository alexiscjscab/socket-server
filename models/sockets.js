class Sockets {

  constructor (io) {
    this.io = io;

    this.socketEvent()
  }

  socketEvent () {
    // On connection
    this.io.on('connection', ( socket ) => {
      //console.log(socket.id)
      socket.on('mensaje-to-server', (data) => {
      console.log(data)
  
      // a un cliente en particular
      //socket.emit('mensaje-from-server', data)

      // a todos los clientes conectados
      this.io.emit('mensaje-from-server', data)
    })
})

  }
}


module.exports = Sockets;