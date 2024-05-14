const express = require('express');
const router = express.Router();
const tachesController = require('../controleurs/controleur_taches');
const sousTachesController = require('../controleurs/controleur_sous_taches');

/**
 * @swagger
 * /api/taches:
 *   get:
 *     summary: Récupère une liste de toutes les tâches
 *     responses:
 *       200:
 *         description: Une liste de tâches retournée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tache'
 */
router.get('/', tachesController.obtenirTaches);

/**
 * @swagger
 * /api/taches:
 *   post:
 *     summary: Crée une nouvelle tâche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tache'
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 */
router.post('/', tachesController.creerTache);

/**
 * @swagger
 * /api/taches/{tacheId}:
 *   put:
 *     summary: Met à jour une tâche spécifique par son ID
 *     parameters:
 *       - in: path
 *         name: tacheId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tâche à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Tache'
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès
 *       404:
 *         description: Tâche non trouvée
 */
router.put('/:tacheId', tachesController.mettreAJourTache);

/**
 * @swagger
 * /api/taches/{tacheId}:
 *   delete:
 *     summary: Supprime une tâche spécifique par son ID
 *     parameters:
 *       - in: path
 *         name: tacheId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tâche à supprimer
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès
 *       404:
 *         description: Tâche non trouvée
 */
router.delete('/:tacheId', tachesController.supprimerTache);

/**
 * @swagger
 * /api/taches/{tacheId}/sous-taches:
 *   get:
 *     summary: Obtenir toutes les sous-tâches associées à une tâche spécifique
 *     parameters:
 *       - in: path
 *         name: tacheId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tâche parent
 *     responses:
 *       200:
 *         description: Liste des sous-tâches récupérée avec succès
 *       404:
 *         description: Tâche non trouvée
 */
router.get('/:tacheId/sous-taches', sousTachesController.obtenirSousTachesParIdTache);

/**
 * @swagger
 * /api/taches/{tacheId}/sous-taches:
 *   post:
 *     summary: Crée une sous-tâche pour une tâche spécifique
 *     parameters:
 *       - in: path
 *         name: tacheId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tâche parent pour laquelle la sous-tâche est créée
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SousTache'
 *     responses:
 *       201:
 *         description: Sous-tâche créée avec succès
 *       404:
 *         description: Tâche parent non trouvée
 */
router.post('/:tacheId/sous-taches', sousTachesController.creerSousTache);

/**
 * @swagger
 * /api/taches/sous-taches/{id}:
 *   patch:
 *     summary: Met à jour une sous-tâche spécifique par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sous-tâche à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SousTache'
 *     responses:
 *       200:
 *         description: Sous-tâche mise à jour avec succès
 *       404:
 *         description: Sous-tâche non trouvée
 */
router.patch('/sous-taches/:id', sousTachesController.mettreAJourSousTache);

/**
 * @swagger
 * /api/taches/sous-taches/toggle-complete/{id}:
 *   put:
 *     summary: Basculer l'état de complétion d'une sous-tâche
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sous-tâche dont l'état de complétion doit être basculé
 *     responses:
 *       200:
 *         description: État de la sous-tâche basculé avec succès
 *       404:
 *         description: Sous-tâche non trouvée
 */
router.put('/sous-taches/toggle-complete/:id', sousTachesController.basculerCompleteSousTache);

/**
 * @swagger
 * /api/taches/sous-taches/{id}:
 *   delete:
 *     summary: Supprime une sous-tâche spécifique par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la sous-tâche à supprimer
 *     responses:
 *       200:
 *         description: Sous-tâche supprimée avec succès
 *       404:
 *         description: Sous-tâche non trouvée
 */
router.delete('/sous-taches/:id', sousTachesController.supprimerSousTache);

module.exports = router;
