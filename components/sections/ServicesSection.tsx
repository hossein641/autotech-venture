// components/sections/ServicesSection.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Bot, Globe, Search, Zap, CheckCircle, Target, Users, Award, TrendingUp, Phone, Mail } from 'lucide-react';

const services = [
  {
    id: 'ai-automation',
    title: 'AI Solutions & Automation',
    description: 'Transform your business with intelligent automation, custom AI applications, and process optimization designed specifically for Ohio businesses.',
    icon: Bot,
    features: [
      'Custom AI Development',
      'Business Process Automation (RPA)', 
      'AI Strategy Consulting',
      'Machine Learning Implementation',
      'Predictive Analytics Solutions',
      'Intelligent Document Processing'
    ],
    benefits: [
      '304% Average ROI',
      '60-80% Time Savings',
      'Eliminate Manual Errors',
      'Scale Operations Efficiently'
    ],
    href: '/ai-solutions-dayton',
    ctaText: "Explore AI Solutions",
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50',
    startingPrice: 'Starting at $5,000'
  },
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Professional websites that convert visitors into customers. Custom designs, responsive development, e-commerce solutions, and ongoing maintenance.',
    icon: Globe,
    features: [
      'Custom Website Development',
      'Responsive Mobile-First Design',
      'E-commerce Solutions',
      'Content Management Systems',
      'Website Maintenance & Support',
      'Performance Optimization'
    ],
    benefits: [
      'Mobile-Optimized Design',
      'Fast Loading Speeds',
      'SEO-Ready Structure',
      'Conversion Focused'
    ],
    href: '/web-design-dayton',
    ctaText: "View Web Design Services",
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    startingPrice: 'Starting at $3,000'
  },
  {
    id: 'seo-marketing',
    title: 'SEO & Digital Marketing',
    description: 'Dominate local search results and grow your online presence with data-driven SEO strategies and comprehensive digital marketing solutions.',
    icon: Search,
    features: [
      'Local SEO Optimization',
      'Technical SEO Audits & Fixes',
      'Content Marketing Strategy',
      'Google Business Profile Management',
      'Link Building & Authority Building',
      'Performance Tracking & Reporting'
    ],
    benefits: [
      'Higher Search Rankings',
      'Increased Website Traffic',
      'More Qualified Leads',
      'Better Online Visibility'
    ],
    href: '/seo-services-dayton',
    ctaText: "Get SEO Services Details",
    gradient: 'from-purple-500 to-pink-600',
    bgGradient: 'from-purple-50 to-pink-50',
    startingPrice: 'Starting at $1,500'
  }
];

const stats = [
  { label: 'Successful Projects', value: '50+', icon: Target },
  { label: 'Client Satisfaction', value: '100%', icon: Users },
  { label: 'Years Experience', value: '8+', icon: Award },
  { label: 'Average ROI', value: '304%', icon: TrendingUp }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Our Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Tech Solutions for
            <span className="text-blue-600 block">Dayton Businesses</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From AI automation to web development and SEO, we provide end-to-end technology 
            solutions that drive growth and efficiency for Ohio businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={service.id}
                className={`group relative bg-gradient-to-br ${service.bgGradient} p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Service Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                {/* Service Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Benefits Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.benefits.slice(0, 2).map((benefit, idx) => (
                    <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {benefit}
                    </span>
                  ))}
                </div>

                {/* Pricing */}
                <div className="text-gray-600 mb-4 font-semibold">
                  {service.startingPrice}
                </div>

                {/* CTA Link */}
                <Link 
                  href={service.href}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors group"
                >
                  {service.ctaText || `Get ${service.title} Details`}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Preview */}
        <div className="text-center mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Our Proven Process
          </h3>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Consultation", description: "Free discovery session to understand your needs" },
              { step: "2", title: "Strategy", description: "Custom solution design and project planning" },
              { step: "3", title: "Development", description: "Agile implementation with regular updates" },
              { step: "4", title: "Support", description: "Ongoing maintenance and optimization" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xl font-bold mb-4">
                  {step.step}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Get a free consultation and discover how our solutions can drive your success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link 
                href="/contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Get Free Consultation
              </Link>
              <Link 
                href="/about"
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn About Our Team
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-blue-100">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Call: (937) 963-9424
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                info@atechv.com
              </div>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              ✓ Free consultation ✓ No commitment ✓ Local Dayton team
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}