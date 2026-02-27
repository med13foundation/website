import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  // We'll use a placeholder or log a warning if the key is missing
  console.warn("RESEND_API_KEY is not set. Emails will not be sent.");
}

export const resend = new Resend(process.env.RESEND_API_KEY);

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
    const data = await resend.emails.send({
      from: 'MED13 Foundation <newsletter@med13.org>',
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          ${html}
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666; text-align: center;">
            You are receiving this because you subscribed to the MED13 Foundation newsletter.
            <br />
            <a href="${process.env.SITE_URL || 'https://med13.org'}/newsletter/${newsletterId}" style="color: #68B0AB;">View in browser</a>
          </p>
        </div>
      `,
    });

    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
