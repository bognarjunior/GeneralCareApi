import 'dotenv/config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
  from = 'onboarding@resend.dev',
}: {
  to: string;
  subject: string;
  html: string;
  from?: string;
}) {
  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });
    return data;
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
}
