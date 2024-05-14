const db = require('../config/db');

async function apiAuth(req, res, next) {
    const apiKey = req.headers['x-api-key'];

    // Permettre un accès non authentifié à la documentation Swagger
    if (req.path.startsWith('/api-docs')) {
        return next();
    }

    // Permettre la création d'une clé API
    if (req.path === '/api/utilisateurs/new-apikey') {
        return next();
    }

    // Vérifier que la clé API est présente
    if (!apiKey) {
        return res.status(403).json({ success: false, message: 'La clé API est requise' });
    }

    // Vérifier que la clé API est valide
    try {
        const [results] = await db.query("SELECT * FROM utilisateurs WHERE cle_api = ?", [apiKey]);
        if (results.length > 0) {
            req.user = results[0];
            next();
        } else {
            res.status(403).json({ success: false, message: 'Non autorisé' });
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de la clé API:', error);
        res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
    }
}

module.exports = apiAuth;
