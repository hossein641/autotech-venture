// app/process-automation-dayton/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Zap, Workflow, FileText, Database, Clock, Target, Users, CheckCircle, ArrowRight, Phone, Mail, MapPin, Star, Award, TrendingUp, DollarSign, BarChart } from 'lucide-react';
import ServiceForm from '@/components/forms/ServiceForm';

export const metadata: Metadata = {
  title: 'Process Automation Dayton OH | Workflow Automation Ohio | AutoTech Venture',
  description: 'Professional process automation and workflow optimization services in Dayton, Ohio. RPA, document automation, and business process improvement by automation experts.',
  keywords: [
    'process automation Dayton OH',
    'workflow automation Ohio',
    'RPA services Dayton',
    'business process automation',
    'document automation Dayton',
    'workflow optimization Ohio'
  ],
  openGraph: {
    title: 'Process Automation Dayton OH | Workflow Automation Ohio | AutoTech Venture',
    description: 'Professional process automation and workflow optimization services in Dayton, Ohio.',
    url: 'https://www.atechv.com/process-automation-dayton',
  },
  alternates: {
    canonical: 'https://www.atechv.com/process-automation-dayton',
  },
};

const automationServices = [
  {
    title: "Robotic Process Automation (RPA)",
    description: "Automate repetitive, rule-based tasks to free up your team for high-value work",
    icon: Workflow,
    features: [
      "Data Entry Automation",
      "Report Generation",
      "Email Processing",
      "System Integration"
    ],
    price: "Starting at $4,000"
  },
  {
    title: "Document Automation",
    description: "Streamline document processing, approval workflows, and information extraction",
    icon: FileText,
    features: [
      "Document Processing Workflows",
      "Digital Approval Systems",
      "Information Extraction",
      "Compliance Tracking"
    ],
    price: "Starting at $3,500"
  },
  {
    title: "Workflow Optimization",
    description: "Analyze and optimize existing business processes for maximum efficiency",
    icon: Target,
    features: [
      "Process Analysis & Mapping",
      "Bottleneck Identification",
      "Workflow Redesign",
      "Performance Monitoring"
    ],
    price: "Starting at $2,500"
  },
  {
    title: "Data Integration Automation",
    description: "Automate data flow between systems and create unified information dashboards",
    icon: Database,
    features: [
      "System Integration",
      "Data Synchronization",
      "Automated Reporting",
      "Real-time Dashboards"
    ],
    price: "Starting at $5,000"
  }
];

const benefits = [
  {
    title: "80% Time Savings",
    description: "Reduce time spent on manual tasks by an average of 80%",
    icon: Clock
  },
  {
    title: "99.9% Accuracy",
    description: "Eliminate human errors with automated processes that work perfectly every time",
    icon: Target
  },
  {
    title: "ROI in 6 Months", 
    description: "Most automation projects pay for themselves within 6 months",
    icon: DollarSign
  },
  {
    title: "24/7 Operation",
    description: "Automated processes work around the clock without breaks or downtime",
    icon: Zap
  }
];

const testimonials = [
  {
    name: "Jennifer Martinez",
    company: "Ohio Financial Services",
    text: "AutoTech Venture automated our loan processing workflow. What used to take 3 days now happens in 30 minutes. Our customers love the faster service.",
    rating: 5
  },
  {
    name: "Steve Thompson",
    company: "Dayton Manufacturing Inc",
    text: "The RPA solution eliminated 90% of our manual data entry. Our team can now focus on analysis and strategy instead of paperwork.",
    rating: 5
  },
  {
    name: "Lisa Chen",
    company: "Midwest Healthcare Partners",
    text: "Document automation transformed our patient intake process. We reduced processing time by 75% and improved accuracy to nearly 100%.",
    rating: 5
  }
];

const process = [
  {
    step: "1",
    title: "Process Assessment",
    description: "Analyze your current workflows to identify automation opportunities and calculate ROI"
  },
  {
    step: "2", 
    title: "Solution Design",
    description: "Design custom automation solutions tailored to your specific business processes"
  },
  {
    step: "3",
    title: "Development & Testing", 
    description: "Build and thoroughly test automation solutions in a controlled environment"
  },
  {
    step: "4",
    title: "Deployment & Training",
    description: "Deploy solutions and train your team on new automated processes"
  }
];

const automationTypes = [
  { name: "Data Entry Automation", description: "Eliminate manual data entry across systems" },
  { name: "Invoice Processing", description: "Automated invoice capture, approval, and payment" },
  { name: "Customer Onboarding", description: "Streamlined client intake and setup processes" },
  { name: "Report Generation", description: "Automated creation and distribution of reports" },
  { name: "Email Management", description: "Intelligent email sorting and response automation" },
  { name: "Inventory Management", description: "Automated stock monitoring and reordering" },
  { name: "HR Processes", description: "Employee onboarding and record management" },
  { name: "Quality Control", description: "Automated quality checks and compliance monitoring" }
];

