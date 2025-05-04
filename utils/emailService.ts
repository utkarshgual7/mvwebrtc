import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export async function sendEmail({ to, subject, text, html }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to,
      subject,
      text,
      html,
    });
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

export function generateSessionEmailContent(joinUrl: string, sessionType: string) {
  const text = `
    Your Zoho Assist Session is Ready!
    
    A support session has been created for you. Please click the link below to join:
    
    Session Type: ${sessionType}
    Join URL: ${joinUrl}
    
    Important:
    - Click the link to join the session immediately
    - Allow any necessary permissions for screen sharing
    - Follow the on-screen instructions to connect with our support team
    
    If you have any issues joining, please contact our support team.
    
    Thank you for using our service!
  `;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #19232d;">Your Zoho Assist Session is Ready!</h2>
      
      <p>A support session has been created for you. Please click the link below to join:</p>
      
      <div style="margin: 20px 0; padding: 20px; background-color: #f5f5f5; border-radius: 5px; border-left: 4px solid #19232d;">
        <p><strong>Session Type:</strong> ${sessionType}</p>
        <p><strong>Join Now:</strong> <a href="${joinUrl}" style="color: #0066cc; text-decoration: none; background-color: #e8f0fe; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-top: 10px;">Click here to join session</a></p>
      </div>
      
      <div style="background-color: #fff8e6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h4 style="color: #19232d; margin-top: 0;">Important Instructions:</h4>
        <ul style="color: #666; margin: 0; padding-left: 20px;">
          <li>Click the link to join the session immediately</li>
          <li>Allow any necessary permissions for screen sharing</li>
          <li>Follow the on-screen instructions to connect with our support team</li>
        </ul>
      </div>
      
      <p style="color: #666;">If you have any issues joining, please contact our support team.</p>
      
      <p style="margin-top: 30px; color: #666; font-size: 12px;">Thank you for using our service!</p>
    </div>
  `;

  return { text, html };
} 