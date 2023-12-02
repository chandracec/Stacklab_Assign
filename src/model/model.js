const mongoose = require('mongoose');

 
//The schema includes properties such as title, content, author, and isDeleted.
//The 'timestamps: true' option adds createdAt and updatedAt fields to track creation and modification 

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
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// Create a MongoDB model for blog posts using the defined schema.
//This model will be used to interact with the 'blogposts' collection in MongoDB.

module.exports = mongoose.model('BlogPost', blogPostSchema);

