const SousTache = require('../modeles/modeles_sous_taches');

const controleurSousTaches = {
  obtenirSousTachesParIdTache: async (req, res) => {
    try {
      const tacheId = req.params.tacheId;
      if (!tacheId) {
        return res.status(400).json({ error: "L'ID de la tâche est requis." });
      }
      const sousTaches = await SousTache.findByTaskId(tacheId);
      res.status(200).json(sousTaches);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des sous-tâches." });
    }
  },

  creerSousTache: async (req, res) => {
    try {
      const { tacheId, titre } = req.body;
      if (!titre) {
        return res.status(400).json({ error: "Le titre de la sous-tâche est requis." });
      }
      const insertId = await SousTache.create({ tacheId, titre });
      res.status(201).json({ insertId, message: 'Sous-tâche créée avec succès' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création de la sous-tâche." });
    }
  },

  mettreAJourSousTache: async (req, res) => {
    try {
      const { id } = req.params;
      const { titre, complete } = req.body;

      if (!id || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "ID de la sous-tâche et données pour la mise à jour sont requis." });
      }

      // Exécutez la logique de mise à jour ici
      await SousTache.update(id, { titre, complete });
      res.status(200).json({ message: 'Sous-tâche mise à jour avec succès' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de la sous-tâche." });
    }
  },

  supprimerSousTache: async (req, res) => {
    try {
      const { id } = req.params; // Récupération de l'ID à partir des paramètres de l'URL

      if (!id) {
        return res.status(400).json({ error: "L'ID de la sous-tâche est requis." });
      }

      await SousTache.delete(id);
      res.status(200).json({ message: 'Sous-tâche supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de la sous-tâche." });
    }
  },
  
  basculerCompleteSousTache: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ error: "L'ID de la sous-tâche est requis pour basculer son état." });
      }
      await SousTache.toggleComplete(id);
      res.status(200).json({ message: 'Statut de la sous-tâche basculé avec succès' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors du basculement du statut de la sous-tâche." });
    }
  }
};

module.exports = controleurSousTaches;
