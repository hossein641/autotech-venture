// components/sections/HeroSection.tsx
import Link from 'next/link';
import { ArrowRight, Award, CheckCircle, TrendingUp, Users } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <Award className="w-4 h-4" />
              PhD-Led Technology Excellence
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transform Your Ohio Business with
            <span className="text-blue-600 block">AI & Automation</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
            AutoTech Venture empowers small businesses in Dayton and across Ohio with cutting-edge AI solutions, 
            automation tools, and professional web services. Led by PhD experts in computer science with 26+ years of experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              Start Your Transformation
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/#services"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
            >
              View Our Services
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Successful Projects</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">6</div>
              <div className="text-sm text-gray-600">Years in Business</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">PhD</div>
              <div className="text-sm text-gray-600">Expert Leadership</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-600">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            PhD-Led Team
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Based in Dayton, OH
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            15+ Years Experience
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Local Ohio Focus
          </div>
        </div>
      </div>
    </section>
  );
}
