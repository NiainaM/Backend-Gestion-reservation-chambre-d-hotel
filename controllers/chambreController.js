const db = require('../models');
const Chambre = db.Chambre;

exports.create = async (req, res) => {
  try {
    const chambre = await Chambre.create(req.body);
    res.status(201).json(chambre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const chambres = await Chambre.findAll();
  res.json(chambres);
};

exports.findOne = async (req, res) => {
  const chambre = await Chambre.findByPk(req.params.id);
  if (chambre) res.json(chambre);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const updated = await Chambre.update(req.body, { where: { numero: req.params.id } });
  res.json({ updated });
};

exports.delete = async (req, res) => {
  const deleted = await Chambre.destroy({ where: { numero: req.params.id } });
  res.json({ deleted });
};


exports.findByStatus = async (req, res) => {
  try {
    const status = req.params.status || req.query.status;
    if (!status) {
      return res.status(400).json({ message: "Le status est requis (LIBRE ou OCCUPEE)" });
    }
    const chambres = await Chambre.findAll({
      where: { status: status.toUpperCase() }
    });

    if (chambres.length === 0) {
      return res.status(404).json({ message: `Aucune chambre avec le status ${status}` });
    }

    res.json(chambres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.findByTypes = async (req, res) => {
  try {
    const types = req.params.types || req.query.types;
    if (!types) {
      return res.status(400).json({ message: "Le type est requis" });
    }
    const chambres = await Chambre.findAll({
      where: { type: types.toUpperCase() }
    });

    if (chambres.length === 0) {
      return res.status(404).json({ message: `Aucune chambre avec le status ${types}` });
    }

    res.json(chambres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

