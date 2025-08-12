
// components/sections/ContactSection.tsx
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      detail: "(321) 236-1956",
      description: "Speak directly with our PhD experts",
      action: "tel:+13212361956"
    },
    {
      icon: Mail,
      title: "Email Us",
      detail: "info@AtechV.com",
      description: "Get detailed responses within 24 hours",
      action: "mailto:info@atechv.com"
    },
    {
      icon: MapPin,
      title: "Visit Our Office",
      detail: "95 Bramblebush Trail",
      description: "Dayton, OH 45440",
      action: "https://maps.google.com/maps?q=95+Bramblebush+Trail,+Dayton,+OH+45440"
    },
    {
      icon: Clock,
      title: "Business Hours",
      detail: "Mon-Fri 9:00 AM - 6:00 PM",
      description: "Eastern Standard Time",
      action: "/contact"
    }
  ];

  const benefits = [
    "Free initial consultation",
    "PhD-level expertise",
    "Local Dayton presence",
    "100% client satisfaction rate",
    "End-to-end solutions",
    "Ongoing support included"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <div>
            <div className="flex items-center mb-6">
              <span className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Get In Touch
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Get your free consultation today and discover how AI, automation, and cutting-edge web solutions 
              can revolutionize your Ohio business operations.
            </p>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-3">
                      <div className="inline-flex p-2 rounded-lg bg-emerald-100 text-emerald-600 mr-3">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                    </div>
                    <p className="text-emerald-600 font-medium mb-1">{method.detail}</p>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Why Choose AutoTech Venture?</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - CTA Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Get Your Free Consultation
            </h3>
            <p className="text-gray-600 mb-6">
              Tell us about your project and we'll provide a customized solution with transparent pricing. 
              No obligation, just expert advice from our PhD team.
            </p>

            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    placeholder="John" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                    placeholder="Smith" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  placeholder="john@company.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  placeholder="(xxx) xxx-xxxx" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Services Interested In</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="">Select a service</option>
                  <option value="ai-solutions">AI Solutions & Automation</option>
                  <option value="web-design">Web Design & Development</option>
                  <option value="seo">SEO & Digital Marketing</option>
                  <option value="consulting">AI Consulting</option>
                  <option value="multiple">Multiple Services</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Description *</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                  placeholder="Tell us about your project goals and challenges..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-gray-500 text-center">
                ✓ No obligation consultation ✓ Response within 24 hours ✓ PhD expert evaluation
              </p>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <Link
                href="/contact"
                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm"
              >
                View all contact options →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}