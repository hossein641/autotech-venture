// app/web-design-dayton/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Globe, Code, Smartphone, ShoppingCart, Zap, Target, Users, CheckCircle, ArrowRight, Phone, Mail, MapPin, Star, Award, TrendingUp, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Web Design Dayton Ohio | Professional Website Development | AutoTech Venture',
  description: 'Professional web design and development services in Dayton, Ohio. Custom websites, e-commerce solutions, and responsive design by expert developers. Free consultation available.',
  keywords: [
    'website designer Dayton Ohio',
    'web design Dayton OH',
    'responsive web design Dayton',
    'small business website Dayton',
    'custom website development Dayton',
    'ecommerce website design Dayton'
  ],
  openGraph: {
    title: 'Web Design Dayton Ohio | Professional Website Development | AutoTech Venture',
    description: 'Professional web design and development services in Dayton, Ohio by expert developers.',
    url: 'https://www.atechv.com/web-design-dayton',
  },
  alternates: {
    canonical: 'https://www.atechv.com/web-design-dayton',
  },
};

const webServices = [
  {
    title: "Custom Website Development",
    description: "Bespoke websites built from scratch to match your brand and business goals",
    icon: Code,
    features: [
      "Custom Design & Development",
      "Content Management System",
      "SEO-Optimized Structure", 
      "Mobile-First Responsive Design"
    ],
    price: "Starting at $3,000"
  },
  {
    title: "E-commerce Solutions",
    description: "Complete online stores that drive sales and provide excellent user experience",
    icon: ShoppingCart,
    features: [
      "Shopify & WooCommerce Development",
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Processing Systems"
    ],
    price: "Starting at $5,000"
  },
  {
    title: "Website Redesign",
    description: "Transform your outdated website into a modern, high-converting digital asset",
    icon: Zap,
    features: [
      "Modern Design Updates",
      "Performance Optimization",
      "Mobile Optimization",
      "Conversion Rate Improvement"
    ],
    price: "Starting at $2,500"
  },
  {
    title: "Website Maintenance",
    description: "Ongoing support, updates, and optimization to keep your site running smoothly",
    icon: Target,
    features: [
      "Security Updates & Monitoring",
      "Content Updates",
      "Performance Optimization",
      "24/7 Technical Support"
    ],
    price: "Starting at $200/month"
  }
];

const benefits = [
  {
    title: "Mobile-First Design",
    description: "Every website is designed and developed with mobile users as the priority",
    icon: Smartphone
  },
  {
    title: "Fast Loading Speed",
    description: "Optimized for performance with loading times under 3 seconds",
    icon: Clock
  },
  {
    title: "SEO-Ready Structure", 
    description: "Built with clean code and SEO best practices for better search rankings",
    icon: TrendingUp
  },
  {
    title: "Local Dayton Team",
    description: "Based in Dayton, Ohio - available for in-person meetings and support",
    icon: MapPin
  }
];

const testimonials = [
  {
    name: "Jennifer Wilson",
    company: "Dayton Home Services",
    text: "Our new website looks amazing and our online inquiries have tripled since the redesign. The team was professional and delivered exactly what we needed.",
    rating: 5
  },
  {
    name: "Mark Thompson",
    company: "Ohio Retail Solutions",
    text: "AutoTech Venture built us a beautiful e-commerce site that's driving real results. Online sales are up 150% in just 6 months.",
    rating: 5
  },
  {
    name: "Amanda Rodriguez",
    company: "Midwest Professional Services",
    text: "The website redesign transformed our online presence. We're getting more qualified leads and our brand looks much more professional.",
    rating: 5
  }
];

const process = [
  {
    step: "1",
    title: "Discovery & Planning",
    description: "We learn about your business, goals, and target audience to create the perfect strategy"
  },
  {
    step: "2", 
    title: "Design & Wireframing",
    description: "Custom designs and layouts created specifically for your brand and user experience"
  },
  {
    step: "3",
    title: "Development & Testing", 
    description: "Professional development with rigorous testing across all devices and browsers"
  },
  {
    step: "4",
    title: "Launch & Support",
    description: "Smooth launch with ongoing maintenance and support to ensure optimal performance"
  }
];

const features = [
  "Responsive Design",
  "Fast Loading Speed", 
  "SEO Optimization",
  "Mobile-First Approach",
  "Security Features",
  "Content Management",
  "Analytics Integration",
  "Social Media Integration"
];

export default function WebDesignPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Web Design in Dayton
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Professional Websites That
                <span className="text-emerald-600 block">Convert Visitors</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Custom web design and development services for Dayton businesses. We create beautiful, 
                fast-loading websites that turn visitors into customers and grow your business online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Free Website Quote
                </button>
                <button className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors">
                  View Our Portfolio
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Mobile-First Design
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  SEO Optimized
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Fast Loading
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free Website Analysis</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your Business Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Website URL (if any)</label>
                    <input type="url" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="https://yourwebsite.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="(xxx) xxx-xxxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Goals</label>
                    <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24" placeholder="Tell us about your website goals..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
                    Get Free Analysis & Quote
                  </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  ✓ Free consultation ✓ Custom quote ✓ Local Dayton team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose AutoTech Venture for Web Design?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We create websites that not only look great but actually drive business results for Ohio companies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Web Design & Development Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete web solutions designed to help your Dayton business succeed online.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {webServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white mr-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-emerald-600 font-semibold">{service.price}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Every Website Includes These Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional features that ensure your website performs at its best.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-gray-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Website Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers exceptional websites on time and on budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full z-0">
                    <ArrowRight className="w-6 h-6 text-gray-400 mx-auto" />
                  </div>
                )}
              </div>
            ))}
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
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-emerald-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Launch Your New Website?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
            Join dozens of successful Dayton businesses with professional websites that drive results. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call (321) 236-1956
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us Today
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-emerald-100">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              95 Bramblebush Trail, Dayton, OH
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Serving All of Ohio
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}