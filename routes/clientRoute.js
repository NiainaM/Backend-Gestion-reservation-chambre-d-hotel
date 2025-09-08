// routes/clientRoute.js
const router = require("express").Router();
const controller = require("../controllers/clientController");

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: Gestion des clients
 */

/**
 * @swagger
 * /clients:
 *   post:
 *     summary: Créer un nouveau client
 *     tags: [Clients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenoms
 *               - email
 *               - tel
 *               - mdp
 *             properties:
 *               nom:
 *                 type: string
 *               prenoms:
 *                 type: string
 *               email:
 *                 type: string
 *               tel:
 *                 type: string
 *               mdp:
 *                 type: string
 *           example:   # <-- JSON pré-rempli
 *             nom: "my lastname"
 *             prenoms: "my first name"
 *             email: "exemple@gmail.com"
 *             tel: "phone number"
 *             mdp: "password"
 *     responses:
 *       201:
 *         description: Client créé avec succès
 */
router.post("/", controller.create);


/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Récupérer tous les clients
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: Liste des clients
 */
router.get("/", controller.findAll);

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     summary: Récupérer un client par ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Client non trouvé
 */
router.get("/:id", controller.findOne);

/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     summary: Mettre à jour un client par ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client mis à jour
 *       404:
 *         description: Client non trouvé
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     summary: Supprimer un client par ID
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Client supprimé
 *       404:
 *         description: Client non trouvé
 */
router.delete("/:id", controller.delete);

/**
 * @swagger
 * /clients/email/{email}:
 *   get:
 *     summary: Rechercher un client par email
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Client non trouvé
 */
router.get("/email/:email", controller.findByEmail);

/**
 * @swagger
 * /clients/tel/{tel}:
 *   get:
 *     summary: Rechercher un client par téléphone
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: tel
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Client non trouvé
 */
router.get("/tel/:tel", controller.findByTel);

/**
 * @swagger
 * /clients/numero/{numeroClient}:
 *   get:
 *     summary: Rechercher un client par numéro client
 *     tags: [Clients]
 *     parameters:
 *       - in: path
 *         name: numeroClient
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Client non trouvé
 */
router.get("/numero/:numeroClient", controller.findByNumeroClient);

module.exports = router;
