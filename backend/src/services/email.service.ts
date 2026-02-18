import sgMail from "@sendgrid/mail";
import { env } from "../config/env.config.js";

if (env.SENDGRID_API_KEY) {
  sgMail.setApiKey(env.SENDGRID_API_KEY);
}

const baseStyles = `
  body { margin: 0; padding: 0; background-color: #0A0A0F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
  .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
  .card { background: linear-gradient(135deg, #0f1129 0%, #131640 100%); border: 1px solid rgba(0, 245, 255, 0.15); border-radius: 16px; padding: 40px; }
  .logo { color: #00F5FF; font-size: 24px; font-weight: bold; margin-bottom: 32px; }
  h1 { color: #ffffff; font-size: 28px; margin: 0 0 16px; }
  p { color: #a1a1aa; font-size: 16px; line-height: 1.6; margin: 0 0 24px; }
  .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #00F5FF, #00c4cc); color: #0A0A0F; font-weight: 600; font-size: 16px; text-decoration: none; border-radius: 9999px; }
  .footer { margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1); color: #71717a; font-size: 13px; }
  .highlight { color: #00F5FF; }
`;

function emailTemplate(content: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style>${baseStyles}</style></head>
<body><div class="container"><div class="card">
  <div class="logo">✦ WebCraft AI</div>
  ${content}
  <div class="footer">
    <p style="margin:0;font-size:13px;color:#71717a;">This email was sent by WebCraft AI. If you didn't request this, you can safely ignore it.</p>
  </div>
</div></div></body></html>`;
}

export async function sendVerificationEmail(email: string, name: string, token: string): Promise<void> {
  const verifyUrl = `${env.FRONTEND_URL}/verify-email?token=${token}`;
  const html = emailTemplate(`
    <h1>Verify your email</h1>
    <p>Hey ${name}, welcome to <span class="highlight">WebCraft AI</span>! Please verify your email address to get started.</p>
    <p><a href="${verifyUrl}" class="btn">Verify Email Address</a></p>
    <p style="font-size:14px;">This link expires in 24 hours. If the button doesn't work, copy and paste this URL into your browser:</p>
    <p style="font-size:13px;word-break:break-all;color:#71717a;">${verifyUrl}</p>
  `);

  if (!env.SENDGRID_API_KEY) {
    console.log(`[EMAIL] Verification email for ${email}: ${verifyUrl}`);
    return;
  }

  await sgMail.send({
    to: email,
    from: { email: env.SENDGRID_FROM_EMAIL, name: "WebCraft AI" },
    subject: "Verify your email - WebCraft AI",
    html,
  });
}

export async function sendPasswordResetEmail(email: string, name: string, token: string): Promise<void> {
  const resetUrl = `${env.FRONTEND_URL}/reset-password?token=${token}`;
  const html = emailTemplate(`
    <h1>Reset your password</h1>
    <p>Hey ${name}, we received a request to reset your password for your <span class="highlight">WebCraft AI</span> account.</p>
    <p><a href="${resetUrl}" class="btn">Reset Password</a></p>
    <p style="font-size:14px;">This link expires in 1 hour. If you didn't request a password reset, you can safely ignore this email.</p>
    <p style="font-size:13px;word-break:break-all;color:#71717a;">${resetUrl}</p>
  `);

  if (!env.SENDGRID_API_KEY) {
    console.log(`[EMAIL] Password reset email for ${email}: ${resetUrl}`);
    return;
  }

  await sgMail.send({
    to: email,
    from: { email: env.SENDGRID_FROM_EMAIL, name: "WebCraft AI" },
    subject: "Reset your password - WebCraft AI",
    html,
  });
}
