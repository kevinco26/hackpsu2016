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

app.get('/homepage.js',function(req,res){
   res.sendFile(__dirname + '/homepage.js');
});

http.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080');
});
