export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AutoTech Venture",
  "description": "AI-powered automation solutions, web design, and SEO services for small businesses in Dayton, Ohio. Led by PhD experts in computer science.",
  "url": "https://www.atechv.com",
  "logo": "https://www.atechv.com/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "95 Bramblebush Trail",
    "addressLocality": "Dayton",
    "addressRegion": "OH",
    "postalCode": "45440",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-321-236-1956",
    "email": "info@atechv.com",
    "contactType": "customer service",
    "areaServed": ["Dayton", "Ohio", "United States"],
    "availableLanguage": "English"
  },
  "founder": [
    {
      "@type": "Person",
      "name": "Dr. Hossein Mohammadi",
      "jobTitle": "Co-Founder & Chief Executive Officer",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "PhD Computer Science"
      }
    },
    {
      "@type": "Person",
      "name": "Dr. Maziyar Pouyan", 
      "jobTitle": "Co-Founder & Chief Technology Officer",
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "PhD Computer Science"
      }
    }
  ],
  "foundingDate": "2019",
  "openingHours": ["Mo-Fr 09:00-18:00"],
  "areaServed": {
    "@type": "State",
    "name": "Ohio"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AutoTech Venture",
  "url": "https://www.atechv.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.atechv.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};
