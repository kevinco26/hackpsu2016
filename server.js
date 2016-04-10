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
  name:       		 String,     //username
  email:  			 String,
  stackOverflowData: JSON
});

var user = mongoose.model('Users',Schema);
//var jsonObject; 

app.post('/hackpsu/insert',function(req, res) {

  console.log(req.body.stackoverflow);

  // new user({
  // name:  "Kevin",
  // email:       "kevinco@gmail.com",
  // stackOverflowData:req.body
  // }).save(function(err,doc){
  //   if(err)res.json(err);
  // });

}); 


app.get('/',function(req,res){
   res.sendFile(__dirname + '/homepage.html');
});



app.get('/form',function(req,res){
   res.sendFile(__dirname + '/form.html');
});


http.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080');
});
