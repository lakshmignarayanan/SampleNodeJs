// include required header
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
var port = Number(process.env.PORT || 5000);

// specify the port number to listen
app.listen(port);

function handler (req, res) {
  fs.readFile(__dirname + '/calc.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading calc.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// create a socket connection
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on("result",function(result1){
    console.log("got result "+result1);
    console.log("Sending message "+result1["sum"]+" to all");

    // message all the open clients
    io.sockets.emit('result_display',result1);
  });
});