var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var player = 1;

io.on('connection', function(socket){

  console.log(player);

  socket.on('player added', function(msg){

    console.log('player'+player);
    socket.emit('playerNumber', player);
    if(player === 1){
      player = 2;
    }else{
      io.emit('playersReady');
      player = 1;
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
  });

});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
