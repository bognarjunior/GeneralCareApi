import 'dotenv/config';
import { sendEmail } from './utils/resend';

(async () => {
  try {
    await sendEmail({
      to: 'bognar_junior@yahoo.com.br',
      subject: 'Testando Resend!',
      html: '<h1>Funcionou 🎉</h1><p>Seu backend já envia e-mails! 🚀</p>',
    });
    console.log('E-mail enviado com sucesso!');
  } catch (err) {
    console.error('Falha ao enviar e-mail:', err);
  }
})();
