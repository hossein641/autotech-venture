
// components/sections/AboutSection.tsx
import Link from 'next/link';
import { Award, MapPin, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const highlights = [
    {
      icon: Award,
      title: "PhD-Level Expertise",
      description: "Led by Dr. Hossein Mohammadi and Dr. Maziyar Pouyan with combined 15+ years of experience in computer science and business automation."
    },
    {
      icon: MapPin,
      title: "Local Dayton Presence",
      description: "Based right here in Dayton, Ohio. We understand local business challenges and provide personalized, hands-on service."
    },
    {
      icon: CheckCircle,
      title: "Proven Track Record",
      description: "50+ successful projects with 100% client satisfaction rate. Our solutions deliver measurable ROI and long-term value."
    },
    {
      icon: TrendingUp,
      title: "End-to-End Solutions",
      description: "From strategy to implementation to ongoing support, we handle every aspect of your technology transformation."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                About AutoTech Venture
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Empowering Ohio Businesses Through Technology Innovation
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Since 2019, AutoTech Venture has been at the forefront of technological innovation in Dayton, Ohio. 
              Founded by PhD experts in computer science, we transform businesses through AI, automation, and 
              cutting-edge web solutions.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our mission is to democratize advanced technology for small and medium-sized businesses, 
              making AI and automation accessible and affordable for companies that traditionally couldn't access these capabilities.
            </p>
            <Link
              href="/about"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold inline-flex items-center gap-2"
            >
              Learn More About Us
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            {highlights.map((highlight, index) => {
              const IconComponent = highlight.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start">
                    <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
