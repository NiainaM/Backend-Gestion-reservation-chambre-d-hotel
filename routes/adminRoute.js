const router = require("express").Router();
const controller = require("../controllers/adminController");

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Gestion des administrateurs
 */

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Créer un nouvel administrateur
 *     tags: [Admins]
 *     responses:
 *       201:
 *         description: Administrateur créé avec succès
 */
router.post("/", controller.create);

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Récupérer tous les administrateurs
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: Liste des administrateurs
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Récupérer un administrateur par ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Administrateur trouvé
 *       404:
 *         description: Administrateur non trouvé
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Mettre à jour un administrateur par ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Administrateur mis à jour
 *       404:
 *         description: Administrateur non trouvé
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Supprimer un administrateur par ID
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Administrateur supprimé
 *       404:
 *         description: Administrateur non trouvé
 */
router.delete("/:id", controller.delete);

module.exports = router;
