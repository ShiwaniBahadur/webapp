require('./backend/Config/db');
var api = require('./backend/Router/userRouter');
var express = require('express');
var bodyparser = require('body-parser');
var cors = require('cors');

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(cors());

setTimeout(app.use('/', api), 30000);



setTimeout(app.use(express.static(__dirname+"/dist/webapp/index.html")), 30000);


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'),
  res.setHeader('Access-Control-Allow-Credentials' , true),
  res.setHeader('Access-Control-Allow-Methods' , 'GET, POST, DELETE, PUT, OPTIONS'),
  res.setHeader('Access-Control-Allow-Headers' , 'Origin, Content-Type, Accept')
})
const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, ()=>{
    console.log("Server is running at http://localhost:" + port);
})
