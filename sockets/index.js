var http = require('../index').http;
var sessionMiddleware = require('../sessionMiddleware');


const io = require('socket.io')(http);

let messages = [];
let rooms = ['Default']
messages[rooms[0]] = [];

io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res, next)
});

io.of("/rooms").on('connection', (socket) => {
  console.log('a user connected', socket.request.session.username);
  socket.room = rooms[0];
  socket.username = socket.request.session.username;
  socket.join(socket.room);
  
  /*var newUserJoined = "New user joined";*/
  
  /*socket.broadcast.emit("new user joined", newUserJoined);*/

  socket.emit("init messages", {username: socket.username, messages: messages[socket.room], rooms})
  /*messages.push(newUserJoined);*/

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('switch room', (newRoom) => {
    socket.leave(socket.room);
    socket.room = newRoom;
    socket.join(socket.room);
    socket.emit("init messages", {username: socket.username, messages: messages[socket.room], rooms})
  })

  socket.on('chat message', (message) => {
    messages[socket.room].push({sender: socket.username, message});
    io.of("/rooms").to(socket.room).emit("message broadcast", {sender: socket.username, message});
  });

  socket.on('create room', (roomName) => {
    console.log('create room');
    socket.leave(socket.room);
    rooms.push(roomName);
    io.of("/rooms").emit("new room notify", roomName);
    socket.room = roomName;
    messages[socket.room] = [];
    socket.join(socket.room);
  })
});

module.exports = http;