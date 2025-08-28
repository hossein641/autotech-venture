import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info & Contact */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">AutoTech Venture</h3>
            <p className="text-gray-300 mb-6 text-sm">
              Empowering Ohio businesses with AI-driven solutions, automation, and 
              professional web services. Led by PhD experts in computer science.
            </p>
            
            {/* Clickable Contact Information */}
            <div className="space-y-3">
              {/* Address */}
              <a 
                href="https://maps.google.com/maps?q=95+Bramblebush+Trail,+Dayton,+OH+45440"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start text-gray-400 hover:text-white transition-colors group"
              >
                <MapPin className="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 group-hover:text-blue-400" />
                <span className="text-sm">95 Bramblebush Trail, Dayton, OH 45440</span>
              </a>
              
              {/* Phone */}
              <a 
                href="tel:+13212361956"
                className="flex items-center text-gray-400 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 mr-3 flex-shrink-0 group-hover:text-green-400" />
                <span className="text-sm">(321) 236-1956</span>
              </a>
              
              {/* Email */}
              <a 
                href="mailto:info@atechv.com"
                className="flex items-center text-gray-400 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 mr-3 flex-shrink-0 group-hover:text-blue-400" />
                <span className="text-sm">info@AtechV.com</span>
              </a>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-semibold mb-4 text-blue-400">Core Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/ai-solutions-dayton" className="hover:text-white transition-colors text-sm">
                  AI Solutions & Development
                </a>
              </li>
              <li>
                <a href="/web-design-dayton" className="hover:text-white transition-colors text-sm">
                  Web Design & Development
                </a>
              </li>
              <li>
                <a href="/seo-services-dayton" className="hover:text-white transition-colors text-sm">
                  SEO & Digital Marketing
                </a>
              </li>
              <li>
                <a href="/process-automation-dayton" className="hover:text-white transition-colors text-sm">
                  Process Automation & RPA
                </a>
              </li>
            </ul>
          </div>

          {/* Specialized Services */}
          <div>
            <h4 className="font-semibold mb-4 text-emerald-400">Specialized Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/ai-consultant-dayton" className="hover:text-white transition-colors text-sm">
                  AI Consulting
                </a>
              </li>
              <li>
                <a href="/data-analytics-dayton" className="hover:text-white transition-colors text-sm">
                  Data Analytics & BI
                </a>
              </li>
              <li>
                <a href="/custom-development-dayton" className="hover:text-white transition-colors text-sm">
                  Custom Software Development
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors text-sm">
                  Custom Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Company & Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-purple-400">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/about" className="hover:text-white transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-white transition-colors text-sm">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white transition-colors text-sm">
                  Blog & Insights
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors text-sm">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 AutoTech Venture. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0 text-sm text-gray-400">
              <span className="mr-4">Serving Dayton, OH & Surrounding Areas</span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-4"></span>
              <span>PhD-Led Technology Experts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}