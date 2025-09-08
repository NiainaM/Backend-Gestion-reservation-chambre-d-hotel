const nodemailer = require('nodemailer');
const emailConfig = require('../config/emailConfig');

const transporter = nodemailer.createTransport({
  service: emailConfig.service,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
});

async function sendMail(to, subject, text, html = null) {
  try {
    await transporter.sendMail({
      from: `Hotel Ketrika`,
      to,
      subject,
      text,
      html
    });
    console.log(`📧 Mail envoyé à ${to}`);
  } catch (error) {
    console.error(`Erreur lors de l'envoi d'email à ${to}: de ${emailConfig.user} avec le mot de passe ${emailConfig.pass}`, error);
    throw error;
  }
}

module.exports = sendMail;