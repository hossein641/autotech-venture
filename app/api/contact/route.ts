// app/api/contact/route.ts - SendGrid version (replace your current file)
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

// SendGrid transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });
};

// Validation function
const validateFormData = (data: any): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.firstName?.trim()) errors.push('First name is required');
  if (!data.lastName?.trim()) errors.push('Last name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.message?.trim()) errors.push('Message is required');
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push('Please provide a valid email address');
  }
  
  if (data.message && data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  }
  
  return { isValid: errors.length === 0, errors };
};

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Contact form submission received');
    
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
    
    // Prepare contact data
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
    
    // ALWAYS LOG THE CONTACT (backup)
    console.log('📋 === NEW CONTACT SUBMISSION ===');
    console.log(`📅 ${new Date().toISOString()}`);
    console.log(`👤 ${formData.firstName} ${formData.lastName}`);
    console.log(`📧 ${formData.email}`);
    console.log(`📞 ${formData.phone || 'Not provided'}`);
    console.log(`🏢 ${formData.company || 'Not provided'}`);
    console.log(`🛠️  ${formData.service || 'Not specified'}`);
    console.log(`💰 ${formData.budget || 'Not specified'}`);
    console.log(`⏰ ${formData.timeline || 'Not specified'}`);
    console.log(`💬 ${formData.message}`);
    console.log(`🔗 ${formData.source}`);
    console.log('================================');
    
    // TRY SendGrid email
    let emailSent = false;
    let emailError = '';
    
    if (process.env.SENDGRID_API_KEY) {
      try {
        const transporter = createTransporter();
        await transporter.verify();
        console.log('✅ SendGrid connection verified');
        
        const currentDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        const mailOptions = {
          from: 'info@atechv.com', // Your domain
          to: 'info@atechv.com',
          replyTo: formData.email,
          subject: `New Contact: ${formData.firstName} ${formData.lastName}`,
          text: `NEW CONTACT SUBMISSION - AutoTech Venture
Date: ${currentDate}

CONTACT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

PROJECT DETAILS:
Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

MESSAGE:
${formData.message}

Source: ${formData.source}

---
Reply to this email to respond directly to the customer.`,
          html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background: #4f46e5; color: white; padding: 20px; text-align: center;">
    <h2>🚀 New Contact Submission</h2>
    <p>AutoTech Venture - ${currentDate}</p>
  </div>
  
  <div style="padding: 20px; background: #f9f9f9;">
    <h3>Contact Information</h3>
    <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    ${formData.phone ? `<p><strong>Phone:</strong> ${formData.phone}</p>` : ''}
    ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
    
    <h3>Project Details</h3>
    ${formData.service ? `<p><strong>Service:</strong> ${formData.service}</p>` : ''}
    ${formData.budget ? `<p><strong>Budget:</strong> ${formData.budget}</p>` : ''}
    ${formData.timeline ? `<p><strong>Timeline:</strong> ${formData.timeline}</p>` : ''}
    
    <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #4f46e5;">
      <strong>Message:</strong><br>
      ${formData.message}
    </div>
    
    <p><strong>Source:</strong> ${formData.source}</p>
    <p><small>Reply directly to this email to respond to the customer.</small></p>
  </div>
</div>`,
        };
        
        const result = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully via SendGrid:', result.messageId);
        emailSent = true;
        
      } catch (serviceError) {
        emailError = serviceError instanceof Error ? serviceError.message : 'SendGrid error';
        console.log('⚠️ SendGrid failed:', emailError);
      }
    } else {
      emailError = 'No SENDGRID_API_KEY configured';
      console.log('⚠️ No SendGrid API key found');
    }
    
    // ALWAYS return success (contact is logged)
    const successMessage = emailSent 
      ? 'Thank you! Your consultation request has been sent successfully. We\'ll respond within 24 hours.'
      : 'Thank you! Your consultation request has been received. We have your details and will respond within 24 hours.';
    
    console.log(`📧 Email status: ${emailSent ? 'SENT_VIA_SENDGRID' : 'LOGGED_ONLY'} ${emailError ? `(${emailError})` : ''}`);
    
    return NextResponse.json({
      success: true,
      message: successMessage,
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process your request. Please try again or contact us directly at info@atechv.com'
      },
      { status: 500 }
    );
  }
}