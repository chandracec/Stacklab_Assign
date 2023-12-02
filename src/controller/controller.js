const BlogPost = require('../model/model');
const validation = require('../utils/validation');

// Create a new blog post
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function createBlog(req, res, next) {
  try {
    const { title, content, author } = req.body;

    // Validate author name
    if (!validation.validateName(author)) {
      return res.status(400).json({ error: "Please enter a valid name. Only letters are allowed." });
    }

    // Hash the author's name
    const hashedAuthor = await new Promise((resolve, reject) => {
      bcrypt.hash(author, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });

    const blogPost = await BlogPost.create({ title, content, author: hashedAuthor });
    res.status(201).json(blogPost); // 201 Created
  } catch (err) {
    next(err);
  }
}

// Retrieve all blog posts
async function getBlog(req, res, next) {
  try {
    const blogPosts = await BlogPost.find({ isDeleted: false }, { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    res.status(200).json(blogPosts); // 200 OK
  } catch (err) {
    next(err);
  }
}

// Retrieve a specific blog post by ID
async function getBlogById(req, res, next) {
  try {
    const blogId = req.params.blogId;
    const blogPost = await BlogPost.findById(blogId, { isDeleted: false });
    if (!blogPost) {
      return res.status(404).json({ error: "Blog doesn't exist with this ID" }); // 404 Not Found
    }
    res.status(200).json(blogPost); // 200 OK
  } catch (err) {
    next(err);
  }
}

// Update a blog post by ID
async function updateBlogById(req, res, next) {
  try {
    const { title, content, author } = req.body;
    const blogId = req.params.blogId;

    // Hash the author's name
    const hashedAuthor = await new Promise((resolve, reject) => {
      bcrypt.hash(author, saltRounds, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });

    const updateObject = {};
    if (title) updateObject.title = title;
    if (content) updateObject.content = content;
    if (author) updateObject.author = hashedAuthor;

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      blogId,
      updateObject,
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ error: "Blog doesn't exist with this ID" }); // 404 Not Found
    }

    res.status(200).json({ message: "Blog updated successfully" }); // 200 OK
  } catch (err) {
    next(err);
  }
}

// Delete a blog post by ID
async function deleteBlogById(req, res, next) {
  try {
    const blogId = req.params.blogId;
    const deletedBlogPost = await BlogPost.findByIdAndUpdate(blogId, { isDeleted: true });

    if (!deletedBlogPost) {
      return res.status(404).json({ error: "Blog doesn't exist with this ID" }); // 404 Not Found
    }

    res.status(200).json({ message: 'Blog post deleted successfully' }); // 200 OK
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createBlog,
  getBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById
};


