/**
 * @swagger
 * components:
 *   schemas:
 *     SousTache:
 *       type: object
 *       required:
 *         - titre
 *         - complete
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID unique de la sous-tâche
 *         tache_id:
 *           type: integer
 *           description: L'ID de la tâche parent à laquelle cette sous-tâche est associée
 *         titre:
 *           type: string
 *           description: Le titre de la sous-tâche
 *         complete:
 *           type: boolean
 *           description: Indique si la sous-tâche est complétée ou non
 */

// Ancienne connexion à MySQL
const pool = require("../config/db");
// Nouvelle connexion à PostGreSQL
// const sql = require("../config/pg_db");

const SousTache = {
  // Créer une nouvelle sous-tâche
  create: async ({ tacheId, titre }) => {
    const sql = 'INSERT INTO sous_taches (tache_id, titre, complete) VALUES (?, ?, 0)';
    const [result] = await pool.query(sql, [tacheId, titre]);
    return result.insertId;
  },

  // Trouver toutes les sous-tâches par ID de tâche
  findByTaskId: async (tacheId) => {
    const sql = 'SELECT * FROM sous_taches WHERE tache_id = ?';
    const [rows] = await pool.query(sql, [tacheId]);
    return rows;
  },

  // Mettre à jour une sous-tâche
  update: async (id, updates) => {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    
    const sql = `UPDATE sous_taches SET ${fields.join(', ')} WHERE id = ?`;
    await pool.query(sql, [...values, id]);
  },

  // Changer le statut de complétion d'une sous-tâche
  toggleComplete: async (id) => {
    const sql = 'UPDATE sous_taches SET complete = NOT complete WHERE id = ?';
    await pool.query(sql, [id]);
  },

  // Supprimer une sous-tâche
  delete: async (id) => {
    const sql = 'DELETE FROM sous_taches WHERE id = ?';
    await pool.query(sql, [id]);
  },

  basculerCompleteSousTache: async (req, res) => {
    try {
      const { id } = req.params; 
      console.log(req.params); 
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

module.exports = SousTache;
