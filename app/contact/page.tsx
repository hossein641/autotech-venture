// app/contact/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, Users, Award, Zap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact AutoTech Venture | AI & Automation Experts Dayton Ohio',
  description: 'Contact AutoTech Venture for AI, automation, and web solutions in Dayton, Ohio. Call (321) 236-1956 or visit us at 95 Bramblebush Trail. Free consultations available.',
  keywords: [
    'contact AutoTech Venture',
    'AI consultants Dayton Ohio',
    'automation company contact',
    'web design consultation Dayton',
    'technology consulting Ohio'
  ],
  openGraph: {
    title: 'Contact AutoTech Venture | AI & Automation Experts Dayton Ohio',
    description: 'Contact AutoTech Venture for AI, automation, and web solutions in Dayton, Ohio. Free consultations available.',
    url: 'https://www.atechv.com/contact',
    siteName: 'AutoTech Venture',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact AutoTech Venture | AI & Automation Experts Dayton Ohio',
    description: 'Contact AutoTech Venture for AI, automation, and web solutions in Dayton, Ohio. Free consultations available.',
  },
};

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    detail: "(321) 236-1956",
    description: "Speak directly with our PhD experts",
    action: "tel:+13212361956",
    actionText: "Call Now"
  },
  {
    icon: Mail,
    title: "Email Us", 
    detail: "info@AtechV.com",
    description: "Get detailed responses within 24 hours",
    action: "mailto:info@atechv.com",
    actionText: "Send Email"
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    detail: "95 Bramblebush Trail",
    description: "Dayton, OH 45440",
    action: "https://maps.google.com/maps?q=95+Bramblebush+Trail,+Dayton,+OH+45440",
    actionText: "Get Directions"
  },
  {
    icon: Clock,
    title: "Business Hours",
    detail: "Mon-Fri 9:00 AM - 6:00 PM",
    description: "Eastern Standard Time",
    action: "/contact",
    actionText: "Schedule Meeting"
  }
];

const services = [
  {
    title: "AI Solutions",
    description: "Custom AI development and implementation",
    icon: Award
  },
  {
    title: "Process Automation", 
    description: "Streamline operations and reduce costs",
    icon: Zap
  },
  {
    title: "Web Design & Development",
    description: "Professional websites that convert",
    icon: Users
  },
  {
    title: "SEO & Digital Marketing",
    description: "Dominate local search results",
    icon: CheckCircle
  }
];

const faqs = [
  {
    question: "Do you offer free consultations?",
    answer: "Yes! We provide free initial consultations to understand your needs and determine how our solutions can benefit your business."
  },
  {
    question: "What's your response time?",
    answer: "We typically respond to inquiries within 2-4 hours during business hours, and within 24 hours on weekends."
  },
  {
    question: "Do you work with small businesses?",
    answer: "Absolutely! We specialize in making advanced technology accessible to small and medium-sized businesses throughout Ohio."
  },
  {
    question: "Can you work remotely?",
    answer: "Yes, we serve clients throughout Ohio and beyond. We can work remotely or on-site based on your preferences and project needs."
  }
];

export default function ContactPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Transform Your
              <span className="text-emerald-600 block">Business Together</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ready to harness the power of AI, automation, and cutting-edge web solutions? 
              Our PhD experts are here to help. Get your free consultation today.
            </p>
          </div>

          {/* Contact Methods Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="inline-flex p-4 rounded-full bg-emerald-100 text-emerald-600 mb-4">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-emerald-600 font-semibold mb-1">{method.detail}</p>
                  <p className="text-sm text-gray-600 mb-4">{method.description}</p>
                  <a
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm"
                  >
                    {method.actionText} →
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Get Your Free Consultation
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Tell us about your project and we'll provide a customized solution with transparent pricing. 
                No obligation, just expert advice from our PhD team.
              </p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="John" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="Smith" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                    placeholder="Your Company" 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="john@company.com" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                      placeholder="(xxx) xxx-xxxx" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Services Interested In</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Select a service</option>
                    <option value="ai-solutions">AI Solutions & Automation</option>
                    <option value="web-design">Web Design & Development</option>
                    <option value="seo">SEO & Digital Marketing</option>
                    <option value="consulting">AI Consulting</option>
                    <option value="process-automation">Process Automation</option>
                    <option value="data-analytics">Data Analytics</option>
                    <option value="multiple">Multiple Services</option>
                    <option value="not-sure">Not Sure - Need Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget Range</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Select budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k-plus">$50,000+</option>
                    <option value="discuss">Prefer to discuss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Timeline</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-month">Within 1 month</option>
                    <option value="3-months">1-3 months</option>
                    <option value="6-months">3-6 months</option>
                    <option value="planning">Just planning ahead</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                  <textarea 
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" 
                    placeholder="Tell us about your project, current challenges, and what you hope to achieve. The more details you provide, the better we can help you."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-emerald-600 text-white py-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message & Get Free Consultation
                </button>

                <p className="text-sm text-gray-500 text-center">
                  ✓ No obligation consultation ✓ Response within 24 hours ✓ PhD expert evaluation
                </p>
              </form>
            </div>

            {/* Information Panel */}
            <div className="space-y-8">
              {/* Services Overview */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Services</h3>
                <div className="space-y-6">
                  {services.map((service, index) => {
                    const IconComponent = service.icon;
                    return (
                      <div key={index} className="flex items-start">
                        <div className="inline-flex p-2 rounded-lg bg-emerald-100 text-emerald-600 mr-4 mt-1">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                          <p className="text-gray-600 text-sm">{service.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-emerald-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose AutoTech Venture?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">PhD-Level Expertise</h4>
                      <p className="text-gray-600 text-sm">Direct access to computer science PhDs with 15+ years experience</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Local Dayton Presence</h4>
                      <p className="text-gray-600 text-sm">Based in Ohio, understanding local business challenges</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">100% Success Rate</h4>
                      <p className="text-gray-600 text-sm">50+ successful projects with complete client satisfaction</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">End-to-End Solutions</h4>
                      <p className="text-gray-600 text-sm">Strategy, implementation, and ongoing support included</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white border border-gray-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm pb-4 border-b border-gray-100 last:border-b-0">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Office Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Visit Our Dayton Office
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Located in the heart of Dayton, Ohio, we're easily accessible and always ready 
                to welcome clients for in-person consultations and project discussions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-emerald-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                    <p className="text-gray-600">95 Bramblebush Trail</p>
                    <p className="text-gray-600">Dayton, OH 45440</p>
                    <a 
                      href="https://maps.google.com/maps?q=95+Bramblebush+Trail,+Dayton,+OH+45440" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-emerald-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <div className="text-gray-600">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday - Sunday: By appointment only</p>
                      <p className="text-sm mt-1">Eastern Standard Time</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 text-emerald-600 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone & Email</h3>
                    <p className="text-gray-600">Phone: (321) 236-1956</p>
                    <p className="text-gray-600">Email: info@AtechV.com</p>
                    <p className="text-sm text-gray-500 mt-1">Response within 2-4 hours during business hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map</h3>
                <p className="text-gray-500 mb-4">95 Bramblebush Trail, Dayton, OH 45440</p>
                <a
                  href="https://maps.google.com/maps?q=95+Bramblebush+Trail,+Dayton,+OH+45440"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
            Don't let your competition get ahead. Contact us today for a free consultation 
            and discover how AI and automation can transform your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+13212361956"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call (321) 236-1956
            </a>
            <a
              href="mailto:info@atechv.com"
              className="bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-colors border-2 border-emerald-400 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Email Us Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}