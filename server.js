var app = require("express")();
var http = require('http').Server(app);


app.get('/',function(req,res){
   res.sendFile(__dirname + '/homepage.html');
});


http.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080');
});
