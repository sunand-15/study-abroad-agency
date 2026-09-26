import nodemailer from 'nodemailer';

/**
 * Nodemailer transporter.
 * Uses SMTP credentials from environment variables.
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10) || 587,
  secure: false, // true for 465, false for 587/25
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Verify SMTP connection on startup (dev only).
 */
export const verifyMailer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    try {
      await transporter.verify();
      console.log('📧 Mailer ready');
    } catch (err) {
      console.error('❌ Mailer verification failed:', err.message);
    }
  }
};

console.log('📧 SMTP Host:', process.env.EMAIL_HOST);
console.log('📧 SMTP Port:', process.env.EMAIL_PORT);
console.log('📧 SMTP User:', process.env.EMAIL_USER);
export default transporter;