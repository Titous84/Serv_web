const express = require('express');
const router = express.Router();
const controleurUtilisateurs = require('../controleurs/controleur_utilisateurs');

/**
 * @swagger
 * /api/utilisateurs/creer:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Utilisateur'
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 apiKey:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Requête invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/creer', controleurUtilisateurs.createUser);

/**
 * @swagger
 * /api/utilisateurs/nouvelle-cle-api:
 *   post:
 *     summary: Demande une nouvelle clé API
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courriel:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nouvelle clé API générée correctement
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 newApiKey:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Requête invalide
 *       401:
 *         description: Échec de l'authentification
 *       500:
 *         description: Erreur serveur
 */
router.post('/nouvelle-cle-api', controleurUtilisateurs.requestNewApiKey);

module.exports = router;
