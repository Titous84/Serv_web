const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestionnaire de Tâches API',
      version: '1.0.0',
      description: 'API pour la gestion de tâches et de sous-tâches',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header', // la clé API est passée dans le header de la requête
          name: 'Authorization' // nom du header
        }
      },
      schemas: {
        Tache: {
          type: 'object',
          required: ['titre'],
          properties: {
            id: {
              type: 'integer',
              description: 'L\'ID de la tâche'
            },
            titre: {
              type: 'string',
              description: 'Le titre de la tâche'
            },
            description: {
              type: 'string',
              description: 'La description de la tâche'
            },
            complete: {
              type: 'boolean',
              description: 'L\'état de complétion de la tâche'
            }
          }
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
