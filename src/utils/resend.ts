// src/utils/resend.ts
import 'dotenv/config';
import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn('[Resend] RESEND_API_KEY não encontrada no .env');
}

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string; 
  replyTo?: string | string[];
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = process.env.RESEND_FROM ?? 'General Care <onboarding@resend.dev>',
  replyTo,
}: SendEmailParams) {
  const start = Date.now();
  console.log('[Resend] Enviando e-mail...', {
    to,
    subject,
    from,
    hasText: Boolean(text),
    hasHtml: Boolean(html),
  });

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      text,
      replyTo,
    });

    const elapsed = Date.now() - start;

    if (error) {
      console.error('[Resend] Falha ao enviar', { error, elapsedMs: elapsed });
      throw error;
    }

    console.log('[Resend] E-mail enfileirado/enviado', {
      id: data?.id, 
      elapsedMs: elapsed,
    });

    return data; 
  } catch (err) {
    console.error('[Resend] Erro inesperado', err);
    throw err;
  }
}
