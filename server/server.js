const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
});



io.on('connection', socket => {
    const id = socket.handshake.query.id
    socket.join(id)
  
    socket.on('send-message', ({ members, text }) => {
        members.forEach(recipient => {
        const newRecipients = members.filter(r => r !== recipient)
        newRecipients.push(id)
        socket.broadcast.to(recipient).emit('receive-message', {
            members: newRecipients, sender: id, text
        })
      })
    })
  })

httpServer.listen(5000);