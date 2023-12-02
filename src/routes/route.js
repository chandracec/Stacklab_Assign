const express = require("express");
const {
  createBlog,
  getBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} = require("../controller/controller");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: BlogPosts
 *   description: Blog post operations
 */

/**
 * @swagger
 * /create:
 *   post:
 *     summary: Create a new blog post
 *     tags: [BlogPosts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog post created successfully
 *         content:
 *           application/json:
 *             example:
 *               title: Sample Blog Post
 *               content: This is a sample blog post.
 *               author: John Doe
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: Please enter a valid name. Only letters are allowed.
 */
router.post("/create", createBlog);

/**
 * @swagger
 * /getBlog:
 *   get:
 *     summary: Retrieve all blog posts
 *     tags: [BlogPosts]
 *     responses:
 *       '200':
 *         description: List of blog posts
 *         content:
 *           application/json:
 *             example:
 *               - title: Sample Blog Post 1
 *                 content: This is the first sample blog post.
 *                 author: John Doe
 *               - title: Sample Blog Post 2
 *                 content: This is the second sample blog post.
 *                 author: Jane Doe
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
router.get("/getBlog", getBlog);

/**
 * @swagger
 * /getBlog/{blogId}:
 *   get:
 *     summary: Retrieve a specific blog post by ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog post retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               title: Sample Blog Post
 *               content: This is a sample blog post.
 *               author: John Doe
 *       '404':
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               error: Blog doesn't exist with this ID
 */
router.get("/getBlog/:blogId", getBlogById);

/**
 * @swagger
 * /update/{blogId}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Blog post updated successfully
 *         content:
 *           application/json:
 *             example:
 *               title: Updated Blog Post
 *               content: This blog post has been updated.
 *               author: John Doe
 *       '404':
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               error: Blog doesn't exist with this ID
 */
router.put("/update/:blogId", updateBlogById);

/**
 * @swagger
 * /delete/{blogId}:
 *   put:
 *     summary: Delete a blog post by ID
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog post
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Blog post deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Blog post deleted successfully
 *       '404':
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               error: Blog doesn't exist with this ID
 */
router.delete("/delete/:blogId", deleteBlogById);

module.exports = router;
