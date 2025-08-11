import 'dotenv/config';
import { sendEmail } from './utils/resend';

(async () => {
  try {
    const data = await sendEmail({
      to: 'bognar.junior@gmail.com',
      subject: 'Testando Resend! 🚀',
      html: '<h1>Funcionou 🎉</h1><p>Seu backend já envia e-mails!</p>',
      text: 'Funcionou! Seu backend já envia e-mails!',
      replyTo: 'no-reply@generalcare.app',
    });

    console.log('[Test] OK — retorno do Resend:', data);
    console.log('E-mail disparado (verifique caixa de entrada/Spam).');
  } catch (err) {
    console.error('[Test] Falha ao enviar e-mail:', err);
  }
})();
