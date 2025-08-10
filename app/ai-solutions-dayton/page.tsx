// app/ai-solutions-dayton/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Bot, Brain, Zap, Target, Users, CheckCircle, ArrowRight, Phone, Mail, MapPin, Star, Award, TrendingUp, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Solutions Dayton Ohio | Custom AI Services | AutoTech Venture',
  description: 'Professional AI solutions and services in Dayton, Ohio. Custom AI development, machine learning, and business automation by PhD experts. Free consultation available.',
  keywords: [
    'AI solutions Dayton Ohio',
    'AI services Dayton OH',
    'business automation Dayton',
    'small business automation Dayton',
    'custom AI apps Ohio',
    'AI integration services Ohio'
  ],
  openGraph: {
    title: 'AI Solutions Dayton Ohio | Custom AI Services | AutoTech Venture',
    description: 'Professional AI solutions and services in Dayton, Ohio by PhD experts.',
    url: 'https://www.atechv.com/ai-solutions-dayton',
  },
  alternates: {
    canonical: 'https://www.atechv.com/ai-solutions-dayton',
  },
};

const aiServices = [
  {
    title: "Custom AI Development",
    description: "Bespoke AI applications built specifically for your business needs and workflows",
    icon: Brain,
    features: [
      "Machine Learning Models",
      "Predictive Analytics", 
      "Natural Language Processing",
      "Computer Vision Solutions"
    ],
    price: "Starting at $15,000"
  },
  {
    title: "Business Process Automation",
    description: "Intelligent automation that reduces manual work and increases efficiency",
    icon: Zap,
    features: [
      "Workflow Automation",
      "Document Processing",
      "Data Integration",
      "Quality Assurance Systems"
    ],
    price: "Starting at $8,000"
  },
  {
    title: "AI Strategy Consulting",
    description: "Strategic guidance on AI implementation and digital transformation",
    icon: Target,
    features: [
      "AI Readiness Assessment",
      "Implementation Roadmap",
      "Change Management",
      "ROI Optimization"
    ],
    price: "Starting at $5,000"
  },
  {
    title: "AI Integration Services",
    description: "Seamlessly integrate AI capabilities into your existing systems",
    icon: Bot,
    features: [
      "API Development",
      "System Integration",
      "Data Pipeline Setup",
      "Performance Monitoring"
    ],
    price: "Starting at $10,000"
  }
];

const benefits = [
  {
    title: "304% Average ROI",
    description: "Our clients see an average return on investment of 304% within 12 months",
    icon: TrendingUp
  },
  {
    title: "60-80% Time Savings",
    description: "Reduce manual workload significantly while maintaining service quality",
    icon: Clock
  },
  {
    title: "PhD-Led Expertise", 
    description: "Dr. Maziyar Pouyan leads our AI development with 8+ years of research experience",
    icon: Award
  },
  {
    title: "Local Dayton Team",
    description: "Based in Dayton, Ohio - we understand local business challenges",
    icon: MapPin
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Dayton Manufacturing Co.",
    text: "AutoTech Venture's AI automation reduced our processing time by 70% and eliminated manual errors entirely.",
    rating: 5
  },
  {
    name: "Mike Chen",
    company: "Ohio Retail Solutions",
    text: "The predictive analytics system they built helped us optimize inventory and increase profits by 25%.",
    rating: 5
  },
  {
    name: "Lisa Rodriguez",
    company: "Midwest Healthcare Partners",
    text: "Their AI consulting transformed our patient scheduling. We now handle 3x more appointments with the same staff.",
    rating: 5
  }
];

const process = [
  {
    step: "1",
    title: "Discovery & Assessment",
    description: "Comprehensive analysis of your current state and AI opportunities"
  },
  {
    step: "2", 
    title: "Strategy Development",
    description: "Custom AI strategy aligned with your business goals and budget"
  },
  {
    step: "3",
    title: "Development & Implementation", 
    description: "Agile development process with regular check-ins and updates"
  },
  {
    step: "4",
    title: "Training & Support",
    description: "Comprehensive training and ongoing support for your team"
  }
];

export default function AISolutionsPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI Solutions in Dayton
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your Business with
                <span className="text-blue-600 block">AI Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Custom AI development and automation solutions designed specifically for Ohio businesses. 
                Led by PhD computer scientists with proven results and 304% average ROI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Free AI Consultation
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  View AI Case Studies
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  PhD-Led Team
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Local to Dayton, OH
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Proven ROI
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-2xl border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Your Free AI Assessment</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Company Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(xxx) xxx-xxxx" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Business Challenge</label>
                    <textarea className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24" placeholder="Tell us about your biggest challenge..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Request Free Assessment
                  </button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  ✓ Free consultation ✓ No commitment ✓ Local Dayton team
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
              Why Choose AutoTech Venture for AI Solutions?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine deep technical expertise with local understanding to deliver AI solutions that actually work for your business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-4">
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
              Our AI Services & Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI services designed to solve real business problems and drive measurable results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {aiServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white mr-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-blue-600 font-semibold">{service.price}</p>
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
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our AI Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful AI implementation with minimal risk and maximum impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-2xl font-bold mb-4">
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
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Dayton Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses in Ohio
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
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join 50+ successful Ohio businesses that have revolutionized their operations with our AI solutions. 
            Get started with a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call (321) 236-1956
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us Today
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-blue-100">
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