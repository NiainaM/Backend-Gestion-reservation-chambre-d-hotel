const router = require("express").Router();
const controller = require("../controllers/chambreController");

/**
 * @swagger
 * tags:
 *   name: Chambres
 *   description: Gestion des chambres
 */

/**
 * @swagger
 * /chambres:
 *   post:
 *     summary: Créer une nouvelle chambre
 *     tags: [Chambres]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numero
 *               - type
 *               - prix
 *             properties:
 *               numero:
 *                 type: string
 *                 example: "101"
 *               type:
 *                 type: string
 *                 example: "Suite"
 *               prix:
 *                 type: number
 *                 example: 120.50
 *     responses:
 *       201:
 *         description: Chambre créée avec succès
 */
router.post("/", controller.create);

/**
 * @swagger
 * /chambres:
 *   get:
 *     summary: Récupérer toutes les chambres
 *     tags: [Chambres]
 *     responses:
 *       200:
 *         description: Liste des chambres
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /chambres/{id}:
 *   get:
 *     summary: Récupérer une chambre par ID
 *     tags: [Chambres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chambre trouvée
 *       404:
 *         description: Chambre non trouvée
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /chambres/{id}:
 *   put:
 *     summary: Mettre à jour une chambre par ID
 *     tags: [Chambres]
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
 *               numero:
 *                 type: string
 *               type:
 *                 type: string
 *               prix:
 *                 type: number
 *     responses:
 *       200:
 *         description: Chambre mise à jour
 *       404:
 *         description: Chambre non trouvée
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /chambres/{id}:
 *   delete:
 *     summary: Supprimer une chambre par ID
 *     tags: [Chambres]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chambre supprimée
 *       404:
 *         description: Chambre non trouvée
 */
router.delete("/:id", controller.delete);
router.get('/status/:status', controller.findByStatus);
router.get('/types/:types', controller.findByTypes);

module.exports = router;
