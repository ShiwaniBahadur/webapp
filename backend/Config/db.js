const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://webappdb:weappdbpassword@cluster0.q9sni.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{useNewUrlParser: true}, {useUnifiedTopology: true}).then(()=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log("Error in connecting to Database " + err);
})
