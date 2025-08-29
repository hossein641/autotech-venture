// Analytics utility functions for tracking events

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const trackEvent = (eventName: string, parameters: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Form submission tracking
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', {
    form_type: formType,
    event_category: 'engagement',
    event_label: formType,
  });
};

// Phone number click tracking
export const trackPhoneClick = (location: string = 'unknown') => {
  trackEvent('phone_click', {
    event_category: 'contact',
    event_label: location,
    contact_method: 'phone',
  });
};

// Email click tracking
export const trackEmailClick = (location: string = 'unknown') => {
  trackEvent('email_click', {
    event_category: 'contact',
    event_label: location,
    contact_method: 'email',
  });
};

// Service page view tracking
export const trackServiceView = (serviceName: string) => {
  trackEvent('view_item', {
    item_category: 'service',
    item_name: serviceName,
    event_category: 'engagement',
  });
};

// Consultation request tracking (high-value conversion)
export const trackConsultationRequest = (serviceType: string, estimatedValue: number = 2500) => {
  trackEvent('generate_lead', {
    currency: 'USD',
    value: estimatedValue, // Estimated lead value
    service_type: serviceType,
    event_category: 'conversion',
    lead_type: 'consultation_request',
  });
};

// Download tracking (for resources, guides, etc.)
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType,
    event_category: 'engagement',
  });
};

// Scroll depth tracking
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll', {
    percent_scrolled: percentage,
    event_category: 'engagement',
  });
};

// Button click tracking
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: location,
    event_category: 'engagement',
  });
};

// External link tracking
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText,
    event_category: 'engagement',
  });
};