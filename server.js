const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const apiAuth = require('./src/middlewares/apiAuth');
const tachesEtSousTachesRoutes = require('./src/routes/tachesEtSousTachesRoutes');
const utilisateursRoutes = require('./src/routes/utilisateursRoutes');

const app = express();

// Active CORS pour toutes les routes
app.use(cors());

// Journalisation des requêtes
app.use(morgan('combined'));

// Parser le body des requêtes en JSON
app.use(express.json());

// Routes pour les utilisateurs - Pas de middleware d'authentification pour création et renouvellement de clé
app.use('/api/utilisateurs', utilisateursRoutes);

// Middleware d'authentification appliqué aux autres routes
app.use(apiAuth);

// Routes pour les tâches et sous-tâches - Protégées par apiAuth
app.use('/api/taches', tachesEtSousTachesRoutes);

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Server error' });
});

// Configuration de Swagger
require('./swaggerConfig')(app);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
