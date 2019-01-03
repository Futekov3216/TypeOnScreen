const port = 3001;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send("HELLO");
});

io.on('connection', function (socket) {
        console.log("NEW USER")
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.emit("data", true);
});

http.listen(port, function () {
    console.log(`listening on :${port}`);
});