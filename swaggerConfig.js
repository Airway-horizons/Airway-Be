import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Swagger version
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "API documentation for your application",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // Important to specify JWT here
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3001", // Replace with your server URL
        description: "Development server",
      },
    ],
  },
  apis: ["./swaggerDocs/*.js"], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
export default swaggerDocs;
