require('../Config/passportConfig');

require('../Model/userModel');
require('../Model/post-model');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const passport = require('passport');
const multer = require('multer');

var user = mongoose.model('user');
var postCreate = mongoose.model('createPost');

var jwt = require('jsonwebtoken');


// Adding new user
module.exports.addNewUser = (req, res) => {
    var newUser = new user({
        name: req.body.name,
        email: req.body.email,
        profile: req.body.profile,
        address: req.body.address,
        password: req.body.password,

        school: req.body.school,
        degree: req.body.degree,
        from: req.body.from,
        to: req.body.to,
        about: req.body.about,
        skills: req.body.skills,

        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        start: req.body.start,
        end: req.body.end,
        job: req.body.job,

        website: req.body.website,
        linkedin: req.body.linkedin,
        github: req.body.github,
        twitter: req.body.twitter,
        insta: req.body.insta,
        facebook: req.body.facebook,

    });
    return newUser.save().then((docs)=>{
        res.status(200).json({
            success: true,
            message: "User added successfully",
            data: docs
        });
    }).catch((err)=>{
        res.status(401).json({
            success: false,
            error: err.message,
            message: "Failed to add new user"
        });
    });
};

// creating post
module.exports.createPost = (req, res) =>{
  var createNewPost = new postCreate({
    user: req.params.id,
    posts: req.body.posts
  })
  return createNewPost.save().then((docs)=>{
    res.status(200).json({
        success: true,
        message: "Post created successfully",
        data: docs
    });
}).catch((err)=>{
    res.status(401).json({
        success: false,
        error: err.message,
        message: "Failed to post"
    });
});
}

//Displaying post
module.exports.selectPost = (req, res) => {
  return postCreate.find().then((docs)=>{
          res.status(200).json({
          success: true,
          data: docs,
          message: "List of Posts"
      })
  }).catch((err)=>{
      res.status(401).json({
          success: false,
          message: "Failed to load post details",
          error: err.message
      })
  })
}

// Selecting whole user
module.exports.selectWhole = (req, res) => {
  return user.findById({_id:req.params.id}).
  select('name email profile address school degree from to about skills title company location start end job website linkedin github twitter insta facebook').
  then((docs)=>{
          res.status(200).json({
          success: true,
          data: docs,
          message: "User Details"
      })
  }).catch((err)=>{
      res.status(401).json({
          success: false,
          message: "Failed to load user details",
          error: err.message
      })
  })
}


// Selecting an user basic info
module.exports.selectUser = (req, res) => {
  return user.findById({_id:req.params.id}).select('name email profile address').then((docs)=>{
          res.status(200).json({
          success: true,
          data: docs,
          message: "User Details"
      })
  }).catch((err)=>{
      res.status(401).json({
          success: false,
          message: "Failed to load user details",
          error: err.message
      })
  })
}

// Selecting an user eduaction
module.exports.selectUserEducation = (req, res) => {
  return user.findById({_id:req.params.id}).select('school degree from to about skills').then((docs)=>{
          res.status(200).json({
          success: true,
          data: docs,
          message: "User Details"
      })
  }).catch((err)=>{
      res.status(401).json({
          success: false,
          message: "Failed to load user details",
          error: err.message
      })
  })
}

// Selecting an user experience
module.exports.selectUserExperience = (req, res) => {
  return user.findById({_id:req.params.id}).select('title company location start end job').then((docs)=>{
          res.status(200).json({
          success: true,
          data: docs,
          message: "User Details"
      })
  }).catch((err)=>{
      res.status(401).json({
          success: false,
          message: "Failed to load user details",
          error: err.message
      })
  })
}


// Selecting an user socials
module.exports.selectUserSocials = (req, res) => {
  return user.findById({_id:req.params.id}).select('website linkedin github twitter insta facebook').then((docs)=>{
          res.status(200).json({
          success: true,
          data: docs,
          message: "User Details"
      })
  }).catch((err)=>{
      res.status(401).json({
          success: false,
          message: "Failed to load user details",
          error: err.message
      })
  })
}


// Token generation for authenticated user
module.exports.authenticate = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token": user.generateJWT(),
            data : user
          })
        if(info) return res.status(401).json(info);
    }) (req, res, next);
}

module.exports.userProfile = (req, res) =>{
    user.findOne({_id: req._id}).then((docs)=>{
        res.status(200).json({
            success: true,
            message: "User Found",
            data: docs
        });
    }).catch((err)=>{
        res.status(404).json({
            succes: false,
            message: "User not Found",
            error: err.message
        });
    })
}

//updating user info
module.exports.updateRecord = (req, res) =>{
  const id = req.params.id;
  const updatedData =  req.body;

  user.findByIdAndUpdate({_id:id}, {$set: updatedData}).then((docs)=>{
    return res.status(200).json({
      success: true,
      new: true,
      message: "Updated Successfully",
      data: docs
    })
  }).catch((err)=>{
    return res.status(401).json({
      success: false,
      messgae: "Failed to Update",
      error: err.message
    })
  })
}

//deleting  an user

module.exports.deleteUser = (req, res) =>{
  const id = req.params.id;
  user.findByIdAndDelete({_id:id}).then((docs)=>{
    return res.status(200).json({
      succes: true,
      message: "User delted successfully",
      data: docs
    })
  }).catch((err)=>{
    return res.status(401).json({
      success: false,
      message: "Failed to delete user",
      error: err.message
    })
  })
}
