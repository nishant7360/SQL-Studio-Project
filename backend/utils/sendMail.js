import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const baseWrapper = (content) => `
  <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #18181b; border-radius: 12px; border: 1px solid #27272a;">
    <div style="margin-bottom: 24px;">
      <span style="background: #fff; color: #18181b; font-weight: bold; font-size: 14px; padding: 6px 10px; border-radius: 6px;">S</span>
      <span style="color: #f4f4f5; font-weight: 600; font-size: 16px; margin-left: 8px;">SQL Studio</span>
    </div>
    ${content}
    <p style="color: #52525b; font-size: 11px; margin-top: 24px; border-top: 1px solid #27272a; padding-top: 16px;">
      © ${new Date().getFullYear()} SQL Studio. All rights reserved.
    </p>
  </div>
`;

const otpBlock = (otp) => `
  <div style="background: #27272a; border: 1px solid #3f3f46; border-radius: 8px; padding: 24px; text-align: center; margin: 20px 0;">
    <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #f4f4f5;">
      ${otp}
    </span>
  </div>
  <p style="color: #71717a; font-size: 12px; text-align: center;">
    This OTP expires in <strong style="color: #a1a1aa;">10 minutes</strong>
  </p>
`;

const templates = {
  welcome: (name) => ({
    subject: "Welcome to SQL Studio",
    html: baseWrapper(`
      <h2 style="color: #f4f4f5; margin-bottom: 8px;">Welcome, ${name}! </h2>
      <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 4px;">
        Thanks for signing up.
      </p>
      <p style="color: #71717a; font-size: 12px;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    `),
  }),

  forgotPassword: (name, otp) => ({
    subject: "SQL Studio — Password Reset OTP",
    html: baseWrapper(`
      <h2 style="color: #f4f4f5; margin-bottom: 8px;">Reset your password</h2>
      <p style="color: #a1a1aa; font-size: 14px; margin-bottom: 4px;">
        Hi ${name}, we received a request to reset your password. Use the OTP below.
      </p>
      ${otpBlock(otp)}
      <p style="color: #71717a; font-size: 12px;">
        If you didn't request a password reset, ignore this email. Your password won't change.
      </p>
    `),
  }),
};

export async function sendEmail(to, type, { name, otp } = {}) {
  const { subject, html } = templates[type](name, otp);

  await resend.emails.send({
    from: "SQL Studio <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
}
