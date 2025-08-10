// data/servicesData.ts
import { Bot, Globe, Search, Brain, Zap, Code, BarChart, Target, Users, CheckCircle, TrendingUp, Clock, Award, MapPin, Phone, Mail } from 'lucide-react';

export interface Service {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: any;
  readonly features: readonly string[];
  readonly benefits?: readonly string[];
  readonly href: string;
  readonly gradient: string;
  readonly bgGradient: string;
  readonly startingPrice?: string;
  readonly category: 'primary' | 'secondary';
  readonly seoKeywords: readonly string[];
}

export interface ServiceDetail extends Service {
  readonly detailedDescription: string;
  readonly process: readonly ProcessStep[];
  readonly pricing: readonly PricingTier[];
  readonly testimonials: readonly Testimonial[];
  readonly faqs: readonly FAQ[];
}

export interface ProcessStep {
  readonly step: string;
  readonly title: string;
  readonly description: string;
}

export interface PricingTier {
  readonly name: string;
  readonly price: string;
  readonly description: string;
  readonly features: readonly string[];
  readonly recommended?: boolean;
}

export interface Testimonial {
  readonly name: string;
  readonly company: string;
  readonly text: string;
  readonly rating: number;
  readonly service?: string;
}

export interface FAQ {
  readonly question: string;
  readonly answer: string;
}

export interface Stat {
  readonly label: string;
  readonly value: string;
  readonly icon: any;
}

// Main Services Data
export const mainServices: readonly Service[] = [
  {
    id: 'ai-automation',
    title: 'AI Solutions & Automation',
    description: 'Transform your business with intelligent automation, custom AI applications, and process optimization designed for Ohio businesses.',
    icon: Bot,
    features: [
      'Custom AI Development',
      'Business Process Automation (RPA)', 
      'AI Strategy Consulting',
      'Machine Learning Implementation',
      'Predictive Analytics',
      'Intelligent Document Processing'
    ],
    benefits: [
      '304% Average ROI',
      '60-80% Time Savings', 
      'Eliminate Manual Errors',
      'Scale Operations Efficiently'
    ],
    href: '/ai-solutions-dayton',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    startingPrice: '$5,000',
    category: 'primary',
    seoKeywords: [
      'AI solutions Dayton Ohio',
      'AI services Dayton OH',
      'business automation Dayton',
      'small business automation Dayton',
      'custom AI apps Ohio',
      'AI integration services Ohio'
    ]
  },
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Professional websites that convert visitors into customers. Custom designs, responsive development, and ongoing maintenance.',
    icon: Globe,
    features: [
      'Custom Website Development',
      'Responsive Mobile-First Design',
      'E-commerce Solutions',
      'Content Management Systems',
      'Website Maintenance',
      'Performance Optimization'
    ],
    benefits: [
      'Mobile-Optimized Design',
      'Fast Loading Speeds',
      'SEO-Ready Structure', 
      'Conversion Focused'
    ],
    href: '/web-design-dayton',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    startingPrice: '$3,000',
    category: 'primary',
    seoKeywords: [
      'website designer Dayton Ohio',
      'web design Dayton OH',
      'responsive web design Dayton',
      'small business website Dayton',
      'custom website development Dayton',
      'ecommerce website design Dayton'
    ]
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Digital Marketing',
    description: 'Dominate local search results and grow your online presence with data-driven SEO strategies and digital marketing.',
    icon: Search,
    features: [
      'Local SEO Optimization',
      'Technical SEO Audits',
      'Content Marketing Strategy',
      'Google Business Profile Management',
      'Link Building & Authority',
      'Performance Tracking'
    ],
    benefits: [
      'Higher Search Rankings',
      'Increased Website Traffic',
      'More Qualified Leads',
      'Better Online Visibility'
    ],
    href: '/seo-services-dayton',
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    startingPrice: '$1,500',
    category: 'primary',
    seoKeywords: [
      'SEO services Dayton Ohio',
      'SEO management Dayton',
      'local SEO Dayton OH',
      'digital marketing Dayton Ohio',
      'search engine optimization Dayton',
      'Google Business Profile optimization Dayton'
    ]
  }
] as const;

// Secondary/Specialized Services
export const specializedServices: readonly Service[] = [
  {
    id: 'ai-consulting',
    title: 'AI Consulting',
    description: 'Strategic AI implementation planning and digital transformation consulting',
    icon: Brain,
    features: [
      'AI Readiness Assessment',
      'Implementation Strategy',
      'Change Management',
      'ROI Analysis'
    ],
    href: '/ai-consultant-dayton',
    gradient: 'from-indigo-500 to-purple-600',
    bgGradient: 'from-indigo-50 to-purple-50',
    startingPrice: '$2,500',
    category: 'secondary',
    seoKeywords: [
      'AI consultant Dayton',
      'AI strategy consulting Dayton',
      'automation consulting Ohio',
      'digital transformation consulting'
    ]
  },
  {
    id: 'process-automation',
    title: 'Process Automation',
    description: 'Workflow optimization and business process automation solutions',
    icon: Zap,
    features: [
      'Workflow Analysis',
      'Process Optimization',
      'RPA Implementation',
      'Integration Services'
    ],
    href: '/process-automation-dayton',
    gradient: 'from-yellow-500 to-orange-600',
    bgGradient: 'from-yellow-50 to-orange-50',
    startingPrice: '$4,000',
    category: 'secondary',
    seoKeywords: [
      'process automation Dayton OH',
      'workflow automation Ohio',
      'RPA services Dayton',
      'business process automation'
    ]
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    description: 'Bespoke software solutions and application development',
    icon: Code,
    features: [
      'Custom Software Development',
      'API Development',
      'Database Design',
      'System Integration'
    ],
    href: '/custom-development-dayton',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50',
    startingPrice: '$7,500',
    category: 'secondary',
    seoKeywords: [
      'custom software development Dayton',
      'application development Ohio',
      'API development services',
      'database design Dayton'
    ]
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Business intelligence, data analysis, and reporting solutions',
    icon: BarChart,
    features: [
      'Data Analysis',
      'Business Intelligence',
      'Reporting Dashboards',
      'Predictive Modeling'
    ],
    href: '/data-analytics-dayton',
    gradient: 'from-red-500 to-pink-600',
    bgGradient: 'from-red-50 to-pink-50',
    startingPrice: '$3,500',
    category: 'secondary',
    seoKeywords: [
      'data analytics consulting Dayton',
      'predictive analytics Dayton',
      'business intelligence Ohio',
      'data analysis services'
    ]
  }
] as const;

