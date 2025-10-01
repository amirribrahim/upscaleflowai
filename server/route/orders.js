// backend/routes/orders.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email transporter configuration
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // false for 587, true for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false,
    ciphers: 'SSLv3'
  },
  connectionTimeout: 60000, // 60 seconds
  greetingTimeout: 30000,   // 30 seconds
  socketTimeout: 60000      // 60 seconds
});

// Test email configuration on startup (REMOVE the test email sending)
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Email configuration error:', error);
  } else {
    console.log('✅ Email server is ready to send messages');
    console.log(`📧 Using: ${process.env.SMTP_USER} via ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}`);
  }
});

// REMOVE THIS TEST EMAIL BLOCK COMPLETELY
// (The test email that runs on server start is causing issues)

// Test endpoint for manual email testing
router.post('/test-email', async (req, res) => {
  try {
    console.log('🧪 Testing email configuration...');
    
    const testEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3B82F6;">🧪 Email Test Successful!</h2>
        <p>If you're reading this, your email configuration is working correctly.</p>
        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>✅ Configuration Details:</strong></p>
          <p>SMTP Host: ${process.env.SMTP_HOST}</p>
          <p>From Email: ${process.env.SMTP_USER}</p>
          <p>Test Time: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `;

    const testMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send test email to yourself
      subject: '🧪 Email Configuration Test - SUCCESS!',
      html: testEmailHTML
    };

    await transporter.sendMail(testMailOptions);
    
    console.log('✅ Test email sent successfully!');
    res.json({
      success: true,
      message: 'Test email sent successfully! Check your inbox.',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Test email failed:', error);
    res.status(500).json({
      success: false,
      message: 'Email test failed',
      error: error.message
    });
  }
});

// POST /api/submit-order
router.post('/submit-order', async (req, res) => {
  try {
    const { package: selectedPackage, addons, total, customer, timestamp } = req.body;

    console.log('📨 Received order submission:', {
      package: selectedPackage?.name,
      total,
      customer: customer?.fullName,
      email: customer?.email
    });

    // Validation
    if (!selectedPackage || !customer.fullName || !customer.email) {
      console.log('❌ Validation failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Generate order ID
    const orderId = `ORD-${Date.now()}`;
    const formattedDate = new Date(timestamp).toLocaleString();

    console.log(`📧 Processing order ${orderId} for ${customer.fullName}`);

    // Email to business owner (YOU)
    const businessEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3B82F6; border-bottom: 2px solid #3B82F6; padding-bottom: 10px;">
          🎉 New Subscription !
        </h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📋 Subscription  Details</h3>
          <p><strong>Subscription ID:</strong> ${orderId}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
         
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📦 Selected Package</h3>
          <p><strong>${selectedPackage.name}</strong> - $${selectedPackage.price}</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${selectedPackage.features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        </div>

        ${addons && addons.length > 0 ? `
        <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">➕ Add-ons Selected</h3>
          ${addons.map(addon => `
            <div style="border-bottom: 1px solid #d1d5db; padding: 8px 0;">
              <strong>${addon.title}</strong> - $${addon.price}
              <br><small style="color: #6b7280;">${addon.desc}</small>
            </div>
          `).join('')}
        </div>
        ` : ''}

        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
          <h3 style="margin-top: 0;">👤 Customer Information</h3>
          <p><strong>Name:</strong> ${customer.fullName}</p>
          <p><strong>Email:</strong> <a href="mailto:${customer.email}">${customer.email}</a></p>
          <p><strong>Phone:</strong> ${customer.phone || 'Not provided'}</p>
          <p><strong>Location:</strong> ${customer.location || 'Not provided'}</p>
          ${customer.notes ? `<p><strong>Notes:</strong><br>${customer.notes.replace(/\n/g, '<br>')}</p>` : ''}
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3B82F6;">
          <h3 style="margin-top: 0;">🚀 Next Steps</h3>
          <ul style="margin: 0; padding-left: 20px;">
            <li>Contact customer within 24 hours</li>
            <li>Schedule discovery Meeting</li>
            <li>Send project timeline & contract</li>
            <li>Collect deposit (if required)</li>
          </ul>
        </div>
      </div>
    `;

    // Email to customer (confirmation)
    const customerEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #3B82F6;">Thank you for your Subscription ! 🚀</h2>
        
        <p>Hi ${customer.fullName},</p>
        
        <p>Thank you for choosing us for your website project ! We've received your subscription and are excited to help bring your vision to life.</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">📋 Subscription  Summary</h3>
          <p><strong>Date:</strong> ${formattedDate}</p>
        </div>

        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Your Selection</h3>
          <p><strong>${selectedPackage.name}</strong> - $${selectedPackage.price}</p>
          
          ${addons && addons.length > 0 ? `
          <h4 style="margin-top: 15px; margin-bottom: 10px;">Add-ons:</h4>
          ${addons.map(addon => `<p style="margin: 5px 0;">• ${addon.title} - $${addon.price}</p>`).join('')}
          ` : ''}
          
          <div style="border-top: 2px solid #3B82F6; margin-top: 15px; padding-top: 15px;">
            <p style="font-size: 18px; margin: 0;"><strong>Total: $${total}</strong></p>
          </div>
        </div>

        <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">What's Next? 📅</h3>
          <ol style="margin: 0; padding-left: 20px;">
            <li style="margin: 8px 0;"><strong>We'll contact you within 24 hours</strong> to schedule a discovery call</li>
            <li style="margin: 8px 0;"><strong>Discovery call</strong> - We'll discuss your vision, requirements, and timeline</li>
            <li style="margin: 8px 0;"><strong>Project proposal</strong> - You'll receive a detailed timeline and contract</li>
            <li style="margin: 8px 0;"><strong>Get started!</strong> - Once everything is signed, we begin your project</li>
          </ol>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin-top: 0;"><strong>Questions? 💬</strong></p>
          <p style="margin-bottom: 0;">Feel free to reply to this email or call us directly. We're here to help!</p>
        </div>

        <p>Best regards,<br>
        <strong>Your Web Development Team</strong></p>
        
        <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; font-size: 12px; color: #666;">
          <p style="margin: 0;">This is an automated confirmation email. </p>
        </div>
      </div>
    `;

    // Email to business
    const businessMailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER, // Send to yourself
      subject: `🚀 New Subscription  ${orderId} - ${selectedPackage.name} ($${total})`,
      html: businessEmailHTML
    };

    // Email to customer
    const customerMailOptions = {
      from: process.env.SMTP_USER,
      to: customer.email,
      subject: `Order Confirmation ${orderId} - Your Website Project`,
      html: customerEmailHTML
    };

    console.log('📤 Attempting to send emails...');

    // Send both emails
    await Promise.all([
      transporter.sendMail(businessMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    console.log(`✅ Emails sent successfully for order ${orderId}`);

    res.json({
      success: true,
      message: 'Subscription submitted successfully!',
      orderId: orderId
    });

  } catch (error) {
    console.error('❌ Error processing order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process Subscription. Please try again.',
      error: error.message
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({ message: 'Subscription API is working!' });
});

module.exports = router;