const Utilisateur = require('../modeles/modeles_utilisateurs');

const controleurUtilisateurs = {
  createUser: async (req, res) => {
    try {
      const { nom, prenom, courriel, password } = req.body;
      if (!nom || !prenom || !courriel || !password) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
      }
      const { userId, apiKey } = await Utilisateur.create({ nom, prenom, courriel, password });
      res.status(201).json({ id: userId, apiKey, message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  requestNewApiKey: async (req, res) => {
    try {
      const { courriel, password } = req.body;
      if (!courriel || !password) {
        return res.status(400).json({ error: "Courriel et mot de passe sont requis." });
      }
      const newApiKey = await Utilisateur.validateUserAndGetNewApiKey(courriel, password);
      res.status(200).json({ newApiKey, message: 'Nouvelle clé API générée correctement.' });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }  
};

module.exports = controleurUtilisateurs;
