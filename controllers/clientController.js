const db = require('../models');
const Client = db.Client;

exports.create = async (req, res) => {
  try {
    const personneData = {
      nom: req.body.nom,
      prenoms: req.body.prenoms,
      email: req.body.email,
      tel: req.body.tel,
      mdp: req.body.mdp 
    };

    const personne = await db.Personne.create(personneData);

    const client = await Client.create({
      personneId: personne.id,
      numeroClient: req.body.numeroClient
    });

    const { mdp, ...safePersonne } = personne.toJSON();
    res.status(201).json({ personne: safePersonne, client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const clients = await Client.findAll( { include: db.Personne });
  res.json(clients);
};

exports.findOne = async (req, res) => {
   try {
    const client = await Client.findByPk(req.params.id, {
      include: db.Personne
    });

    if (!client) {
      return res.status(404).json({ message: '"Client non trouvé"' });
    }

    const clientData = client.toJSON();
    if (clientData.Personne && clientData.Personne.mdp) {
      delete clientData.Personne.mdp;
    }

    res.json(clientData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findByNumeroClient = async (req, res) => {
  try {
    const numeroClient = req.params.numeroClient;

    const client = await Client.findOne({
      where: { numeroClient: numeroClient },
      include: db.Personne
    });

    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    const clientData = client.toJSON();
    if (clientData.Personne && clientData.Personne.mdp) {
      delete clientData.Personne.mdp;
    }

    res.json(clientData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


exports.findByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const client = await Client.findOne({
      include: {
        model: db.Personne,
        where: { email: email }   // filtre sur l'email
      }
    });

    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    // Supprimer le mot de passe avant d’envoyer
    const clientData = client.toJSON();
    // if (clientData.Personne && clientData.Personne.mdp) {
    //   delete clientData.Personne.mdp;
    // }

    res.json(clientData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.findByTel = async (req, res) => {
  try {
    const tel = req.params.tel;

    const client = await Client.findOne({
      include: {
        model: db.Personne,
        where: { tel: tel }   // filtre sur le téléphone
      }
    });

    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    // Supprimer le mot de passe avant d’envoyer
    const clientData = client.toJSON();
    // if (clientData.Personne && clientData.Personne.mdp) {
    //   delete clientData.Personne.mdp;
    // }

    res.json(clientData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


exports.update = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, { include: db.Personne })
    if (!client) {
      res.status(404).json({ message: 'Not found' });
    }
    const personne = client.Personne;

    if (personne) {
      personne.nom = req.body.nom || personne.nom;
      personne.prenoms = req.body.prenoms || personne.prenoms;
      personne.email = req.body.email || personne.email;
      personne.tel = req.body.tel || personne.tel;
      if (req.body.mdp) personne.mdp = req.body.mdp;
      await personne.save();
    }

    client.numeroClient = req.body.numeroClient || client.numeroClient;

    res.json({update: true});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

exports.delete = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, { include: db.Personne });

    if (!client) {
      return res.status(404).json({ message: 'Not found' });
    }

    // Supprimer d'abord le client, puis la personne liée
    await client.destroy();
    if (client.Personne) {
      await client.Personne.destroy();
    }

    res.json({ deleted: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};