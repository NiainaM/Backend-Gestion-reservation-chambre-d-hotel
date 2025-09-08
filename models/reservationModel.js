module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reservation', {
      ref: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,   
      allowNull: false
    },
      type: DataTypes.STRING,
      dateReservation: DataTypes.STRING,
      dateDebut: DataTypes.STRING,
      dateFin: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'EN_ATTENTE'
      },
      nbChambre: DataTypes.INTEGER,
      nbPersonne: DataTypes.INTEGER,
      ChambreId: DataTypes.STRING,
      ClientId: DataTypes.INTEGER
    });
};

//       type: req.body.type,
//       dateReservation: req.body.dateReservation,
//       dateDebut: req.body.dateDebut,
//       dateFin: req.body.dateFin,
//       status: req.body.status,
//       nbChambre: req.body.nbChambre,
//       nbPersonne: req.body.nbPersonne,
//       ChambreId: req.body.ChambreId,
//       ClientId: req.body.ClientId

// private ref: number; // auto increment
    // private type: string;
    // private dateReservation: Date;
    // private dateDebut: Date;
    // private dateFin: Date;
    // private status: string;
    // private nbPersonne: number;
    // private nbChambre: number;
    // private numeroClient: number;
    // private matricule: string;