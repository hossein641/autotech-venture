// app/api/contact/route.ts - Fixed TypeScript error
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  source?: string;
}

// Create Resend transporter - FIXED: createTransport not createTransporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY,
    },
  });
};

// Format form data into readable email
const formatEmailContent = (data: ContactFormData): string => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .field { margin-bottom: 15px; }
    .label { font-weight: bold; color: #4f46e5; }
    .value { margin-left: 10px; }
    .message-box { background: #f8f9fa; padding: 15px; border-radius: 5px; margin-top: 20px; }
    .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h2>🚀 New Consultation Request - AutoTech Venture</h2>
    <p>Received on ${currentDate}</p>
  </div>
  
  <div class="content">
    <h3>Contact Information</h3>
    <div class="field">
      <span class="label">Name:</span>
      <span class="value">${data.firstName} ${data.lastName}</span>
    </div>
    <div class="field">
      <span class="label">Email:</span>
      <span class="value">${data.email}</span>
    </div>
    ${data.phone ? `
    <div class="field">
      <span class="label">Phone:</span>
      <span class="value">${data.phone}</span>
    </div>` : ''}
    ${data.company ? `
    <div class="field">
      <span class="label">Company:</span>
      <span class="value">${data.company}</span>
    </div>` : ''}
    
    <h3>Project Details</h3>
    ${data.service ? `
    <div class="field">
      <span class="label">Service Interested:</span>
      <span class="value">${data.service}</span>
    </div>` : ''}
    ${data.budget ? `
    <div class="field">
      <span class="label">Budget Range:</span>
      <span class="value">${data.budget}</span>
    </div>` : ''}
    ${data.timeline ? `
    <div class="field">
      <span class="label">Timeline:</span>
      <span class="value">${data.timeline}</span>
    </div>` : ''}
    
    <div class="message-box">
      <div class="label">Message:</div>
      <div style="margin-top: 10px; white-space: pre-wrap;">${data.message}</div>
    </div>
    
    ${data.source ? `
    <div class="field" style="margin-top: 20px;">
      <span class="label">Form Source:</span>
      <span class="value">${data.source}</span>
    </div>` : ''}
  </div>
  
  <div class="footer">
    <p>This message was sent via the AutoTech Venture website contact form.</p>
    <p>Respond within 24 hours for best customer experience.</p>
  </div>
</body>
</html>`;
};

// Validation function
const validateFormData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.message?.trim()) errors.push('Message is required');
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  // Message length validation
  if (data.message && data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  return { isValid: errors.length === 0, errors };
};

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Contact form submission received');
    
    // Parse request body
    const body = await request.json();
    console.log('📧 Form data:', { ...body, message: body.message?.substring(0, 50) + '...' });
    
    // Validate form data
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed', 
          details: validation.errors 
        },
        { status: 400 }
      );
    }
    
    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Resend API key not configured');
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email service not configured' 
        },
        { status: 500 }
      );
    }
    
    // Create email transporter
    const transporter = createTransporter();
    
    // Verify connection
    await transporter.verify();
    console.log('✅ Resend email service connected');
    
    // Prepare email content
    const formData: ContactFormData = {
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim(),
      company: body.company?.trim(),
      service: body.service?.trim(),
      budget: body.budget?.trim(),
      timeline: body.timeline?.trim(),
      message: body.message.trim(),
      source: body.source || 'Website Contact Form',
    };
    
    // Email to AutoTech Venture
    const mailOptions = {
      from: 'onboarding@resend.dev', // Using Resend's default domain for immediate setup
      to: 'info@atechv.com',
      replyTo: formData.email,
      subject: `🚀 New Consultation Request from ${formData.firstName} ${formData.lastName}`,
      html: formatEmailContent(formData),
      text: `
New consultation request from ${formData.firstName} ${formData.lastName}

Contact Information:
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}
- Company: ${formData.company || 'Not provided'}

Project Details:
- Service: ${formData.service || 'Not specified'}
- Budget: ${formData.budget || 'Not specified'}
- Timeline: ${formData.timeline || 'Not specified'}

Message:
${formData.message}

Form submitted via: ${formData.source}
      `,
    };
    
    // Send email
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    
    // Send confirmation email to user
    const confirmationEmail = {
      from: 'onboarding@resend.dev', // Using Resend's default domain
      to: formData.email,
      subject: '✅ Thank you for your consultation request - AutoTech Venture',
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #4f46e5; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .cta { background: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 15px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h2>Thank You for Your Interest!</h2>
  </div>
  <div class="content">
    <p>Hi ${formData.firstName},</p>
    
    <p>Thank you for reaching out to AutoTech Venture! We've received your consultation request and our PhD experts will review it shortly.</p>
    
    <p><strong>What happens next:</strong></p>
    <ul>
      <li>✅ We'll respond within 24 hours</li>
      <li>🎯 Our team will prepare a customized solution outline</li>
      <li>📞 We'll schedule a free consultation call</li>
      <li>💡 You'll receive expert recommendations with transparent pricing</li>
    </ul>
    
    <a href="tel:+13212361956" class="cta">Call Us Now: (321) 236-1956</a>
    
    <p>In the meantime, feel free to browse our <a href="https://autotech-venture.vercel.app/blog">expert insights blog</a> or learn more about our <a href="https://autotech-venture.vercel.app/#services">services</a>.</p>
    
    <p>Best regards,<br>
    <strong>Dr. Hossein Mohammadi & Team</strong><br>
    AutoTech Venture<br>
    📧 info@atechv.com<br>
    📞 (321) 236-1956</p>
  </div>
</body>
</html>`,
    };
    
    await transporter.sendMail(confirmationEmail);
    console.log('✅ Confirmation email sent to user');
    
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your consultation request has been sent successfully. We\'ll respond within 24 hours.',
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    // Return user-friendly error message
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send message. Please try again or contact us directly at info@atechv.com',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}