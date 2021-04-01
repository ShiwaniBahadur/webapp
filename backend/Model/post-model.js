const mongoose = require('mongoose');

var createPostSchema = mongoose.Schema({
  posts:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now()
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

mongoose.model('createPost', createPostSchema);
