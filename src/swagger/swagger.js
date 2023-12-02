const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blogging Platform API',
      version: '1.0.0',
      description: 'API documentation for the Blogging Platform Assignment (StackLab)',
    },
    servers: [
      {
        // Assuming the server is running on the specified port
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  // Include routes for generating Swagger documentation
  apis: ['./src/routes/*.js'],
};

// Generate Swagger specs
const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
