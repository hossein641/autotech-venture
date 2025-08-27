// app/data-analytics-dayton/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { BarChart, LineChart, PieChart, TrendingUp, Database, Target, Users, CheckCircle, ArrowRight, Phone, Mail, MapPin, Star, Award, Clock, Eye, Brain, Zap } from 'lucide-react';
import ServiceForm from '@/components/forms/ServiceForm';

export const metadata: Metadata = {
  title: 'Data Analytics Dayton Ohio | Business Intelligence Services | AutoTech Venture',
  description: 'Professional data analytics and business intelligence services in Dayton, Ohio. Custom dashboards, predictive analytics, and data-driven insights for Ohio businesses.',
  keywords: [
    'data analytics consulting Dayton',
    'predictive analytics Dayton',
    'business intelligence Ohio',
    'data analysis services',
    'data visualization Dayton',
    'business analytics Ohio'
  ],
  openGraph: {
    title: 'Data Analytics Dayton Ohio | Business Intelligence Services | AutoTech Venture',
    description: 'Professional data analytics and business intelligence services in Dayton, Ohio.',
    url: 'https://www.atechv.com/data-analytics-dayton',
  },
  alternates: {
    canonical: 'https://www.atechv.com/data-analytics-dayton',
  },
};

const analyticsServices = [
  {
    title: "Business Intelligence Dashboards",
    description: "Real-time dashboards that transform raw data into actionable business insights",
    icon: BarChart,
    features: [
      "Custom Dashboard Development",
      "Real-time Data Visualization",
      "KPI Tracking & Monitoring",
      "Interactive Reports"
    ],
    price: "Starting at $3,500"
  },
  {
    title: "Predictive Analytics",
    description: "Forecast trends, predict outcomes, and make data-driven decisions with confidence",
    icon: TrendingUp,
    features: [
      "Sales Forecasting Models",
      "Customer Behavior Prediction",
      "Demand Planning Analytics",
      "Risk Assessment Models"
    ],
    price: "Starting at $5,000"
  },
  {
    title: "Data Integration & ETL",
    description: "Consolidate data from multiple sources into unified, clean datasets",
    icon: Database,
    features: [
      "Multi-source Data Integration",
      "Data Cleaning & Transformation",
      "Automated Data Pipelines",
      "Data Quality Monitoring"
    ],
    price: "Starting at $4,000"
  },
  {
    title: "Advanced Analytics Consulting",
    description: "Strategic guidance on analytics implementation and data strategy",
    icon: Brain,
    features: [
      "Data Strategy Development",
      "Analytics Roadmap Planning",
      "Tool Selection & Implementation",
      "Team Training & Support"
    ],
    price: "Starting at $2,500"
  }
];

const benefits = [
  {
    title: "30% Better Decisions",
    description: "Companies using data analytics make 30% better decisions than competitors",
    icon: Target
  },
  {
    title: "5x Faster Insights",
    description: "Automated analytics deliver insights 5x faster than manual analysis",
    icon: Clock
  },
  {
    title: "25% Revenue Growth", 
    description: "Data-driven businesses see 25% higher revenue growth on average",
    icon: TrendingUp
  },
  {
    title: "Real-time Visibility",
    description: "Monitor your business performance in real-time with live dashboards",
    icon: Eye
  }
];

const testimonials = [
  {
    name: "Michael Chen",
    company: "Dayton Retail Solutions",
    text: "The predictive analytics dashboard helped us optimize inventory and reduce waste by 40%. We can now predict demand patterns with 95% accuracy.",
    rating: 5
  },
  {
    name: "Sarah Wilson",
    company: "Ohio Manufacturing Corp",
    text: "AutoTech Venture's business intelligence solution gave us visibility into our operations like never before. We identified $200K in cost savings opportunities.",
    rating: 5
  },
  {
    name: "David Rodriguez",
    company: "Midwest Healthcare Partners",
    text: "The patient analytics dashboard revolutionized our operations. We can now predict patient flow and optimize staffing, improving both care and efficiency.",
    rating: 5
  }
];

const process = [
  {
    step: "1",
    title: "Data Assessment",
    description: "Analyze your current data sources, quality, and analytics needs"
  },
  {
    step: "2", 
    title: "Strategy & Design",
    description: "Develop analytics strategy and design custom dashboards and reports"
  },
  {
    step: "3",
    title: "Implementation & Integration", 
    description: "Build analytics solutions and integrate with your existing systems"
  },
  {
    step: "4",
    title: "Training & Optimization",
    description: "Train your team and continuously optimize analytics performance"
  }
];

