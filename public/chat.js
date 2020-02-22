// here we will make connection with server and client
var socket = io.connect('http://localhost:4000'); // we have loaded the socket library we have access to the io variable.

// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');


// Emit events
btn.addEventListener('click', function(){  // these functionalities comes from vanilla javascript
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
  });

  message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
  });
  
  // Listen for events
  //chat event
  socket.on('chat', function(data){
      feedback.innerHTML='';
      output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  });
  //typing event
  socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>'+ data+ ' is typing..........</em></p>';
  });