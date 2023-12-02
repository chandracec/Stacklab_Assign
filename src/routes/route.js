const express = require("express");
//handler function import
const {
  createBlog,
  getBlog,
  getBlogById,
  updateBlogById,
  deleteBlogById,
  getLogs
} = require("../controller/controller");
const {authenticateJWT} = require('../middleware/authentication')
const router = express.Router();

// Swagger documentation along with routes are there . I tried to put swagger documentation in a seperate folder but  i was unable to do so as it conflicted with the try out feature in /api-docs documentation of OPENAPI . 

//==================================================================================================
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
 *         headers:
 *           x-token:
 *             description: Token for authentication
 *             schema:
 *               type: string
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             example:
 *               error: Please enter a valid name. Only letters are allowed.
 */

// Create new BLOG
router.post("/create", createBlog);
//======================================================================================================
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

//Get all BLOGS
router.get("/getBlog", getBlog);
//===================================================================================================
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
//Get blog by ID
router.get("/getBlog/:blogId", getBlogById);
 //===================================================================================================
/**
 * @swagger
 * tags:
 *   name: BlogPosts
 *   description: Blog post operations
 * securityDefinitions:
 *   JWT:
 *     type: apiKey
 *     name: x-token
 *     in: header
 */

/**
 * @swagger
 * /update/{blogId}:
 *   put:
 *     summary: Update a blog post by ID JWT Authentication enabled
 *     tags: [BlogPosts]
 *     security:
 *       - JWT: []
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
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized - Invalid or missing token
 *       '404':
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               error: Blog doesn't exist with this ID
 */

// Update blog by ID authentication enabled
router.put("/update/:blogId", authenticateJWT, updateBlogById);
//====================================================================================================
/**
 * @swagger
 * /delete/{blogId}:
 *   delete:
 *     summary: Delete a blog post by ID JWT authentication enabled
 *     tags: [BlogPosts]
 *     security:
 *       - JWT: []
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
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized - Invalid or missing token
 *       '404':
 *         description: Blog not found
 *         content:
 *           application/json:
 *             example:
 *               error: Blog doesn't exist with this ID
 */

// Delete blog by ID authentication enabled
router.put("/delete/:blogId", authenticateJWT, deleteBlogById);

//===================================================================================================
/**
 * @swagger
 * /logs:
 *   get:
 *     summary: Retrieve logs with pagination
 *     tags: [BlogPosts]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number for pagination
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of logs per page (default is 10)
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: List of logs
 *         content:
 *           application/json:
 *             example:
 *               - method: GET
 *                 url: /getBlog
 *                 status: 200
 *                 timestamp: 2023-12-01T12:00:00Z
 *               - method: POST
 *                 url: /create
 *                 status: 200
 *                 timestamp: 2023-12-01T12:10:00Z
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Internal Server Error
 */
//Get logs with query as page = pagenumber - limit is 10 by default
router.get('/logs', getLogs);


module.exports = router;