const industries = [
  "Manufacturing & Production",
  "Healthcare & Medical",
  "Financial Services",
  "Professional Services",
  "Retail & E-commerce",
  "Logistics & Transportation"
];

const beforeAfter = [
  { 
    process: "Invoice Processing",
    before: "3 hours manual entry + review",
    after: "15 minutes automated processing",
    savings: "92% time reduction"
  },
  { 
    process: "Customer Onboarding",
    before: "2 days manual setup",
    after: "2 hours automated workflow",
    savings: "90% faster completion"
  },
  { 
    process: "Report Generation",
    before: "4 hours monthly reports",
    after: "Automated daily reports",
    savings: "95% time savings + daily insights"
  },
  { 
    process: "Data Entry",
    before: "20 hours weekly data entry",
    after: "Real-time automated updates",
    savings: "100% elimination + better accuracy"
  }
];

export default function ProcessAutomationPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Process Automation in Dayton
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Automate Your Business Processes &
                <span className="text-orange-600 block">Boost Efficiency</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional process automation services for Dayton businesses. We help Ohio 
                companies eliminate manual work, reduce errors, and free up teams to focus on 
                high-value activities that grow your business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Free Process Assessment
                </button>
                <button className="border border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors">
                  View Automation Examples
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  80% Time Savings
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  99.9% Accuracy
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  6-Month ROI
                </div>
              </div>
            </div>
            <ServiceForm 
            service="Process Automation"
            source="process-automation-dayton" 
            theme="orange" // or emerald, purple, orange, cyan
            title="Get Your Free Consultation"
            description="Tell us about your project and we'll provide a customized solution with transparent pricing. No obligation, just expert advice from our PhD team."
            compact={true} // true for smaller forms
            />

          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Real Automation Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how process automation transforms day-to-day operations for Ohio businesses.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfter.map((example, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{example.process}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mr-4">Before</span>
                    <span className="text-gray-600">{example.before}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mr-4">After</span>
                    <span className="text-gray-600">{example.after}</span>
                  </div>
                  <div className="bg-orange-100 p-4 rounded-lg">
                    <span className="text-orange-800 font-semibold">Result: {example.savings}</span>
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
              Why Dayton Businesses Choose Process Automation
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Measurable benefits that improve your bottom line and employee satisfaction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-orange-100 text-orange-600 mb-4">
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
              Our Process Automation Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive automation solutions designed to streamline your Ohio business operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {automationServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-600 text-white mr-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-orange-600 font-semibold">{service.price}</p>
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
                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Automation Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Common Processes We Automate
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple data entry to complex workflows, we automate the processes that consume your team's time.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {automationTypes.map((type, index) => (
              <div key={index} className="p-6 bg-white rounded-xl hover:bg-orange-50 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{type.name}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
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
              Our Automation Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers automation solutions with minimal disruption to your operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white text-2xl font-bold mb-4">
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

      {/* ROI Calculator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Calculate Your Automation ROI
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Most businesses see a return on their automation investment within 6 months. 
                Use our simple calculator to estimate your potential savings.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Time Savings: 80% Average</h3>
                    <p className="text-gray-600">Reduce time spent on manual tasks by 80% or more with intelligent automation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <DollarSign className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cost Reduction: $50-200/hour saved</h3>
                    <p className="text-gray-600">Typical hourly savings range from $50-200 depending on the process complexity.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <BarChart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Accuracy Improvement: 99.9%</h3>
                    <p className="text-gray-600">Eliminate human errors and achieve near-perfect accuracy in automated processes.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick ROI Estimate</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hours spent weekly on manual processes</label>
                  <input type="number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., 20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Average hourly cost (salary + benefits)</label>
                  <input type="number" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., 50" />
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">Potential Annual Savings</div>
                    <div className="text-3xl font-bold text-gray-900">$41,600</div>
                    <p className="text-sm text-gray-600 mt-2">Based on 80% time savings</p>
                  </div>
                </div>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold">
                  Get Detailed ROI Analysis
                </button>
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
              What Our Automation Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real efficiency gains from real businesses across Ohio
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
                  <div className="text-orange-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Automate Your Business Processes?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Join dozens of successful Dayton businesses that have eliminated manual work and improved efficiency. 
            Get started with a free process assessment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call (937) 963-9424
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us Today
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-orange-100">
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