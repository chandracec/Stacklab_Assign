const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isDeleted :{type: Boolean,default:false,}
}, { timestamps: true });

module.exports =mongoose.model('BlogPost', blogPostSchema);
