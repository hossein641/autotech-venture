// app/ai-consultant-dayton/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Brain, Target, Users, BarChart, Lightbulb, Zap, CheckCircle, ArrowRight, Phone, Mail, MapPin, Star, Award, TrendingUp, Clock, DollarSign } from 'lucide-react';
import ServiceForm from '@/components/forms/ServiceForm';

export const metadata: Metadata = {
  title: 'AI Consultant Dayton | AI Strategy Consulting | AutoTech Venture',
  description: 'Expert AI consultant in Dayton, Ohio. Strategic AI implementation, digital transformation planning, and technology consulting by PhD computer scientists.',
  keywords: [
    'AI consultant Dayton',
    'AI strategy consulting Dayton',
    'automation consulting Ohio',
    'digital transformation consulting',
    'AI implementation planning'
  ],
  openGraph: {
    title: 'AI Consultant Dayton | AI Strategy Consulting | AutoTech Venture',
    description: 'Expert AI consulting services in Dayton, Ohio by PhD computer scientists.',
    url: 'https://www.atechv.com/ai-consultant-dayton',
  },
  alternates: {
    canonical: 'https://www.atechv.com/ai-consultant-dayton',
  },
};

const consultingServices = [
  {
    title: "AI Readiness Assessment",
    description: "Comprehensive evaluation of your organization's readiness for AI implementation",
    icon: BarChart,
    features: [
      "Current State Analysis",
      "Data Infrastructure Review",
      "Team Capability Assessment",
      "Technology Gap Analysis"
    ],
    price: "Starting at $2,500"
  },
  {
    title: "AI Strategy Development",
    description: "Custom AI roadmap aligned with your business objectives and growth plans",
    icon: Target,
    features: [
      "Business Case Development",
      "ROI Projections & Modeling",
      "Implementation Timeline",
      "Risk Assessment & Mitigation"
    ],
    price: "Starting at $5,000"
  },
  {
    title: "Digital Transformation Planning",
    description: "End-to-end transformation strategy integrating AI across your operations",
    icon: Lightbulb,
    features: [
      "Process Optimization Strategy",
      "Technology Integration Plan",
      "Change Management Framework",
      "Success Metrics Definition"
    ],
    price: "Starting at $7,500"
  },
  {
    title: "AI Implementation Support",
    description: "Ongoing consultation and support throughout your AI implementation journey",
    icon: Users,
    features: [
      "Project Management Guidance",
      "Vendor Selection Assistance",
      "Team Training & Development",
      "Performance Monitoring Setup"
    ],
    price: "Starting at $3,500/month"
  }
];

const benefits = [
  {
    title: "304% Average ROI",
    description: "Our AI strategies deliver an average return on investment of 304% within 12 months",
    icon: DollarSign
  },
  {
    title: "Reduced Implementation Risk",
    description: "Strategic planning reduces AI project failure risk by 80%",
    icon: Target
  },
  {
    title: "PhD-Level Expertise", 
    description: "Led by Dr. Hossein Mohammadi with 8+ years in AI research and implementation",
    icon: Award
  },
  {
    title: "Faster Time to Value",
    description: "Strategic approach accelerates AI value realization by 6-12 months",
    icon: Clock
  }
];

const testimonials = [
  {
    name: "Robert Johnson",
    company: "Dayton Manufacturing Corp",
    text: "Dr. Mohammadi's AI strategy transformed our operations. We implemented smart quality control that reduced defects by 90% and saved $200K annually.",
    rating: 5
  },
  {
    name: "Lisa Chen",
    company: "Ohio Healthcare Solutions",
    text: "The AI readiness assessment identified exactly what we needed. The implementation plan was clear, actionable, and delivered results ahead of schedule.",
    rating: 5
  },
  {
    name: "Mark Rodriguez",
    company: "Midwest Logistics Partners",
    text: "Working with AutoTech Venture's AI consultants gave us a competitive edge. Our predictive maintenance system now prevents 95% of equipment failures.",
    rating: 5
  }
];

const process = [
  {
    step: "1",
    title: "Discovery & Assessment",
    description: "Deep dive into your business challenges, goals, and current technology landscape"
  },
  {
    step: "2", 
    title: "Strategy Development",
    description: "Create comprehensive AI strategy with clear roadmap, timelines, and success metrics"
  },
  {
    step: "3",
    title: "Implementation Planning", 
    description: "Detailed project plans with resource requirements, vendor recommendations, and risk mitigation"
  },
  {
    step: "4",
    title: "Ongoing Advisory",
    description: "Continuous guidance and support throughout implementation and beyond"
  }
];

