// app/custom-development-dayton/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Code, Smartphone, Database, Zap, Globe, Cog, Users, CheckCircle, ArrowRight, Phone, Mail, MapPin, Star, Award, TrendingUp, Clock, Shield, Layers } from 'lucide-react';
import ServiceForm from '@/components/forms/ServiceForm';

export const metadata: Metadata = {
  title: 'Custom Software Development Dayton Ohio | Application Development | AutoTech Venture',
  description: 'Professional custom software development services in Dayton, Ohio. Custom applications, API development, mobile apps, and database design by expert developers.',
  keywords: [
    'custom software development Dayton',
    'application development Ohio',
    'API development services',
    'database design Dayton',
    'mobile app development Ohio',
    'custom web applications'
  ],
  openGraph: {
    title: 'Custom Software Development Dayton Ohio | Application Development | AutoTech Venture',
    description: 'Professional custom software development services in Dayton, Ohio by expert developers.',
    url: 'https://www.atechv.com/custom-development-dayton',
  },
  alternates: {
    canonical: 'https://www.atechv.com/custom-development-dayton',
  },
};

const developmentServices = [
  {
    title: "Custom Web Applications",
    description: "Full-stack web applications built specifically for your business requirements",
    icon: Globe,
    features: [
      "React/Next.js Frontend Development",
      "Node.js/Python Backend Systems",
      "Database Design & Optimization",
      "API Integration & Development"
    ],
    price: "Starting at $7,500"
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: Smartphone,
    features: [
      "Native iOS & Android Apps",
      "React Native Cross-Platform",
      "App Store Deployment",
      "Backend API Development"
    ],
    price: "Starting at $12,000"
  },
  {
    title: "API Development & Integration",
    description: "Custom APIs and seamless integration between business systems",
    icon: Layers,
    features: [
      "RESTful API Development",
      "GraphQL Implementation",
      "Third-party Integrations",
      "Microservices Architecture"
    ],
    price: "Starting at $4,500"
  },
  {
    title: "Enterprise Software Solutions",
    description: "Scalable enterprise applications for complex business workflows",
    icon: Cog,
    features: [
      "Custom Business Logic",
      "User Management Systems",
      "Reporting & Analytics",
      "Security & Compliance"
    ],
    price: "Starting at $15,000"
  }
];

const benefits = [
  {
    title: "Perfect Fit Solution",
    description: "Custom software built exactly for your business needs and workflows",
    icon: Award
  },
  {
    title: "Scalable Architecture",
    description: "Solutions designed to grow with your business and handle increasing demand",
    icon: TrendingUp
  },
  {
    title: "Secure & Reliable", 
    description: "Enterprise-grade security and 99.9% uptime for mission-critical applications",
    icon: Shield
  },
  {
    title: "Ongoing Support",
    description: "Comprehensive maintenance and support to keep your software running smoothly",
    icon: Users
  }
];

const testimonials = [
  {
    name: "Jennifer Martinez",
    company: "Dayton Logistics Solutions",
    text: "The custom inventory management system AutoTech Venture built transformed our operations. We now track 10,000+ items in real-time and reduced errors by 95%.",
    rating: 5
  },
  {
    name: "Robert Chen",
    company: "Ohio Financial Services",
    text: "Our custom client portal increased customer satisfaction by 40% and reduced support calls by 60%. The mobile app is intuitive and feature-rich.",
    rating: 5
  },
  {
    name: "Sarah Wilson",
    company: "Midwest Manufacturing Corp",
    text: "The API integration connected all our systems seamlessly. Data flows automatically between departments, eliminating manual data entry completely.",
    rating: 5
  }
];

const process = [
  {
    step: "1",
    title: "Discovery & Planning",
    description: "Understand requirements, define scope, and create detailed technical specifications"
  },
  {
    step: "2", 
    title: "Design & Architecture",
    description: "Create system architecture, user interface designs, and database schemas"
  },
  {
    step: "3",
    title: "Development & Testing", 
    description: "Agile development with continuous testing and regular client feedback"
  },
  {
    step: "4",
    title: "Deployment & Support",
    description: "Smooth deployment, user training, and ongoing maintenance and support"
  }
];

