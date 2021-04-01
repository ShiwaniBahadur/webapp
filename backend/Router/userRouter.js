var userControl = require('../Controller/userControl');
var express = require('express');
var jwthelper = require('../Config/jwtHelper');
var routes = express.Router();

// Adding new user
routes.post('/webapp/newUser', userControl.addNewUser);

// Authentication of user
routes.post('/webapp/auth', userControl.authenticate);

// verification
routes.get('webapp/profile', jwthelper.verifyToken, userControl.userProfile);

// selecting whole user info
routes.get('/webapp/user/:id', userControl.selectWhole);

// Selecting user basic info
routes.get('/webapp/userInfo/:id', userControl.selectUser);

// Selecting user education
routes.get('/webapp/userEducation/:id', userControl.selectUserEducation);

// Selecting user experience
routes.get('/webapp/userExperience/:id', userControl.selectUserExperience);

// Selecting user socials
routes.get('/webapp/userSocials/:id', userControl.selectUserSocials);

//Updating user
routes.put('/webapp/updateInfo/:id', userControl.updateRecord);

// Deleting user
routes.delete('/webapp/deleteUser/:id', userControl.deleteUser);

// create post
routes.post('/webapp/createPost/:id', userControl.createPost);

//display post
routes.get('/webapp/getPost', userControl.selectPost);

module.exports = routes;
