// backend/routes/contact.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter configuration (same as orders.js)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false, // true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Test email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email config error:", error);
  } else {
    console.log("✅ Email server ready to send");
  }
});

// POST /api/submit-contact
router.post('/submit-contact', async (req, res) => {
  try {
    const { fullName, email, companyName, phoneNumber, notes } = req.body;

    // Validation
    if (!fullName || !email || !companyName) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Generate contact ID for tracking
    const contactId = `CONTACT-${Date.now()}`;
    const formattedDate = new Date().toLocaleString();

    console.log(`📧 Processing contact form ${contactId} from ${fullName}`);

    // Email to business owner (YOU)
    const businessEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
          📋 New Consultation Request!
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📋 Contact Details</h3>
          <p><strong>Contact ID:</strong> ${contactId}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
        </div>

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
          <h3 style="margin-top: 0;">👤 Customer Information</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Company:</strong> ${companyName}</p>
          <p><strong>Phone:</strong> ${phoneNumber || 'Not provided'}</p>
          ${notes ? `<p><strong>Notes:</strong><br>${notes.replace(/\n/g, '<br>')}</p>` : ''}
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3B82F6;">
          <h3 style="margin-top: 0;">🚀 Next Steps</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Contact customer within 24 hours</li>
            <li>Schedule free consultation call</li>
            <li>Discuss their needs and requirements</li>
            <li>Send proposal if there's a good fit</li>
          </ul>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin-top: 0;"><strong>Quick Actions:</strong></p>
          <p style="margin-bottom: 0;">
            <a href="mailto:${email}" style="color: #3B82F6; text-decoration: none;">✉️ Reply to ${fullName}</a><br>
            <a href="tel:${phoneNumber}" style="color: #3B82F6; text-decoration: none;">📞 Call ${phoneNumber}</a>
          </p>
        </div>
      </div>
    `;

    // Email to customer (confirmation)
    const customerEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3B82F6;">Thank you for reaching out! 🚀</h2>
        
        <p>Hi ${fullName},</p>
        
        <p>Thank you for your interest in our web development services! We've received your consultation request and are excited to learn more about your project.</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📋 Your Submission</h3>
          <p><strong>Reference ID:</strong> ${contactId}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Company:</strong> ${companyName}</p>
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">What's Next? 📅</h3>
          <ol style="margin: 0; padding-left: 20px;">
            <li style="margin: 8px 0;"><strong>We'll contact you within 24 hours</strong> to schedule your free consultation</li>
            <li style="margin: 8px 0;"><strong>Free consultation call</strong> - We'll discuss your vision, goals, and requirements</li>
            <li style="margin: 8px 0;"><strong>Custom proposal</strong> - You'll receive a tailored solution with pricing</li>
            <li style="margin: 8px 0;"><strong>Project kickoff</strong> - Once approved, we begin bringing your vision to life</li>
          </ol>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin-top: 0;"><strong>Questions in the meantime? 💬</strong></p>
          <p style="margin-bottom: 0;">Feel free to reply to this email or call us directly. We're here to help!</p>
        </div>

        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin-top: 0;"><strong>🎯 Why choose us?</strong></p>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Fast, secure, and scalable websites</li>
            <li>Mobile-first responsive design</li>
            <li>SEO optimized from day one</li>
            <li>Ongoing support and maintenance</li>
          </ul>
        </div>

        <p>Best regards,<br>
        <strong>The Upscale Team</strong><br>
        <em>From Code to Conversion</em></p>
        
        <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">This is an automated confirmation email. Please save this for your records.</p>
        </div>
      </div>
    `;

    // Email to business
    const businessMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.BUSINESS_EMAIL || process.env.SMTP_USER,
      subject: `📋 New Consultation Request from ${fullName} - ${companyName}`,
      html: businessEmailHTML
    };

    // Email to customer
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: `Consultation Request Received - We'll be in touch soon!`,
      html: customerEmailHTML
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log(`✅ Emails sent successfully for contact ${contactId}`);

    res.json({
      success: true,
      message: 'Contact form submitted successfully!',
      contactId: contactId
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// Test endpoint
router.get('/test-contact', (req, res) => {
  res.json({ message: 'Contact API is working!' });
});

module.expo