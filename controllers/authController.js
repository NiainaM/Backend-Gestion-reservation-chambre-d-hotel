const db = require("../models");
const Client = db.Client;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { telEmail, mdp } = req.body;

    if (!telEmail || !mdp) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const isEmail = /\S+@\S+\.\S+/.test(telEmail);

    const client = await Client.findOne({
      include: {
        model: db.Personne,
        where: isEmail ? { email: telEmail } : { tel: telEmail },
      },
    });

    if (!client || !client.Personne) {
      return res.status(401).json({ message: "Utilisateur introuvable" });
    }

    const personne = client.Personne;

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(mdp, personne.mdp);
    if (!isMatch) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { clientId: client.id, personneId: personne.id, email: personne.email, tel: personne.tel },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "2h" }
    );

    // Retourner le client sans mot de passe + token
    const { mdp: _, ...safePersonne } = personne.toJSON();

    res.json({
      message: "Connexion réussie",
      token,
      client: {
        ...safePersonne,
        numeroClient: client.numeroClient,
        clientId: client.id,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
