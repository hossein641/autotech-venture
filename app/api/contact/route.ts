// app/api/contact/route.ts - Simplified version to fix 450 error
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

// Create Resend transporter
const createTransporter = () => {
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
    
    // SIMPLIFIED: Plain text only email
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const mailOptions = {
      from: 'delivered@resend.dev',
      to: 'info@atechv.com',
      replyTo: formData.email,
      subject: `New Consultation Request from ${formData.firstName} ${formData.lastName}`,
      text: `
NEW CONSULTATION REQUEST - AutoTech Venture
Received on ${currentDate}

CONTACT INFORMATION:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
${formData.phone ? `Phone: ${formData.phone}` : ''}
${formData.company ? `Company: ${formData.company}` : ''}

PROJECT DETAILS:
${formData.service ? `Service: ${formData.service}` : ''}
${formData.budget ? `Budget: ${formData.budget}` : ''}
${formData.timeline ? `Timeline: ${formData.timeline}` : ''}

MESSAGE:
${formData.message}

Form submitted via: ${formData.source}

---
Reply to this email to respond directly to the customer.
      `,
    };
    
    // Send email with simplified content
    console.log('📧 Attempting to send simplified email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', result.messageId);
    
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your consultation request has been sent successfully. We\'ll respond within 24 hours.',
    });
    
  } catch (error) {
    console.error('❌ Contact form error:', error);
    
    // Enhanced error logging for debugging
    if (error && typeof error === 'object' && 'code' in error && 'responseCode' in error) {
      const emailError = error as { code: string; response: string; responseCode: number; command: string; message: string };
      console.error('❌ EMAIL ERROR DETAILS:', {
        code: emailError.code,
        response: emailError.response,
        responseCode: emailError.responseCode,
        command: emailError.command,
        message: emailError.message
      });
    }
    
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