require('./backend/Config/db');
var api = require('./backend/Router/userRouter');
var express = require('express');
var cors = require('cors');
const path = require('path');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const port = process.env.PORT || 3000;

<<<<<<< HEAD
app.use('/', api);

=======
>>>>>>> 8a5f51931b1884501b46f6b49a322540667d7a23
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
  res.setHeader('Access-Control-Allow-Credentials' , true),
  res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, DELETE, PUT, OPTIONS'),
  res.setHeader('Access-Control-Allow-Headers' , 'Origin, Content-Type, Accept')
})

<<<<<<< HEAD

app.use(express.static(__dirname + "/dist/webapp1/index.html"));
=======
app.use('/', api);

app.use(express.static(__dirname+"/dist/webapp/index.html"));

>>>>>>> 8a5f51931b1884501b46f6b49a322540667d7a23


app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname + '/dist/webapp/index.html'));
})


app.listen(port, ()=>{
    console.log("Server is running at http://localhost:" + port);
})
