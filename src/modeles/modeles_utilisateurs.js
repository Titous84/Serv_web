/**
 * @swagger
 * components:
 *   schemas:
 *     Utilisateur:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - courriel
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: L'ID unique de l'utilisateur
 *         nom:
 *           type: string
 *           description: Le nom de l'utilisateur
 *         prenom:
 *           type: string
 *           description: Le prénom de l'utilisateur
 *         courriel:
 *           type: string
 *           description: L'adresse courriel de l'utilisateur
 *         cle_api:
 *           type: string
 *           description: La clé API attribuée à l'utilisateur pour authentification
 *         password:
 *           type: string
 *           description: Le mot de passe de l'utilisateur, stocké sous forme hachée
 */
const pool = require('../config/db.js');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const Utilisateur = {
  create: async ({ nom, prenom, courriel, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const apiKey = uuid.v4(); // Génère une nouvelle clé API lors de la création de l'utilisateur
    const sql = `
      INSERT INTO utilisateurs (nom, prenom, courriel, cle_api, password) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sql, [nom, prenom, courriel, apiKey, hashedPassword]);
    return { userId: result.insertId, apiKey };
  },

  validateUserAndGetNewApiKey: async (courriel, password) => {
    const sql = 'SELECT id, password FROM utilisateurs WHERE courriel = ?';
    const [users] = await pool.query(sql, [courriel]);
    if (users.length > 0) {
      const { id, password: hashedPassword } = users[0];
      const passwordIsValid = await bcrypt.compare(password, hashedPassword);
      if (passwordIsValid) {
        const newApiKey = uuid.v4();
        const updateSql = 'UPDATE utilisateurs SET cle_api = ? WHERE id = ?';
        await pool.query(updateSql, [newApiKey, id]);
        return newApiKey;
      }
    }
    throw new Error('Authentication failed');
  }
};

module.exports = Utilisateur;
