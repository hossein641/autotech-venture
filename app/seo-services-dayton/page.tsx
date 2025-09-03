// app/seo-services-dayton/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, TrendingUp, Target, BarChart, Globe, Zap, Users, CheckCircle, ArrowRight, Phone, Mail, MapPin, Star, Award, Clock, Eye } from 'lucide-react';
import ServiceForm from '@/components/forms/ServiceForm';

export const metadata: Metadata = {
  title: 'SEO Services Dayton Ohio | Local Search Optimization | AutoTech Venture',
  description: 'Professional SEO services and digital marketing for Dayton, Ohio businesses. Local SEO, technical audits, and content marketing that drives results. Free SEO audit available.',
  keywords: [
    'SEO services Dayton Ohio',
    'SEO management Dayton',
    'local SEO Dayton OH',
    'digital marketing Dayton Ohio',
    'search engine optimization Dayton',
    'Google Business Profile optimization Dayton'
  ],
  openGraph: {
    title: 'SEO Services Dayton Ohio | Local Search Optimization | AutoTech Venture',
    description: 'Professional SEO services and digital marketing for Dayton, Ohio businesses.',
    url: 'https://www.atechv.com/seo-services-dayton',
  },
  alternates: {
    canonical: 'https://www.atechv.com/seo-services-dayton',
  },
};

const seoServices = [
  {
    title: "Local SEO Optimization",
    description: "Dominate local search results and Google Maps for customers in Dayton and surrounding areas",
    icon: MapPin,
    features: [
      "Google Business Profile Optimization",
      "Local Citation Building",
      "Review Management Strategy",
      "Local Keyword Targeting"
    ],
    price: "Starting at $1,500/month"
  },
  {
    title: "Technical SEO Audits",
    description: "Comprehensive technical analysis and optimization to improve search engine performance",
    icon: BarChart,
    features: [
      "Site Speed Optimization",
      "Mobile-First Indexing Setup",
      "Schema Markup Implementation",
      "Core Web Vitals Improvement"
    ],
    price: "Starting at $2,000"
  },
  {
    title: "Content Marketing",
    description: "Strategic content creation and optimization that attracts and converts your target audience",
    icon: Target,
    features: [
      "Keyword Research & Strategy",
      "Blog Content Creation",
      "On-Page SEO Optimization",
      "Content Performance Tracking"
    ],
    price: "Starting at $1,200/month"
  },
  {
    title: "SEO Management",
    description: "Ongoing SEO management and optimization to maintain and improve your search rankings",
    icon: TrendingUp,
    features: [
      "Monthly SEO Reporting",
      "Competitor Analysis",
      "Link Building Campaigns",
      "Performance Monitoring"
    ],
    price: "Starting at $1,800/month"
  }
];

const benefits = [
  {
    title: "Higher Search Rankings",
    description: "Get found on the first page of Google for keywords that matter to your business",
    icon: TrendingUp
  },
  {
    title: "More Website Traffic",
    description: "Increase organic traffic by an average of 200% within 6 months",
    icon: Eye
  },
  {
    title: "Better Lead Quality", 
    description: "Attract customers who are actively searching for your services",
    icon: Target
  },
  {
    title: "Local Market Dominance",
    description: "Dominate local search results in Dayton and surrounding Ohio areas",
    icon: MapPin
  }
];

const testimonials = [
  {
    name: "David Miller",
    company: "Miller HVAC Services",
    text: "Our Google rankings improved dramatically after working with AutoTech Venture. We're now #1 for 'HVAC repair Dayton' and our leads have doubled.",
    rating: 5
  },
  {
    name: "Sarah Chen",
    company: "Dayton Legal Partners",
    text: "The SEO team helped us rank for competitive legal keywords. Our website traffic increased 300% and we're getting high-quality leads consistently.",
    rating: 5
  },
  {
    name: "Mike Rodriguez",
    company: "Ohio Home Improvement",
    text: "Local SEO was a game-changer for our business. We now appear in the top 3 for all our service areas around Dayton.",
    rating: 5
  }
];

const process = [
  {
    step: "1",
    title: "SEO Audit & Analysis",
    description: "Comprehensive analysis of your current SEO performance and competitor research"
  },
  {
    step: "2", 
    title: "Strategy Development",
    description: "Custom SEO strategy tailored to your business goals and target market"
  },
  {
    step: "3",
    title: "Implementation & Optimization", 
    description: "Execute technical improvements, content optimization, and local SEO tactics"
  },
  {
    step: "4",
    title: "Monitoring & Reporting",
    description: "Continuous monitoring, monthly reporting, and strategy refinement for best results"
  }
];

const seoFeatures = [
  "Keyword Research & Analysis",
  "On-Page SEO Optimization", 
  "Technical SEO Improvements",
  "Local Business Optimization",
  "Content Strategy & Creation",
  "Link Building Campaigns",
  "Google Analytics Setup",
  "Monthly Performance Reports"
];

const results = [
  { metric: "Average Ranking Improvement", value: "+15 positions", icon: TrendingUp },
  { metric: "Traffic Increase", value: "+200%", icon: Eye },
  { metric: "Lead Quality Improvement", value: "+150%", icon: Target },
  { metric: "Local Visibility Boost", value: "+300%", icon: MapPin }
];

export default function SEOServicesPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  SEO Services in Dayton
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Dominate Google Search for
                <span className="text-purple-600 block">Dayton Businesses</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Professional SEO services that get your Ohio business found online. We help Dayton 
                companies rank higher, attract more customers, and grow their revenue through search.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" />
                  Get Free SEO Audit
                </button>
                <button className="border border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                  View SEO Case Studies
                </button>
              </div>
              <div className="flex items-center space-x-8 text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Local SEO Experts
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Proven Results
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                  Transparent Reporting
                </div>
              </div>
            </div>
            <ServiceForm 
            service="SEO Services"
            source="seo-services-dayton" 
            theme="purple" // or emerald, purple, orange, cyan
            title="Get Your Free SEO Audit"
            description="Tell us about your project and we'll provide a customized solution with transparent pricing. No obligation, just expert advice from our PhD team."
            compact={true} // true for smaller forms
            />

          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Proven SEO Results for Dayton Businesses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real metrics from real clients who dominate their local search results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, index) => {
              const IconComponent = result.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-purple-100 text-purple-600 mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{result.value}</div>
                  <div className="text-gray-600 font-medium">{result.metric}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our SEO Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver measurable SEO results that grow your business and increase revenue.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-purple-100 text-purple-600 mb-4">
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
              Our SEO & Digital Marketing Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive SEO solutions designed to help your Dayton business dominate search results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {seoServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white mr-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                      <p className="text-purple-600 font-semibold">{service.price}</p>
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
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                    Learn More
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Every SEO Package Includes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive SEO features that ensure your success in search rankings.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seoFeatures.map((feature, index) => (
              <div key={index} className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                <span className="font-medium text-gray-900">{feature}</span>
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
              Our Proven SEO Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A systematic approach that delivers consistent rankings and traffic growth.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 text-white text-2xl font-bold mb-4">
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
              Real success stories from businesses dominating their local search results
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
                  <div className="text-purple-600">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Dominate Google Search?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
            Join successful Dayton businesses that rank #1 for their target keywords. 
            Get started with a free SEO audit today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call (937) 963-9424
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-colors font-semibold flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Email Us Today
            </button>
          </div>
          <div className="mt-8 flex items-center justify-center space-x-8 text-purple-100">
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