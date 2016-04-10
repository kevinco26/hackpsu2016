var app = require("express")();
var http = require('http').Server(app);


app.get('/',function(req,res){
   res.sendFile(__dirname + '/homepage.html');
});

app.get('/homepage.css',function(req,res){
   res.sendFile(__dirname + '/homepage.css');
});

app.get('/assets/bg.png',function(req,res){
   res.sendFile(__dirname + '/assets/bg.png');
});

app.get('/assets/logo.png',function(req,res){
   res.sendFile(__dirname + '/assets/logo.png');
});

app.get('/assets/trophy.png',function(req,res){
   res.sendFile(__dirname + '/assets/trophy.png');
});

app.get('/assets/rubiks.png',function(req,res){
   res.sendFile(__dirname + '/assets/rubiks.png');
});

app.get('/assets/handshake.png',function(req,res){
   res.sendFile(__dirname + '/assets/handshake.png');
});

app.get('/homepage.js',function(req,res){
   res.sendFile(__dirname + '/homepage.js');
});

app.get('/bootbox.min.js',function(req,res){
   res.sendFile(__dirname + '/bootbox.min.js');
});

http.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080');
});
