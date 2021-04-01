const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    profile:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },


    school:{
      type: String,
    },
    degree:{
      type: String
    },
    from:{
      type: String
    },
    to:{
      type: String
    },
    about:{
      type: String
    },
    skills:{
      type: String
    },


    title:{
      type: String
    },
    company:{
      type: String
    },
    location:{
      type: String
    },
    start:{
      type: String
    },
    end:{
      type: String
    },
    job:{
      type: String
    },


    website:{
      type: String
    },
    linkedin:{
      type: String
    },
    github:{
      type: String
    },
    twitter:{
      type: String
    },
    insta:{
      type: String
    },
    facebook:{
      type: String
    },

    password:{
      type: String,
      required: true
    },
    saltString: String
});

userSchema.pre('save', function(next){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash)=>{
            this.password = hash;
            this.saltString = salt;
            next();
        })
    })
})


userSchema.methods.verifyPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateJWT = function(){
  return jwt.sign({
    _id:this._id
  }, "JWTAuthenticate",
  {
      expiresIn: "60m"
  })
}

mongoose.model('user', userSchema);
