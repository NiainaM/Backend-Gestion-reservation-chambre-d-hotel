const router = require("express").Router();
const controller = require("../controllers/reservationController");

/**
 * @swagger
 * tags:
 *   name: Réservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     summary: Créer une nouvelle réservation
 *     tags: [Réservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clientId
 *               - chambreId
 *               - dateDebut
 *               - dateFin
 *             properties:
 *               clientId:
 *                 type: integer
 *                 example: 1
 *               chambreId:
 *                 type: integer
 *                 example: 2
 *               dateDebut:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-22"
 *               dateFin:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-25"
 *               statut:
 *                 type: string
 *                 example: "confirmée"
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 */
router.post("/", controller.create);

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Réservations]
 *     responses:
 *       200:
 *         description: Liste des réservations
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     summary: Récupérer une réservation par ID
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation non trouvée
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     summary: Mettre à jour une réservation par ID
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientId:
 *                 type: integer
 *               chambreId:
 *                 type: integer
 *               dateDebut:
 *                 type: string
 *                 format: date
 *               dateFin:
 *                 type: string
 *                 format: date
 *               statut:
 *                 type: string
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       404:
 *         description: Réservation non trouvée
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     summary: Supprimer une réservation par ID
 *     tags: [Réservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Réservation supprimée
 *       404:
 *         description: Réservation non trouvée
 */
router.delete("/:id", controller.delete);

module.exports = router;
