const BlogPost = require('../model/model');
const validation = require('../utils/validation');
const logModel = require('../model/log');
const { generateToken } = require('../middleware/authentication');

const bcrypt = require('bcrypt');
const saltRounds = 10;
//===================================================================================================
// Create a new blog post
async function createBlog(req, res, next) {
  try {
    const { title, content, author } = req.body;

    // Check for empty body input
    if (!title || !content || !author) {
      return res.status(400).json({ error: "Please provide valid data for title, content, and author." });
    }

    // Validate author name
    if (!validation.validateName(author)) {
      return res.status(400).json({ error: "Please enter a valid name. Only letters are allowed." });
    }

    // Hash the author's name
    const hashedAuthor = await bcrypt.hash(author, saltRounds);

    const blogPost = await BlogPost.create({ title, content, author: hashedAuthor });

    // Generate JWT token
    const token = generateToken(blogPost._id);

    // Set the token in the response header
    res.setHeader('x-token', `${token}`);

    res.status(201).json(blogPost);
  } catch (err) {
    next(err);
  }
}
//====================================================================================================
// Retrieve all blog posts
async function getBlog(req, res, next) {
  try {
    const blogPosts = await BlogPost.find({ isDeleted: false }, { isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 });
    res.status(200).json(blogPosts);
  } catch (err) {
    console.error('Error retrieving blog posts:', err);
    next(err);
  }
}
//=======================================================================================================
// Retrieve a specific blog post by ID
async function getBlogById(req, res, next) {
  try {
    const blogId = req.params.blogId;
    const blogPost = await BlogPost.findById(blogId, { isDeleted: false });

    if (!blogPost) {
      return res.status(404).json({ error: "Blog doesn't exist with this ID" });
    }

    res.status(200).json(blogPost);
  } catch (err) {
    console.error('Error retrieving blog post by ID:', err);
    next(err);
  }
}
//=======================================================================================================
 // Update a blog post by ID
async function updateBlogById(req, res, next) {
  try {
    const { title, content, author } = req.body;
    const blogId = req.params.blogId;

    // Check for empty body input
    if (!title && !content && !author) {
      return res.status(400).json({ error: "Please provide valid data for title, content, or author to update." });
    }

    // Hash the author's name
    const hashedAuthor = author ? await bcrypt.hash(author, saltRounds) : undefined;

    // Modify the query to exclude deleted blogs
    const updateObject = {};
    if (title) updateObject.title = title;
    if (content) updateObject.content = content;
    if (author) updateObject.author = hashedAuthor;

    // Exclude blogs with isDeleted true
    const updatedBlogPost = await BlogPost.findOneAndUpdate(
      { _id: blogId, isDeleted: false },
      updateObject,
      { new: true }
    );

    if (!updatedBlogPost) {
      return res.status(404).json({ error: "Blog doesn't exist with this ID or has been deleted" });
    }

    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    console.error('Error updating blog post by ID:', err);
    next(err);
  }
}

//====================================================================================================
// Delete a blog post by ID
async function deleteBlogById(req, res, next) {
  try {
    const blogId = req.params.blogId;
    const deletedBlogPost = await BlogPost.findByIdAndUpdate(blogId, { isDeleted: true });

    if (!deletedBlogPost) {
      return res.status(404).json({ error: "Blog doesn't exist with this ID" });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog post by ID:', err);
    next(err);
  }
}

//==================================================================================================
 // Get logs with pagination (default page = 1, default limit = 10)
const getLogs = async (req, res) => {
  try {
    // Parse page and limit from query parameters or use default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the number of documents to skip based on the page and limit
    const skip = (page - 1) * limit;

    // Fetch logs from the database, sorted by timestamp in descending order
    const logs = await logModel.find()
      .skip(skip)
      .limit(limit);

    // Send the logs and pagination metadata as JSON response
    res.json({
      logs
    });
  } catch (error) {
    // Handle errors during log retrieval
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Export the getLogs function
module.exports = { getLogs };

//===================================================================================================
module.exports = {
  createBlog,
  getBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  getLogs
};
