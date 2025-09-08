const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentification
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifier un utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - telEmail
 *               - mdp
 *             properties:
 *               telEmail:
 *                 type: string
 *                 example: "test@example.com"
 *               mdp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Connexion réussie, retourne un token ou les infos utilisateur
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", authController.login);

module.exports = router;
