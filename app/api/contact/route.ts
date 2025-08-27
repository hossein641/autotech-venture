// app/api/contact/route.ts - Hybrid solution (always works + tries email)
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

// Create transporter (we'll try both Resend and fallback)
const createResendTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.resend.com',
    port: 587,
    secure: false,
    auth: {
      user: 'resend',
      pass: process.env.RESEND_API_KEY,
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
    
    // ALWAYS LOG THE CONTACT (backup method)
    const timestamp = new Date().toISOString();
    console.log('📋 === NEW CONTACT SUBMISSION ===');
    console.log(`📅 ${timestamp}`);
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
    
    // TRY to send email, but don't fail if it doesn't work
    let emailSent = false;
    let emailError = '';
    
    if (process.env.RESEND_API_KEY) {
      try {
        const transporter = createResendTransporter();
        await transporter.verify();
        console.log('✅ Attempting email send via Resend...');
        
        // Email content
        const currentDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });

        // Try multiple recipient strategies
        const recipients = [
          'info@atechv.com',      // Primary
          'admin@atechv.com',     // Alternative 
          'hossein641@gmail.com'  // Fallback that should work
        ];
        
        for (const recipient of recipients) {
          try {
            const mailOptions = {
              from: 'delivered@resend.dev',
              to: recipient,
              replyTo: formData.email,
              subject: `New Contact: ${formData.firstName} ${formData.lastName}`,
              text: `NEW CONTACT SUBMISSION
Date: ${currentDate}

Contact: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

Service: ${formData.service || 'Not specified'}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

Message:
${formData.message}

Source: ${formData.source}
---
Reply to: ${formData.email}`,
            };
            
            const result = await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent successfully to ${recipient}:`, result.messageId);
            emailSent = true;
            break; // Success! Stop trying other recipients
            
          } catch (recipientError) {
            console.log(`⚠️ Failed to send to ${recipient}:`, recipientError instanceof Error ? recipientError.message : 'Unknown error');
            continue; // Try next recipient
          }
        }
        
        if (!emailSent) {
          emailError = 'All recipient addresses failed';
        }
        
      } catch (serviceError) {
        emailError = serviceError instanceof Error ? serviceError.message : 'Email service error';
        console.log('⚠️ Email service failed:', emailError);
      }
    } else {
      emailError = 'No email service configured';
      console.log('⚠️ No RESEND_API_KEY found');
    }
    
    // ALWAYS return success to user (contact is logged regardless of email)
    const successMessage = emailSent 
      ? 'Thank you! Your consultation request has been sent successfully. We\'ll respond within 24 hours.'
      : 'Thank you! Your consultation request has been received. We have your details and will respond within 24 hours.';
    
    console.log(`📧 Email status: ${emailSent ? 'SENT' : 'LOGGED_ONLY'} ${emailError ? `(${emailError})` : ''}`);
    
    return NextResponse.json({
      success: true,
      message: successMessage,
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process your request. Please try again or contact us directly at info@atechv.com',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      },
      { status: 500 }
    );
  }
}

/*
HYBRID SOLUTION FEATURES:
✅ Form ALWAYS works (never fails for users)
✅ Contact details ALWAYS logged to Vercel (backup)
✅ Tries to send email to multiple addresses
✅ Graceful fallback if email fails
✅ Clear logging for debugging

TO CHECK CONTACT SUBMISSIONS:
1. Vercel Dashboard → Your Project → Functions → /api/contact → Logs
2. Look for "=== NEW CONTACT SUBMISSION ===" entries
3. All contact details are logged with timestamps

FUTURE: Replace with SendGrid for reliable email delivery
*/