var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

const connectedPlayers = [false,false];


io.on('connection', function(socket){

  let playerNumber = 0;

  socket.on('player added', function(msg){

    console.log('player added');

    console.log(connectedPlayers);

    if(!connectedPlayers[0]){
      connectedPlayers[0] = true;
      socket.emit('playerNumber', 1);
      playerNumber = 0;
    }else if(!connectedPlayers[1]){
      connectedPlayers[1] = true;
      socket.emit('playerNumber', 2);
      playerNumber = 1;
    }

    if(connectedPlayers[0] && connectedPlayers[1]){
      io.emit('playersReady');
    }

  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('fire', function(msg){
    io.emit('fire', msg);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
    connectedPlayers[playerNumber] = false;
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
