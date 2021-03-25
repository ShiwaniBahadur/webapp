const mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  file:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now()
  }
})

mongoose.model('postUpload', postSchema);
