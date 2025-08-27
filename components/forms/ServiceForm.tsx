// components/forms/ServiceForm.tsx - Reusable form for all service pages
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

// Theme configurations
const themeConfig = {
  blue: {
    primary: 'blue-600',
    primaryHover: 'blue-700',
    primaryLight: 'blue-50',
    primaryDark: 'blue-800',
    ring: 'blue-500',
  },
  emerald: {
    primary: 'emerald-600',
    primaryHover: 'emerald-700',
    primaryLight: 'emerald-50',
    primaryDark: 'emerald-800',
    ring: 'emerald-500',
  },
  purple: {
    primary: 'purple-600',
    primaryHover: 'purple-700',
    primaryLight: 'purple-50',
    primaryDark: 'purple-800',
    ring: 'purple-500',
  },
  orange: {
    primary: 'orange-600',
    primaryHover: 'orange-700',
    primaryLight: 'orange-50',
    primaryDark: 'orange-800',
    ring: 'orange-500',
  },
  cyan: {
    primary: 'cyan-600',
    primaryHover: 'cyan-700',
    primaryLight: 'cyan-50',
    primaryDark: 'cyan-800',
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
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const colors = themeConfig[theme];

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Message length validation
    if (formData.message && formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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
        setSubmitMessage(result.message);
        
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          budget: '',
          timeline: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(result.error || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clear status message
  const clearStatus = () => {
    setSubmitStatus('idle');
    setSubmitMessage('');
  };

  return (
    <div className={`bg-white rounded-2xl p-${compact ? '6' : '8'} shadow-lg`}>
      <div className={`text-center mb-${compact ? '6' : '8'}`}>
        <h3 className={`text-${compact ? '2xl' : '3xl'} font-bold text-gray-900 mb-4`}>
          {title}
        </h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className={`mb-6 p-4 bg-${colors.primaryLight} border border-${colors.primary} border-opacity-20 rounded-lg flex items-center justify-between`}>
          <div className="flex items-center">
            <CheckCircle className={`w-5 h-5 text-${colors.primary} mr-2`} />
            <span className={`text-${colors.primaryDark}`}>{submitMessage}</span>
          </div>
          <button onClick={clearStatus} className={`text-${colors.primary} hover:text-${colors.primaryHover}`}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-red-800">{submitMessage}</span>
          </div>
          <button onClick={clearStatus} className="text-red-600 hover:text-red-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
                errors.firstName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="John"
            />
            {errors.firstName && (
              <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
                errors.lastName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Smith"
            />
            {errors.lastName && (
              <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="john@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
            placeholder="Your Company"
          />
        </div>

        {/* Budget and Timeline */}
        {!compact && (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring}`}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {compact ? 'Message *' : 'Project Description *'}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={compact ? 3 : 4}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-${colors.ring} ${
              errors.message ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder={compact ? 
              `Tell us about your ${service.toLowerCase()} needs...` :
              `Describe your ${service.toLowerCase()} project, goals, and challenges. The more details you provide, the better we can help you.`
            }
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-${colors.primary} text-white py-${compact ? '3' : '4'} rounded-lg hover:bg-${colors.primaryHover} transition-colors font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Get Free {service} Consultation
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <p className="text-xs text-gray-500 text-center">
          ✓ No obligation consultation ✓ Response within 24 hours ✓ PhD expert evaluation
        </p>
      </form>
    </div>
  );
}