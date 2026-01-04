import { env } from "$env/dynamic/private";
import { COMPANY_INFO, SITE_NAME, SITE_URL } from "$lib/constants/index";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export const emailService = {
  async send(options: EmailOptions) {
    const webhook = env.EMAIL_WEBHOOK;
    if (!webhook) {
      console.error("EMAIL_WEBHOOK is not defined in environment variables");
      return { success: false, error: "Configuration error" };
    }

    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(options),
      });

      if (!response.ok) {
        throw new Error(`Email webhook failed: ${response.statusText}`);
      }

      return { success: true };
    } catch (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }
  },

  generateTemplate(title: string, content: string) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
          .header { background: #f97316; padding: 40px 20px; text-align: center; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em; }
          .content { padding: 40px 30px; background: #ffffff; }
          .footer { background: #f8fafc; padding: 30px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
          .button { display: inline-block; padding: 12px 24px; background: #f97316; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 20px; }
          .card { border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${SITE_NAME}</h1>
          </div>
          <div class="content">
            <h2 style="color: #0f172a; font-size: 22px; margin-top: 0;">${title}</h2>
            ${content}
          </div>
          <div class="footer">
            <p><strong>${SITE_NAME}</strong></p>
            <p>${COMPANY_INFO.address}</p>
            <p>${COMPANY_INFO.phone} | ${COMPANY_INFO.email}</p>
            <p style="margin-top: 20px;">&copy; ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  async sendContactConfirmation(name: string, email: string, subject: string, message: string) {
    const adminHtml = this.generateTemplate(
      "New Contact Inquiry",
      `
      <div class="card">
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      `
    );

    const userHtml = this.generateTemplate(
      "We've Received Your Message",
      `
      <p>Hello ${name},</p>
      <p>Thank you for reaching out to us. We have received your message regarding <strong>"${subject}"</strong> and our team will get back to you within 24 hours.</p>
      <p>Here is a copy of your message:</p>
      <div class="card italic">
        "${message}"
      </div>
      <p>Best regards,<br/>The ${SITE_NAME} Team</p>
      `
    );

    // Send to admin
    await this.send({
      to: COMPANY_INFO.adminEmail,
      subject: `[Support] New Inquiry: ${subject}`,
      html: adminHtml,
    });

    // Send to user
    await this.send({
      to: email,
      subject: `We've received your inquiry - ${SITE_NAME}`,
      html: userHtml,
    });
  },

  async sendTransactionNotification(userEmail: string, orderDetails: any) {
    // Basic placeholder for transaction email - will be refined when order data structure is confirmed
    const html = this.generateTemplate(
      "Your Order Confirmation",
      `
      <p>Thank you for your purchase! Your order <strong>#${orderDetails.id}</strong> has been received and is being processed.</p>
      <div class="card">
        <h3 style="margin-top: 0;">Order Summary</h3>
        <p>Total Amount: <strong>${orderDetails.total}</strong></p>
        <p>Status: <span style="color: #10b981; font-weight: bold;">Processing</span></p>
      </div>
      <a href="${SITE_URL}/dashboard" class="button">View Order Details</a>
      `
    );

    await this.send({
      to: userEmail,
      subject: `Order Confirmation #${orderDetails.id} - ${SITE_NAME}`,
      html,
    });

    await this.send({
      to: COMPANY_INFO.adminEmail,
      subject: `New Order Received #${orderDetails.id}`,
      html: this.generateTemplate("New Transaction Alert", `<p>A new order has been placed on ${SITE_NAME}.</p><p>Customer: ${userEmail}</p><p>Total: ${orderDetails.total}</p>`),
    });
  }
};
