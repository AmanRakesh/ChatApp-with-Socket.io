var express = require('express');
var socket = require('socket.io')


//Application setup
var app = express(); // basically calling express the function we required in above line(creating the express application)
var server = app.listen(4000, function(){       // creating the server
    console.log("listening to request on port 4000\n");
});

// Static files
app.use(express.static('public'));

//socket setup
var io = socket(server); //this function takes a parameter(on which server its going to work) 

io.on('connection', function(socket){ 
    //just pass socket here, Now socket is referring to the socket provided by the connection

    console.log('made socket connection');
    //if we use socket.on directly we are using the library reference for socket.io,
    // which does not contain the function property on so we will get error.
    socket.on('chat', function(data){   //data coming from chat js client
        io.sockets.emit('chat',data);
    });

    //handle typing event
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
});