const developmentTypes = [
  { name: "Web Applications", description: "Custom web-based business applications" },
  { name: "Mobile Apps", description: "iOS and Android mobile applications" },
  { name: "API Development", description: "Custom APIs and system integrations" },
  { name: "Database Solutions", description: "Custom database design and optimization" },
  { name: "E-commerce Platforms", description: "Custom online stores and marketplaces" },
  { name: "CRM Systems", description: "Customer relationship management solutions" },
  { name: "Inventory Management", description: "Stock tracking and warehouse systems" },
  { name: "Workflow Automation", description: "Custom business process automation" }
];

const technologiesUsed = [
  "Frontend: React, Next.js, Vue.js, Angular",
  "Backend: Node.js, Python, Java, .NET",
  "Mobile: React Native, Flutter, Swift, Kotlin",
  "Databases: PostgreSQL, MySQL, MongoDB",
  "Cloud: AWS, Google Cloud, Microsoft Azure",
  "APIs: REST, GraphQL, WebSocket",
  "DevOps: Docker, Kubernetes, CI/CD",
  "Security: OAuth, JWT, SSL/TLS, Encryption"
];

const beforeAfter = [
  { 
    challenge: "Manual Inventory Tracking",
    before: "Excel spreadsheets, 3-day reconciliation",
    after: "Real-time inventory management system",
    improvement: "95% error reduction, real-time accuracy"
  },
  { 
    challenge: "Disconnected Systems",
    before: "5 separate systems, manual data entry",
    after: "Integrated platform with automated sync",
    improvement: "80% time savings, 100% data accuracy"
  },
  { 
    challenge: "Customer Service Bottleneck",
    before: "Phone-only support, 2-day response",
    after: "Custom portal with instant access",
    improvement: "60% reduction in support calls"
  },
  { 
    challenge: "Reporting Challenges",
    before: "Weekly manual reports, outdated data",
    after: "Real-time dashboards and automated reports",
    improvement: "Daily insights, 99% time savings"
  }
];

const industries = [
  "Manufacturing & Production",
  "Healthcare & Medical",
  "Financial Services",
  "Professional Services", 
  "Retail & E-commerce",
  "Logistics & Transportation",
  "Education & Training",
  "Non-profit Organizations"
];

export default function CustomDevelopmentPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Custom Development in Dayton
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Custom Software Solutions
                <span className="text-green-600 block">Built for Your Business</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional custom software development services for Dayton businesses. We create 
                tailored applications, mobile apps, and system integrations that solve your unique 
                business challenges and drive operational efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Free Development Quote
                </button>
                <button className="border border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors">
                  View Development Portfolio
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Expert Developers
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Agile Development
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Ongoing Support
                </div>
              </div>
            </div>
            <ServiceForm 
            service="Custom Software Development"
            source="custom-development-dayton" 
            theme="emerald" // or emerald, purple, orange, cyan
            title="Get Your Free Consultation"
            description="Tell us about your project and we'll provide a customized solution with transparent pricing. No obligation, just expert advice from our PhD team."
            compact={true} // true for smaller forms
            />

          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Custom Development Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how custom software solutions solve real business challenges for Ohio companies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfter.map((example, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{example.challenge}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mr-4">Before</span>
                    <span className="text-gray-600">{example.before}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mr-4">After</span>
                    <span className="text-gray-600">{example.after}</span>
                  </div>
                  <div className="bg-green-100 p-4 rounded-lg">
                    <span className="text-green-800 font-semibold">Result: {example.improvement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Custom Development?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Custom software solutions provide competitive advantages that off-the-shelf products can't match.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-green-100 text-green-600 mb-4">
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Custom Development Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              End-to-end custom software development services designed to meet your unique business requirements.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {developmentServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white mr-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-green-600 font-semibold">{service.price}</p>
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
                  <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Development Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Types of Custom Software We Build
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple web applications to complex enterprise systems, we build software that grows with your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {developmentTypes.map((type, index) => (
              <div key={index} className="p-6 bg-white rounded-xl hover:bg-green-50 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{type.name}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern, proven technologies that ensure your custom software is fast, secure, and scalable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologiesUsed.map((tech, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-gray-900">{tech}</span>
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
              Our Development Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven agile methodology that delivers high-quality custom software on time and within budget.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold mb-4">
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

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Custom software solutions across multiple industries with deep domain expertise.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-green-50 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Development Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from custom software solutions across Ohio
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-green-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Build Your Custom Solution?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join successful Dayton businesses with custom software that gives them a competitive edge. 
            Get started with a free project consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call (321) 236-1956
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us Today
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-green-100">
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