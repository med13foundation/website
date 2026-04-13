import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Emails will not be sent.");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.SITE_URL || 'https://med13.org';
const BATCH_SIZE = 10;
const BATCH_DELAY_MS = 1000;

function buildEmailHtml(html: string, newsletterId: string, subscriberEmail: string): string {
  const unsubscribeUrl = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(subscriberEmail)}`;
  const viewUrl = `${SITE_URL}/newsletter/${newsletterId}`;

  return `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #68B0AB 0%, #4A7C59 100%); padding: 32px 24px; text-align: center;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700;">MED13 Foundation</h2>
        <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 13px;">Newsletter</p>
      </div>
      <div style="padding: 32px 24px;">
        ${html}
      </div>
      <hr style="margin: 0; border: none; border-top: 1px solid #eee;" />
      <div style="padding: 24px; text-align: center; background-color: #fafafa;">
        <p style="font-size: 12px; color: #888; margin: 0 0 8px;">
          You are receiving this because you subscribed to the MED13 Foundation newsletter.
        </p>
        <p style="font-size: 12px; color: #888; margin: 0;">
          <a href="${viewUrl}" style="color: #68B0AB; text-decoration: underline;">View in browser</a>
          &nbsp;&middot;&nbsp;
          <a href="${unsubscribeUrl}" style="color: #68B0AB; text-decoration: underline;">Unsubscribe</a>
        </p>
        <p style="font-size: 11px; color: #aaa; margin: 12px 0 0;">
          MED13 Foundation &middot; Supporting families affected by MED13 syndrome
        </p>
      </div>
    </div>
  `;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function sendNewsletterEmail({ 
  to, 
  subject, 
  html, 
  newsletterId 
}: { 
  to: string; 
  subject: string; 
  html: string; 
  newsletterId: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Mock Email] To: ${to}, Subject: ${subject}`);
    return { success: true, id: 'mock-id' };
  }

  try {
    const emailHtml = buildEmailHtml(html, newsletterId, to);
    const data = await resend.emails.send({
      from: 'MED13 Foundation <research@med13.org>',
      to: [to],
      subject: subject,
      html: emailHtml,
      headers: {
        'List-Unsubscribe': `<${SITE_URL}/unsubscribe?email=${encodeURIComponent(to)}>`,
      },
    });

    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendNewsletterBatch({
  subscribers,
  subject,
  html,
  newsletterId,
}: {
  subscribers: { email: string }[];
  subject: string;
  html: string;
  newsletterId: string;
}): Promise<{ sent: number; failed: number; errors: string[] }> {
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    const batch = subscribers.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(sub =>
        sendNewsletterEmail({ to: sub.email, subject, html, newsletterId })
      )
    );

    for (let j = 0; j < results.length; j++) {
      const result = results[j];
      if (result.status === "fulfilled" && result.value.success) {
        sent++;
      } else {
        failed++;
        const email = batch[j].email;
        const errMsg = result.status === "rejected" ? result.reason?.message : "Send failed";
        errors.push(`${email}: ${errMsg}`);
      }
    }

    if (i + BATCH_SIZE < subscribers.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  return { sent, failed, errors };
}

export async function sendTestEmail({
  to,
  subject,
  html,
  newsletterId,
}: {
  to: string;
  subject: string;
  html: string;
  newsletterId: string;
}) {
  return sendNewsletterEmail({
    to,
    subject: `[TEST] ${subject}`,
    html,
    newsletterId,
  });
}
