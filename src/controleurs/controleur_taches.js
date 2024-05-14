const Tache = require('../modeles/modeles_taches');

const controleurTaches = {
  // Récupère la liste des tâches pour un utilisateur donné
  obtenirTaches: async (req, res) => {
    try {
      const utilisateurId = req.user.id;
      const showCompleted = req.query.showCompleted === 'true';
      const tasks = await Tache.findAllByUserId(utilisateurId, showCompleted);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la récupération des tâches." });
    }
  },

  // Crée une nouvelle tâche pour un utilisateur donné
  creerTache: async (req, res) => {
    try {
      const { titre, description, date_debut, date_echeance } = req.body;
      if (!titre ||!date_debut) {
        return res.status(400).json({ error: "Titre et date de début sont requis." });
      }
      const utilisateurId = req.user.id;
      const taskId = await Tache.create({ utilisateurId, titre, description, date_debut, date_echeance });
      res.status(201).json({ id: taskId, message: 'Tâche créée avec succès' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la création de la tâche." });
    }
  },
  
  // Affiche les détails d'une tâche spécifique
  afficherDetailsTache: async (req, res) => {
    try {
      const { tacheId } = req.params;
      const tache = await Tache.findOne(tacheId);
      res.status(200).json(tache);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  // Met à jour une tâche spécifique avec de nouvelles informations
  mettreAJourTache: async (req, res) => {
    try {
      const { tacheId } = req.params;
      const updates = req.body;
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "Aucune donnée fournie pour la mise à jour." });
      }
      await Tache.update(tacheId, updates);
      res.status(200).json({ message: 'Tâche mise à jour avec succès' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la mise à jour de la tâche." });
    }
  },

  // Supprime une tâche spécifique
  supprimerTache: async (req, res) => {
    try {
      const { tacheId } = req.params;
      await Tache.delete(tacheId);
      res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: "Erreur lors de la suppression de la tâche." });
    }
  }
};

module.exports = controleurTaches;