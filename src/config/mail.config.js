require("dotenv").config();
const nodemailer = require("nodemailer");

const env = process.env;

async function sendEmail() {
  // Gerar conta de serviço SMTP de teste de ethereal.email
  // Necessário apenas se você não tiver uma conta de e-mail real para teste
  let testAccount = await nodemailer.createTestAccount();

  // crie um objeto transportador reutilizável usando o transporte SMTP padrão
  let transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false, // true para 465, false para outras portas
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
}
