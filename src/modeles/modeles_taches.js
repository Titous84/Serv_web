/**
 * @swagger
 * components:
 *   schemas:
 *     Tache:
 *       type: object
 *       required:
 *         - titre
 *         - description
 *         - date_debut
 *         - date_echeance
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID unique de la tâche
 *         utilisateur_id:
 *           type: integer
 *           description: L'ID de l'utilisateur associé à la tâche
 *         titre:
 *           type: string
 *           description: Le titre de la tâche
 *         description:
 *           type: string
 *           description: La description détaillée de la tâche
 *         date_debut:
 *           type: string
 *           format: date
 *           description: La date de début de la tâche
 *         date_echeance:
 *           type: string
 *           format: date
 *           description: La date d'échéance de la tâche
 *         complete:
 *           type: boolean
 *           description: Indique si la tâche est complétée ou non
 */
const pool = require('../config/db.js');

const Tache = {
  // Créer une nouvelle tâche
  create: async ({ utilisateurId, titre, description, date_debut, date_echeance }) => {
    const sql = `
      INSERT INTO taches (utilisateur_id, titre, description, date_debut, date_echeance, complete) 
      VALUES (?, ?, ?, ?, ?, 0)
    `;
    const [result] = await pool.query(sql, [utilisateurId, titre, description, date_debut, date_echeance]);
    return result.insertId;
  },

  findAllByUserId: async (utilisateurId, showCompleted = false) => {
    let sql = 'SELECT * FROM taches WHERE utilisateur_id = ?';
    if (!showCompleted) {
      sql += ' AND complete = 0';
    }
    const [rows] = await pool.query(sql, [utilisateurId]);
    return rows;
  },

  // Trouver une tâche par son ID
  findOne: async (id) => {
    const sql = `SELECT t.*, s.id AS sous_tache_id, s.titre AS sous_tache_titre, s.complete AS sous_tache_complete
                FROM taches t
                LEFT JOIN sous_taches s ON t.id = s.tache_id
                WHERE t.id = ?`;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      throw new Error('Tâche non trouvée');
    }
  },

  // Trouver une tâche par son ID, incluant ses sous-tâches
  findOneWithSousTaches: async (id) => {
    const sql = `SELECT t.*, s.id AS sous_tache_id, s.titre AS sous_tache_titre, s.complete AS sous_tache_complete
                 FROM taches t
                 LEFT JOIN sous_taches s ON t.id = s.tache_id
                 WHERE t.id = ?`;
    const [rows] = await pool.query(sql, [id]);
    return rows;
  },

  // Mettre à jour une tâche
  update: async (id, updates) => {
    const fields = [];
    const values = [];
    
    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
    
    const sql = `UPDATE taches SET ${fields.join(', ')} WHERE id = ?`;
    await pool.query(sql, [...values, id]);
  },

  // Changer le statut de complétion d'une tâche
  toggleComplete: async (id) => {
    const sql = 'UPDATE taches SET complete = NOT complete WHERE id = ?';
    await pool.query(sql, [id]);
  },

  // Supprimer une tâche
  delete: async (id) => {
    const sql = 'DELETE FROM taches WHERE id = ?';
    await pool.query(sql, [id]);
  }
};

module.exports = Tache;
