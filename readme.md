#             <center> StackLab Blog Assignment


## Table of Contents


- [Introduction](#introduction)
- [Setup](#setup)
-  [Getting Started](#getting-started)
- [Blog Post Model](#blog-post-model)
- [ Swagger Documentation](#swagger_documentation)
- [Middleware](#middleware)
- [Security](#security)
- [Contributing](#contributing)
- [License](#license)

## Introduction
<span style="color:cyan;"> 
This is  a Node.js-based platform that empowers users to create, manage, and interact with blog posts. With robust CRUD operations, input validation, and middleware for enhanced functionality, this  application ensures a seamless and secure blogging experience. The implementation of request logging and error handling adds efficiency, while hashed author names and a simple authentication mechanism prioritize data security. 
</span>
<hr>
<span style="color:magenta;"> 
Explore the Swagger documentation to get started and unleash the potential of this versatile blogging platform.
</span>
<hr>
<span style="color:#F7CAC9;"> 
 An additional API has been built  GET/logs that gives logs in paginated format 
</span>

## Setup
1. **Initialize a new Node.js project:**

    ```bash
    npm init -y
    ```
2. **Install necessary packages:**

    ```bash 
    npm install express mongoose dotenv 
3. **Connect to MongoDB:**
```
    - Create a MongoDB Atlas account.
    - Set up a cluster and obtain your connection string.
   ````
## Getting Started

1. **Clone the repository:**

    ```bash
    git clone https://github.com/chandracec/Stacklab_Assign.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```
3. **Create ENV File :**
```
- create a .dotenv  file and save  variable 
- PORT= PORT_NUMBER 
- MONGO_URI = MONGODB Connection String
- SECRET_KEY = ANYKEY
```
3. **Run the application:**

    ```bash
   npm start
    ```

  The app will be accessible at [http://localhost:3000] if you will not provide port number
## Blog Post Model

The `Blog Post` model in this project is designed to store information about individual blog posts. Below is an overview of the schema and its properties.

### Properties

### 1. `title` (String)

- **Type:** String
- **Required:** Yes
- **Description:** Represents the title of the blog post.

### 2. `content` (String)

- **Type:** String
- **Required:** Yes
- **Description:** Contains the content or body of the blog post.

### 3. `author` (String + validation letters ONLY) 

- **Type:** String
- **Required:** Yes
- **Description:** Represents the author of the blog post.

### 4. `isDeleted` (Boolean, Default: false)

- **Type:** Boolean
- **Default:** false
- **Description:** Indicates whether the blog post is marked as deleted. By default, it is set to false.

### Additional Properties

- **`timestamps` (true):** Automatically adds `createdAt` and `updatedAt` timestamps to each document.

### Example

```json
{
  "title":    "Power of AI",
  "content":  "This is a sample blog post content.",
  "author":   "Chandrakant Tiwari",
  "isDeleted": false,
  "createdAt": 2023-12-01T12:00:00.000Z
  "updatedAt": 2023-12-01T12:30:00.000Z
} 
```
## Middleware
 ### 1 Logging middleware that stores each log info (request as well as response ) in a seperate DB
 ### 2  Error handler that throws error when encountered 
 ### 3 Helmet for securing HTTP Connections
## Security
### JWT Authentication when updating or deleting blog post 

##  Swagger_Documentation

### Access the Swagger documentation to explore and test the API endpoints.
![Screenshot (106)](https://github.com/chandracec/Stacklab_Assign/assets/50081484/28b0a3bc-4ec0-448d-bbcc-50a727f16998)
[Swagger Documentation](http://localhost:3000/api-docs)

Make sure your application is running when you access the Swagger documentation link.


## Contributing

If you'd like to contribute to this project, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details .
