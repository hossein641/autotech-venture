import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">AutoTech Venture</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering Ohio businesses with AI-driven solutions, automation, and 
              professional web services. Led by PhD experts in computer science.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📍 95 Bramblebush Trail, Dayton, OH 45440</p>
              <p>📞 (321) 236-1956</p>
              <p>✉️ info@AtechV.com</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/ai-solutions-dayton" className="hover:text-white">AI & Automation</a></li>
              <li><a href="/web-design-dayton" className="hover:text-white">Web Design</a></li>
              <li><a href="/seo-services-dayton" className="hover:text-white">SEO Services</a></li>
              <li><a href="/ai-consultant-dayton" className="hover:text-white">AI Consulting</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/team" className="hover:text-white">Our Team</a></li>
              <li><a href="/blog" className="hover:text-white">Blog</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2025 AutoTech Venture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}