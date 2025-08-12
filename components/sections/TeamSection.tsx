// components/sections/TeamSection.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Users, Brain, Network, GraduationCap, ArrowRight } from 'lucide-react';

export default function TeamSection() {
  const founders = [
    {
      name: "Dr. Hossein Mohammadi",
      title: "Co-Founder & Chief Executive Officer",
      degree: "PhD, Computer Science",
      image: "/images/team/hossein-mohammadi.jpg",
      expertise: ["Distributed Systems", "System Architecture", "Process Automation", "Business Intelligence"],
      description: "8+ years of experience in distributed systems and business automation. Expert in system architecture and process optimization.",
      icon: Network
    },
    {
      name: "Dr. Maziyar Pouyan",
      title: "Co-Founder & Chief Technology Officer",
      degree: "PhD, Computer Science", 
      image: "/images/team/maziyar-pouyan.jpg",
      expertise: ["Machine Learning", "Deep Learning", "Computer Vision", "AI Systems"],
      description: "7+ years of experience in AI and machine learning. Leading expert in developing cutting-edge AI solutions.",
      icon: Brain
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              PhD Leadership Team
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Meet Our Expert Founders
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Two PhD computer scientists with a shared vision to democratize advanced technology for Ohio businesses.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {founders.map((founder, index) => {
            const IconComponent = founder.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow">
                <div className="flex items-center mb-6">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mr-6">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{founder.name}</h3>
                    <p className="text-lg text-purple-600 font-semibold">{founder.title}</p>
                    <p className="text-gray-600">{founder.degree}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {founder.description}
                </p>
                
                <div className="flex items-center mb-4">
                  <IconComponent className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="font-semibold text-gray-900">Core Expertise</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {founder.expertise.map((skill, idx) => (
                    <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Academic Excellence Meets Business Innovation
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our PhD-level expertise sets us apart. We don't just implement existing solutions – we innovate, 
              research, and develop custom approaches that give our clients significant competitive advantages.
            </p>
            <Link
              href="/team"
              className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Meet the Full Team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