const aiCapabilities = [
  "Machine Learning Strategy",
  "Process Automation Planning", 
  "Data Analytics Implementation",
  "AI Tool Selection & Evaluation",
  "Team Training & Development",
  "Performance Measurement",
  "Vendor Management",
  "Risk Assessment & Mitigation"
];

const industries = [
  { name: "Manufacturing", description: "Quality control, predictive maintenance, supply chain optimization" },
  { name: "Healthcare", description: "Patient data analysis, diagnostic assistance, workflow automation" },
  { name: "Retail", description: "Inventory optimization, customer analytics, demand forecasting" },
  { name: "Professional Services", description: "Client management, document automation, billing optimization" },
  { name: "Logistics", description: "Route optimization, demand prediction, warehouse automation" },
  { name: "Finance", description: "Risk assessment, fraud detection, automated reporting" }
];

export default function AIConsultantPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  AI Consultant in Dayton
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Strategic AI Consulting for
                <span className="text-indigo-600 block">Ohio Businesses</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Expert AI consulting from PhD computer scientists. We help Dayton businesses 
                develop winning AI strategies, plan implementations, and navigate digital transformation 
                with confidence and measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Schedule Strategy Session
                </button>
                <button className="border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                  Download AI Readiness Guide
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  PhD Computer Scientists
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  8+ Years Experience
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Proven ROI
                </div>
              </div>
            </div>


            <ServiceForm 
            service="AI Consulting"
            source="ai-consultant-dayton" 
            theme="blue" // or emerald, purple, orange, cyan
            title="Get Your Free Consultation"
            description="Tell us about your project and we'll provide a customized solution with transparent pricing. No obligation, just expert advice from our PhD team."
            compact={true} // true for smaller forms
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our AI Consulting Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine deep technical expertise with business acumen to deliver AI strategies that actually work.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-indigo-100 text-indigo-600 mb-4">
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
              Our AI Consulting Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI consulting designed to guide your digital transformation journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {consultingServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white mr-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-indigo-600 font-semibold">{service.price}</p>
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
                  <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              );
            })}
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
              AI expertise across multiple industries with proven results and domain knowledge.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{industry.name}</h3>
                <p className="text-gray-600">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our AI Consulting Capabilities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive expertise to guide every aspect of your AI transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-indigo-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-gray-900">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our AI Consulting Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that ensures successful AI strategy development and implementation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-2xl font-bold mb-4">
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

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Meet Your AI Strategy Team
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dr. Hossein Mohammadi - CEO & Lead AI Strategist</h3>
                    <p className="text-gray-600">PhD in Computer Science with 8+ years in distributed systems and AI research. Led AI transformations for 50+ businesses.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Dr. Maziyar Pouyan - CTO & Technical Lead</h3>
                    <p className="text-gray-600">PhD in Computer Science specializing in machine learning and AI systems. Expert in AI implementation and technical architecture.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Local Dayton Presence</h3>
                    <p className="text-gray-600">Based right here in Dayton, Ohio. We understand local business challenges and provide hands-on, personalized service.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl text-white">
              <h3 className="text-2xl font-bold mb-6">Ready to Develop Your AI Strategy?</h3>
              <p className="text-indigo-100 mb-8">
                Schedule a free strategy session with our PhD-level AI consultants. We'll assess your 
                current state and provide actionable recommendations for your AI transformation.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-white text-indigo-600 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Call (321) 236-1956
                </button>
                <button className="w-full border border-white text-white py-3 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Us Today
                </button>
              </div>
              <div className="mt-6 pt-6 border-t border-indigo-500 text-center">
                <div className="flex items-center justify-center text-indigo-100">
                  <MapPin className="w-4 h-4 mr-2" />
                  95 Bramblebush Trail, Dayton, OH 45440
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What Our Consulting Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real transformation stories from Ohio businesses
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
                  <div className="text-indigo-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Transform Your Business with AI Strategy
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
            Join forward-thinking Ohio businesses that are leveraging AI for competitive advantage. 
            Get started with a free strategy consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call (321) 236-1956
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us Today
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-indigo-100">
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