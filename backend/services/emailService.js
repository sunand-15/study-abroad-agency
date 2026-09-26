import transporter from '../config/mailer.js';

/**
 * Send an email.
 * @param {Object} options - { to, subject, html, text }
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    });
    console.log(`📧 Email sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`❌ Email failed to ${to}:`, error.message);
    // Don't throw — email failure shouldn't break the API response
    return { success: false, error: error.message };
  }
};

/**
 * Send enquiry confirmation to student.
 */
export const sendEnquiryConfirmation = async (enquiry) => {
  const subject = `We received your enquiry — ${enquiry.enquiryId}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #102a43;">
      <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Thank you, ${enquiry.fullName}!</h1>
      </div>
      <div style="background: #ffffff; padding: 30px; border: 1px solid #e2eaf5; border-top: none; border-radius: 0 0 12px 12px;">
        <p>We've received your enquiry and our team will contact you within 24 hours.</p>

        <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; margin: 24px 0; border-radius: 8px;">
          <p style="margin: 0; font-size: 14px; color: #4a6182;">Your Enquiry ID</p>
          <p style="margin: 4px 0 0; font-size: 22px; font-weight: bold; color: #2563eb; letter-spacing: 1px;">
            ${enquiry.enquiryId}
          </p>
        </div>

        <p>Please keep this ID for future reference. You'll need it when speaking with our counsellors.</p>

        <p style="margin-top: 24px;">Meanwhile, you can:</p>
        <ul>
          <li>Book a free counselling session</li>
          <li>Explore our partner universities</li>
          <li>Check scholarship options</li>
        </ul>

        <div style="margin-top: 30px; padding-top: 24px; border-top: 1px solid #e2eaf5; font-size: 13px; color: #6d7f9c;">
          <p style="margin: 0;">Study Abroad Compass</p>
          <p style="margin: 4px 0 0;">Your Gateway to Global Education</p>
        </div>
      </div>
    </div>
  `;
  const text = `Thank you, ${enquiry.fullName}! We've received your enquiry. Your Enquiry ID is ${enquiry.enquiryId}. Our team will contact you within 24 hours.`;

  return sendEmail({ to: enquiry.email, subject, html, text });
};

/**
 * Notify agency of new enquiry.
 */
export const sendAgencyNotification = async (enquiry) => {
  const subject = `🔔 New Enquiry: ${enquiry.enquiryId} — ${enquiry.fullName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #102a43;">
      <div style="background: #0b2b4f; padding: 24px; border-radius: 12px 12px 0 0;">
        <h2 style="color: white; margin: 0; font-size: 20px;">New Enquiry Received</h2>
      </div>
      <div style="background: #ffffff; padding: 24px; border: 1px solid #e2eaf5; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #4a6182; width: 140px;">Enquiry ID</td>
            <td style="padding: 8px 0; font-weight: bold; color: #2563eb;">${enquiry.enquiryId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4a6182;">Name</td>
            <td style="padding: 8px 0; font-weight: 600;">${enquiry.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4a6182;">Email</td>
            <td style="padding: 8px 0;">${enquiry.email}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #4a6182;">Phone</td>
            <td style="padding: 8px 0;">${enquiry.phone}</td>
          </tr>
          ${enquiry.preferredCourse ? `
          <tr>
            <td style="padding: 8px 0; color: #4a6182;">Preferred Course</td>
            <td style="padding: 8px 0;">${enquiry.preferredCourse}</td>
          </tr>` : ''}
          ${enquiry.intake ? `
          <tr>
            <td style="padding: 8px 0; color: #4a6182;">Intake</td>
            <td style="padding: 8px 0;">${enquiry.intake}</td>
          </tr>` : ''}
          ${enquiry.highestEducation ? `
          <tr>
            <td style="padding: 8px 0; color: #4a6182;">Highest Education</td>
            <td style="padding: 8px 0;">${enquiry.highestEducation}</td>
          </tr>` : ''}
          ${enquiry.message ? `
          <tr>
            <td style="padding: 8px 0; color: #4a6182; vertical-align: top;">Message</td>
            <td style="padding: 8px 0;">${enquiry.message}</td>
          </tr>` : ''}
        </table>

        <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e2eaf5;">
          <a href="${process.env.CLIENT_URL}/admin/enquiries/${enquiry._id}"
             style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; font-weight: 600;">
            View in Dashboard
          </a>
        </div>
      </div>
    </div>
  `;
  const text = `New enquiry: ${enquiry.enquiryId}\nName: ${enquiry.fullName}\nEmail: ${enquiry.email}\nPhone: ${enquiry.phone}`;

  return sendEmail({
    to: process.env.AGENCY_EMAIL,
    subject,
    html,
    text,
  });
};