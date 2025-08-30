// components/forms/ServiceForm.tsx - Accessibility optimized
'use client';

import { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, X, AlertCircle } from 'lucide-react';

interface ServiceFormProps {
  service: string; // The specific service (e.g., "AI Solutions", "Web Design")
  source: string; // Source page (e.g., "AI Solutions Page", "Web Design Page")
  theme?: 'blue' | 'emerald' | 'purple' | 'orange' | 'cyan'; // Color theme
  title?: string;
  description?: string;
  compact?: boolean; // For smaller forms
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  timeline: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

// ✅ Improved theme configurations with better color contrast
const themeConfig = {
  blue: {
    primary: 'blue-700',        // Darker for better contrast
    primaryHover: 'blue-800',
    primaryLight: 'blue-50',
    primaryDark: 'blue-900',
    ring: 'blue-500',
  },
  emerald: {
    primary: 'emerald-700',     // ✅ Darker emerald for better contrast
    primaryHover: 'emerald-800',
    primaryLight: 'emerald-50',
    primaryDark: 'emerald-900',
    ring: 'emerald-500',
  },
  purple: {
    primary: 'purple-700',
    primaryHover: 'purple-800',
    primaryLight: 'purple-50',
    primaryDark: 'purple-900',
    ring: 'purple-500',
  },
  orange: {
    primary: 'orange-700',
    primaryHover: 'orange-800',
    primaryLight: 'orange-50',
    primaryDark: 'orange-900',
    ring: 'orange-500',
  },
  cyan: {
    primary: 'cyan-700',
    primaryHover: 'cyan-800',
    primaryLight: 'cyan-50',
    primaryDark: 'cyan-900',
    ring: 'cyan-500',
  },
};

const budgetRanges = [
  "Under $5,000",
  "$5,000 - $15,000",
  "$15,000 - $50,000", 
  "$50,000 - $100,000",
  "Over $100,000",
  "Not Sure - Need Estimate"
];

const timelineOptions = [
  "ASAP - Within 1 month",
  "2-3 months",
  "3-6 months",
  "6+ months", 
  "Just exploring options"
];

export default function ServiceForm({ 
  service, 
  source, 
  theme = 'blue',
  title = "Get Your Free Consultation",
  description = "Tell us about your project and we'll provide a customized solution with transparent pricing.",
  compact = false 
}: ServiceFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    timeline: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});

  const colors = themeConfig[theme];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.message && formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service,
          source
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Service form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 lg:p-8 shadow-xl border border-${colors.primaryLight}`}>
      {/* Success State */}
      {submitStatus === 'success' && (
        <div className="text-center py-8">
          <CheckCircle className={`w-16 h-16 text-${colors.primary} mx-auto mb-4`} />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your consultation request has been sent successfully. We'll respond within 24 hours.
          </p>
          <button 
            onClick={() => setSubmitStatus('idle')}
            className={`inline-flex items-center text-${colors.primary} hover:text-${colors.primaryHover} font-semibold transition-colors`}
          >
            Send Another Request
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      )}

      {/* Form */}
      {submitStatus !== 'success' && (
        <>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-800">Submission Error</h4>
                <p className="text-red-700 text-sm">
                  There was an error sending your message. Please try again or contact us directly.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${service}-firstName`} className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id={`${service}-firstName`}
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
                    errors.firstName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="John"
                  required
                  aria-describedby={errors.firstName ? `${service}-firstName-error` : undefined}
                />
                {errors.firstName && (
                  <p id={`${service}-firstName-error`} className="mt-1 text-sm text-red-600" role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={`${service}-lastName`} className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id={`${service}-lastName`}
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
                    errors.lastName ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Smith"
                  required
                  aria-describedby={errors.lastName ? `${service}-lastName-error` : undefined}
                />
                {errors.lastName && (
                  <p id={`${service}-lastName-error`} className="mt-1 text-sm text-red-600" role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${service}-email`} className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id={`${service}-email`}
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="john@company.com"
                  required
                  aria-describedby={errors.email ? `${service}-email-error` : undefined}
                />
                {errors.email && (
                  <p id={`${service}-email-error`} className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor={`${service}-phone`} className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id={`${service}-phone`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Company */}
            <div>
              <label htmlFor={`${service}-company`} className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id={`${service}-company`}
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
                placeholder="Your Company"
              />
            </div>

            {/* Budget and Timeline - ✅ Fixed accessibility with proper labels */}
            {!compact && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`${service}-budget`} className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range
                  </label>
                  <select
                    id={`${service}-budget`}
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
                    aria-label="Select your budget range for this project"
                  >
                    <option value="">Select budget range</option>
                    {budgetRanges.map((budget) => (
                      <option key={budget} value={budget}>
                        {budget}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor={`${service}-timeline`} className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline
                  </label>
                  <select
                    id={`${service}-timeline`}
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
                    aria-label="Select your preferred project timeline"
                  >
                    <option value="">Select timeline</option>
                    {timelineOptions.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label htmlFor={`${service}-message`} className="block text-sm font-medium text-gray-700 mb-2">
                {compact ? 'Message *' : 'Project Details *'}
              </label>
              <textarea
                id={`${service}-message`}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={compact ? 3 : 4}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
                  errors.message ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder={compact 
                  ? "Tell us about your project..." 
                  : "Describe your project goals, challenges, and how we can help your business succeed..."
                }
                required
                aria-describedby={errors.message ? `${service}-message-error` : `${service}-message-help`}
              />
              {errors.message && (
                <p id={`${service}-message-error`} className="mt-1 text-sm text-red-600" role="alert">
                  {errors.message}
                </p>
              )}
              {!errors.message && (
                <p id={`${service}-message-help`} className="mt-1 text-sm text-gray-500">
                  The more details you provide, the better we can help you.
                </p>
              )}
            </div>

            {/* ✅ Submit Button with improved color contrast */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-${colors.primary} text-white py-3 px-6 rounded-lg hover:bg-${colors.primaryHover} transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Get Free Consultation
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              We'll respond within 24 hours with a customized solution proposal.
            </p>
          </form>
        </>
      )}
    </div>
  );
}