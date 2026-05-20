import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingAlert(sessionTitle: string, currentCount: number, minRequired: number) {
  try {
    await resend.emails.send({
      from: 'Developmental Hub <info@your-verified-domain.com>', // Replace with your domain
      to: 'your-email@example.com', // Replace with your email
      subject: `New Booking: ${sessionTitle}`,
      text: `A new booking was made for ${sessionTitle}. The session now has ${currentCount}/${minRequired} participants. Please check your admin dashboard to review and capture payment if ready.`
    });
  } catch (error) {
    console.error("Resend error:", error);
  }
}