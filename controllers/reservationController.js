const db = require('../models');
const sendMail = require('../utils/mailer');
// const config = require('../config/sendMail')
const Reservation = db.Reservation;

exports.create = async (req, res) => {
  try {
    const reservation = await Reservation.create({
      type: req.body.type,
      dateReservation: req.body.dateReservation,
      dateDebut: req.body.dateDebut,
      dateFin: req.body.dateFin,
      status: req.body.status,
      nbChambre: req.body.nbChambre,
      nbPersonne: req.body.nbPersonne,
      ChambreId: req.body.ChambreId,
      ClientId: req.body.numeroClient
    });

    // Récupérer le client et son email via la relation
    const client = await db.Client.findByPk(req.body.numeroClient, {
      include: [{ model: db.Personne }]
    });

    if (client && client.Personne && client.Personne.email) {
      const email = client.Personne.email;
      const nom = client.Personne.nom;
      const prenoms = client.Personne.prenoms;

      const signatureText = "\n\n--\nCordialement,\nHotel Ketrika\n📍 Antananarivo, Madagascar\n📞 +261 34 12 345 67";

await sendMail(
  email,
  'Confirmation de votre réservation',
  `Bonjour \n\n ${req.body.nbChambre} Chambre(s) ${req.body.type} pour ${req.body.nbChambre} personne(s) au nom de ${nom} ${prenoms} \n\nDu  ${req.body.dateDebut} au ${req.body.dateFin} a bien été enregistrée.\n\nMerci !\n\n` + signatureText
);

    }
    
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findAll = async (req, res) => {
  const reservations = await Reservation.findAll();
  res.json(reservations);
};

exports.findOne = async (req, res) => {
  const reservation = await Reservation.findByPk(req.params.id);
  if (reservation) res.json(reservation);
  else res.status(404).json({ message: 'Not found' });
};

exports.update = async (req, res) => {
  const updated = await Reservation.update(req.body, { where: { ref: req.params.id } });
  res.json({ updated });
};

exports.delete = async (req, res) => {
  const deleted = await Reservation.destroy({ where: { ref: req.params.id } });
  res.json({ deleted });
};