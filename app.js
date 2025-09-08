const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');


require('dotenv').config();
const bodyParser = require('body-parser');
const app = express();

const db = require('./models');
(async () => {
    await db.sequelize.sync({ alter: true });
}) ();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/admins', require('./routes/adminRoute'));
app.use('/api/clients', require('./routes/clientRoute'));
app.use('/api/chambres', require('./routes/chambreRoute'));
app.use('/api/reservations', require('./routes/reservationRoute'));
app.use('/api/auth', require('./routes/authRoute'));
// const authRoutes = require("./routes/authRoute");
// app.use("/auth", authRoutes);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000/api-docs");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = app;