// Company Statistics
export const companyStats: readonly Stat[] = [
  { label: 'Successful Projects', value: '50+', icon: Target },
  { label: 'Client Satisfaction', value: '100%', icon: Users },
  { label: 'Years Experience', value: '8+', icon: Award },
  { label: 'Average ROI', value: '304%', icon: TrendingUp }
] as const;

// Service Benefits/Why Choose Us
export const whyChooseUs = [
  {
    title: 'PhD-Level Expertise',
    description: 'Led by Dr. Hossein Mohammadi and Dr. Maziyar Pouyan with combined 15+ years of experience in computer science and business automation.',
    icon: Award
  },
  {
    title: 'Local Dayton Presence', 
    description: 'Based right here in Dayton, Ohio. We understand local business challenges and provide personalized, hands-on service.',
    icon: MapPin
  },
  {
    title: 'Proven Track Record',
    description: '50+ successful projects with 100% client satisfaction rate. Our solutions deliver measurable ROI and long-term value.',
    icon: CheckCircle
  },
  {
    title: 'End-to-End Solutions',
    description: 'From strategy to implementation to ongoing support, we handle every aspect of your technology transformation.',
    icon: Target
  }
] as const;

// Contact Information
export const contactInfo = {
  phone: '(321) 236-1956',
  email: 'info@atechv.com',
  address: '95 Bramblebush Trail, Dayton, OH 45440',
  hours: 'Mon-Fri 9:00 AM - 6:00 PM EST'
} as const;

// Common CTAs
export const commonCTAs = {
  primary: 'Get Free Consultation',
  secondary: 'View Our Portfolio',
  phone: 'Call Now',
  email: 'Email Us Today',
  quote: 'Get Free Quote'
} as const;

// Testimonials (can be used across pages)
export const testimonials: readonly Testimonial[] = [
  {
    name: "Jennifer Miller",
    company: "Dayton Manufacturing Solutions", 
    text: "AutoTech Venture transformed our entire operation. Their AI automation reduced our processing time by 75% and eliminated costly errors.",
    rating: 5,
    service: "AI Automation"
  },
  {
    name: "Robert Chen",
    company: "Ohio Retail Group",
    text: "Our new website doubled our online sales within 6 months. The design is beautiful and the functionality is perfect.",
    rating: 5,
    service: "Web Design"
  },
  {
    name: "Maria Rodriguez", 
    company: "Midwest Healthcare Partners",
    text: "We went from page 3 to #1 on Google for our main keywords. Our patient inquiries increased by 200%.",
    rating: 5,
    service: "SEO Services"
  },
  {
    name: "David Thompson",
    company: "Thompson Logistics",
    text: "The AI consultant helped us create a digital transformation strategy that saved us $100K in the first year.",
    rating: 5,
    service: "AI Consulting"
  },
  {
    name: "Sarah Williams",
    company: "Williams Financial Services", 
    text: "Their process automation eliminated 80% of our manual data entry. Our team can now focus on high-value activities.",
    rating: 5,
    service: "Process Automation"
  }
] as const;

// Helper functions
export const getServiceById = (id: string): Service | undefined => {
  return [...mainServices, ...specializedServices].find(service => service.id === id);
};

export const getServicesByCategory = (category: 'primary' | 'secondary'): readonly Service[] => {
  return [...mainServices, ...specializedServices].filter(service => service.category === category);
};

export const getAllServices = (): readonly Service[] => {
  return [...mainServices, ...specializedServices];
};

export const getTestimonialsByService = (serviceId: string): readonly Testimonial[] => {
  const service = getServiceById(serviceId);
  if (!service) return [];
  
  return testimonials.filter(testimonial => 
    testimonial.service?.toLowerCase().includes(service.title.toLowerCase()) ||
    service.title.toLowerCase().includes(testimonial.service?.toLowerCase() || '')
  );
};

// data/servicesData.ts - Add these to your services array
export const additionalServices = [
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Business intelligence, data visualization, and predictive analytics',
    href: '/data-analytics-dayton',
    gradient: 'from-blue-500 to-cyan-600',
    bgGradient: 'from-blue-50 to-cyan-50'
  },
  {
    id: 'custom-development',
    title: 'Custom Development',
    description: 'Custom software, mobile apps, and enterprise solutions',
    href: '/custom-development-dayton',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50'
  }
];