const analyticsTypes = [
  { name: "Sales Analytics", description: "Track performance, forecast revenue, identify opportunities" },
  { name: "Customer Analytics", description: "Understand behavior, segment audiences, predict churn" },
  { name: "Operational Analytics", description: "Monitor processes, identify bottlenecks, optimize efficiency" },
  { name: "Financial Analytics", description: "Track profitability, analyze costs, budget forecasting" },
  { name: "Marketing Analytics", description: "Campaign performance, ROI tracking, attribution analysis" },
  { name: "Supply Chain Analytics", description: "Inventory optimization, demand planning, supplier analysis" },
  { name: "HR Analytics", description: "Employee performance, retention prediction, workforce planning" },
  { name: "Quality Analytics", description: "Defect analysis, process improvement, compliance monitoring" }
];

const dataSourcesSupported = [
  "CRM Systems (Salesforce, HubSpot)",
  "ERP Systems (SAP, Oracle, NetSuite)",
  "Marketing Platforms (Google Analytics, Facebook)",
  "E-commerce (Shopify, WooCommerce, Magento)",
  "Databases (SQL Server, MySQL, PostgreSQL)",
  "Cloud Storage (AWS, Google Cloud, Azure)",
  "Excel/CSV Files & Spreadsheets",
  "Financial Software (QuickBooks, Xero)"
];

const beforeAfter = [
  { 
    metric: "Report Generation Time",
    before: "8 hours monthly manual reports",
    after: "Real-time automated dashboards",
    improvement: "99% time reduction"
  },
  { 
    metric: "Data Accuracy",
    before: "85% accuracy with manual entry",
    after: "99.9% accuracy with automation",
    improvement: "15% accuracy improvement"
  },
  { 
    metric: "Decision Speed",
    before: "Weekly decisions based on old data",
    after: "Daily decisions with real-time insights",
    improvement: "5x faster decision making"
  },
  { 
    metric: "Revenue Insights",
    before: "Quarterly revenue analysis",
    after: "Daily revenue tracking & forecasting",
    improvement: "90% better visibility"
  }
];

export default function DataAnalyticsPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <BarChart className="w-4 h-4" />
                  Data Analytics in Dayton
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Turn Your Data Into
                <span className="text-blue-600 block">Competitive Advantage</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional data analytics and business intelligence services for Dayton businesses. 
                We help Ohio companies unlock insights, predict trends, and make data-driven decisions 
                that drive growth and profitability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Free Data Assessment
                </button>
                <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors">
                  View Analytics Examples
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Real-time Dashboards
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Predictive Analytics
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Expert Data Scientists
                </div>
              </div>
            </div>
            <ServiceForm 
            service="Your Service Name"
            source="Your Page Name" 
            theme="blue" // or emerald, purple, orange, cyan
            title="Get Your Free Data Strategy Consultation"
            description="✓ Free consultation ✓ Data assessment ✓ Custom analytics roadmap"
            compact={true} // true for smaller forms
            />

          </div>
        </div>
      </section>

      {/* Before/After Results */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Real Analytics Transformations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how data analytics transforms business operations for Ohio companies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {beforeAfter.map((example, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{example.metric}</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium mr-4">Before</span>
                    <span className="text-gray-600">{example.before}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium mr-4">After</span>
                    <span className="text-gray-600">{example.after}</span>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <span className="text-blue-800 font-semibold">Result: {example.improvement}</span>
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
              Why Dayton Businesses Choose Data Analytics
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Data-driven insights that improve decision-making and business performance.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Data Analytics Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive analytics solutions designed to unlock insights from your business data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {analyticsServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white mr-4">
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

      {/* Analytics Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Types of Analytics We Provide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive analytics across all business functions to drive informed decision-making.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsTypes.map((type, index) => (
              <div key={index} className="p-6 bg-white rounded-xl hover:bg-blue-50 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{type.name}</h3>
                <p className="text-gray-600 text-sm">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Sources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Data Sources We Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We integrate with all major business systems and data sources to provide unified analytics.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataSourcesSupported.map((source, index) => (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-gray-900">{source}</span>
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
              Our Analytics Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A proven methodology that delivers actionable insights with minimal disruption to your operations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-2xl font-bold mb-4">
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
              What Our Analytics Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real insights driving real business results across Ohio
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
                  <div className="text-blue-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Unlock Your Data's Potential?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Join successful Dayton businesses that are making better decisions with data analytics. 
            Get started with a free data strategy consultation today.
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