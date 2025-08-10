// app/services/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { Bot, Globe, Search, ArrowRight, CheckCircle, Star, Users, Award, TrendingUp, Phone, Mail, MapPin, Zap, Brain, Code, BarChart, Target, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Tech Services Dayton | AI, Web Design & SEO | AutoTech Venture',
  description: 'Comprehensive technology services for Dayton businesses. AI solutions, web design, SEO services, and automation by PhD experts. Free consultation available.',
  keywords: [
    'tech services Dayton Ohio',
    'AI solutions Dayton',
    'web design Dayton',
    'SEO services Dayton',
    'business automation Dayton',
    'digital services Ohio'
  ],
  openGraph: {
    title: 'Professional Tech Services Dayton | AI, Web Design & SEO | AutoTech Venture',
    description: 'Comprehensive technology services for Dayton businesses by PhD experts.',
    url: 'https://www.atechv.com/services',
  },
  alternates: {
    canonical: 'https://www.atechv.com/services',
  },
};

const mainServices = [
  {
    id: 'ai-automation',
    title: 'AI Solutions & Automation',
    description: 'Transform your business operations with intelligent automation, custom AI applications, and process optimization designed specifically for Ohio businesses.',
    icon: Bot,
    features: [
      'Custom AI Development & Integration',
      'Business Process Automation (RPA)', 
      'AI Strategy Consulting & Planning',
      'Machine Learning Implementation',
      'Predictive Analytics Solutions',
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
    startingPrice: '$5,000'
  },
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Professional websites that convert visitors into customers. Custom designs, responsive development, e-commerce solutions, and ongoing maintenance.',
    icon: Globe,
    features: [
      'Custom Website Development',
      'Responsive Mobile-First Design',
      'E-commerce & Online Stores',
      'Content Management Systems',
      'Website Maintenance & Support',
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
    startingPrice: '$3,000'
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Digital Marketing',
    description: 'Dominate local search results and grow your online presence with data-driven SEO strategies and comprehensive digital marketing solutions.',
    icon: Search,
    features: [
      'Local SEO Optimization',
      'Technical SEO Audits & Fixes',
      'Content Marketing Strategy',
      'Google Business Profile Management',
      'Link Building & Authority Building',
      'Performance Tracking & Reporting'
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
    startingPrice: '$1,500'
  }
];

const specializations = [
  {
    title: 'AI Consulting',
    description: 'Strategic AI implementation planning',
    icon: Brain,
    href: '/ai-consultant-dayton'
  },
  {
    title: 'Process Automation',
    description: 'Workflow and business process optimization',
    icon: Zap,
    href: '/process-automation-dayton'
  },
  {
    title: 'Custom Development',
    description: 'Bespoke software solutions',
    icon: Code,
    href: '/custom-development-dayton'
  },
  {
    title: 'Data Analytics',
    description: 'Business intelligence and insights',
    icon: BarChart,
    href: '/data-analytics-dayton'
  }
];

const stats = [
  { label: 'Successful Projects', value: '50+', icon: Target },
  { label: 'Client Satisfaction', value: '100%', icon: Users },
  { label: 'Years Experience', value: '8+', icon: Award },
  { label: 'Average ROI', value: '304%', icon: TrendingUp }
];

const testimonials = [
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
  }
];

export default function ServicesPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Professional Tech Services
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete Technology Solutions for
              <span className="text-blue-600 block">Dayton Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              From AI automation to professional web design and SEO optimization, we provide end-to-end 
              technology solutions that drive growth, efficiency, and competitive advantage for Ohio businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Get Free Consultation
              </button>
              <button className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                View Our Portfolio
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-3 rounded-full bg-white shadow-sm text-blue-600 mb-3">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-gray-600 font-medium text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive technology solutions designed to solve real business problems and drive measurable results.
            </p>
          </div>

          <div className="space-y-16">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              const isReverse = index % 2 === 1;
              
              return (
                <div key={service.id} className={`grid lg:grid-cols-2 gap-12 items-center ${isReverse ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={isReverse ? 'lg:col-start-2' : ''}>
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white mb-6`}>
                      <IconComponent className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                      {service.title}
                    </h3>
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">What's Included:</h4>
                      <div className="grid md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Benefits:</h4>
                      <div className="flex flex-wrap gap-3">
                        {service.benefits.map((benefit, idx) => (
                          <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                      <Link 
                        href={service.href}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <div className="text-gray-600">
                        Starting at <span className="font-semibold text-gray-900">{service.startingPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={isReverse ? 'lg:col-start-1' : ''}>
                    <div className={`bg-gradient-to-br ${service.bgGradient} p-8 rounded-2xl`}>
                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h4 className="text-xl font-bold text-gray-900 mb-4">Ready to get started?</h4>
                        <p className="text-gray-600 mb-6">Get a free consultation and custom quote for your project.</p>
                        <form className="space-y-4">
                          <input 
                            type="text" 
                            placeholder="Your Name" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <input 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <textarea 
                            placeholder="Tell us about your project..." 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                          ></textarea>
                          <button 
                            type="submit" 
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                          >
                            Get Free Quote
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Additional Specializations
            </h2>
            <p className="text-xl text-gray-600">
              Specialized services to meet your unique business needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, index) => {
              const IconComponent = spec.icon;
              return (
                <Link 
                  key={index} 
                  href={spec.href}
                  className="group bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="p-3 rounded-lg bg-blue-100 text-blue-600 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{spec.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{spec.description}</p>
                  <div className="flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Dayton Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses across Ohio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600">{testimonial.company}</div>
                  <div className="text-blue-600 text-sm font-medium mt-1">{testimonial.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Dayton Businesses Choose AutoTech Venture
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">PhD-Level Expertise</h3>
                    <p className="text-gray-600">Led by Dr. Hossein Mohammadi and Dr. Maziyar Pouyan with combined 15+ years of experience in computer science and business automation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Local Dayton Presence</h3>
                    <p className="text-gray-600">Based right here in Dayton, Ohio. We understand local business challenges and provide personalized, hands-on service.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">50+ successful projects with 100% client satisfaction rate. Our solutions deliver measurable ROI and long-term value.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">End-to-End Solutions</h3>
                    <p className="text-gray-600">From strategy to implementation to ongoing support, we handle every aspect of your technology transformation.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Get Started?</h3>
              <p className="text-blue-100 mb-8">
                Join 50+ successful Dayton businesses that have transformed their operations with our technology solutions. 
                Schedule your free consultation today.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-white text-blue-600 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call (321) 236-1956
                </button>
                <button className="w-full border border-white text-white py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Us Today
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-blue-500 text-center">
                <div className="flex items-center justify-center text-blue-100">
                  <MapPin className="w-4 h-4 mr-2" />
                  95 Bramblebush Trail, Dayton, OH 45440
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}