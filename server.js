var app = require("express")();
var mongoose = require('mongoose');

var bodyParser = require('body-parser');


var http = require('http').Server(app);

// var cors = require('cors');

// app.use(cors());
 
// app.use(cors({
// 	allowedOrigins: [
// 		'github.com'
// 	]
// }))


app.use(bodyParser.urlencoded({ extended: true })); 



mongoose.connect('mongodb://localhost/Hackpsu2016');


// DATABASE INTEGRATION

var Schema = new mongoose.Schema({
          username: String,
          fname:    String,
          lname:    String,
          email:    String,
          password: String,
          address:  String,
          city:     String,
          state:    String,
          zip:      Number,
          website:  String,
          stackoverflow: Number,
          githubUser:   String
});

var user = mongoose.model('Users',Schema);
//var jsonObject; 

app.post('/hackpsu/insert',function(req, res) {

  new user({
    
      username:req.body.username,
      fname:req.body.fname,
      lname:req.body.lname,
      email:req.body.email,
      password:req.body.password,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip:req.body.zip,
      website:req.body.website,
      stackoverflow:req.body.idNumber,
      githubUser:req.body.github

  }).save(function(err,doc){
    if(err){
      console.log(err);
      res.json(err);
    }
    else
      res.json({status:200});

  });

}); 


app.get('/',function(req,res){
   res.sendFile(__dirname + '/homepage.html');
});

app.get('/homepage.css',function(req,res){
   res.sendFile(__dirname + '/homepage.css');
});

app.get('/profile/:user',function(req,res){
   res.sendFile(__dirname + '/profile.html');
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

app.get('/jobPosting',function(req,res){
   res.sendFile(__dirname + '/jobPosting.html');
});

app.get('/bootbox.min.js',function(req,res){
   res.sendFile(__dirname + '/bootbox.min.js');
});


app.get('/form',function(req,res){
   res.sendFile(__dirname + '/form.html');
});


http.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080');
});
