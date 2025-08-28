// app/team/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Users, Award, Brain, Code, Database, Cpu, Network, BookOpen, GraduationCap, Target, Zap, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Team | PhD Experts in AI & Automation | AutoTech Venture Dayton',
  description: 'Meet the PhD experts behind AutoTech Venture. Dr. Hoss and Dr. Mazi lead our team of computer science professionals in Dayton, Ohio.',
  keywords: [
    'AutoTech Venture team',
    'PhD computer science experts Dayton',
    'AI automation experts Ohio',
    'Dr. Hoss',
    'Dr. Mazi',
    'technology leadership team'
  ],
  openGraph: {
    title: 'Our Team | PhD Experts in AI & Automation | AutoTech Venture Dayton',
    description: 'Meet the PhD experts behind AutoTech Venture - Dr. Hoss and Dr. Mazi.',
    url: 'https://www.atechv.com/team',
    siteName: 'AutoTech Venture',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Team | PhD Experts in AI & Automation | AutoTech Venture Dayton',
    description: 'Meet the PhD experts behind AutoTech Venture - Dr. Hoss and Dr. Mazi.',
  },
};

const teamLeaders = [
  {
    name: "Dr. Hoss",
    title: "Co-Founder & Chief Executive Officer",
    degree: "PhD, Computer Science",
    image: "/images/team/Hoss.jpeg", // Placeholder - replace with actual image
    bio: "Dr. Hoss brings over 12 years of experience in distributed systems and business automation. His expertise in system architecture and process optimization has helped dozens of Ohio businesses streamline their operations and achieve unprecedented efficiency gains.",
    specializations: [
      "Distributed Systems",
      "System Architecture", 
      "Process Automation",
      "Business Intelligence",
      "Enterprise Integration"
    ],
    achievements: [
      "Led automation projects saving clients 75% in processing time",
      "Published researcher in distributed computing",
      "Designed enterprise systems serving millions of users",
      "Expert in scalable technology architecture"
    ],
    icon: Network
  },
  {
    name: "Dr. Mazi",
    title: "Co-Founder & Chief Technology Officer", 
    degree: "PhD, Computer Science",
    image: "/images/team/Mazi.jpeg", // Placeholder - replace with actual image
    bio: "Dr. Mazi is a leading expert in artificial intelligence and machine learning with 14+ years of experience developing cutting-edge AI solutions. His deep learning expertise powers the innovative AI systems that transform how our clients operate and compete.",
    specializations: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "AI Systems",
      "Neural Networks"
    ],
    achievements: [
      "Developed AI models with 95%+ accuracy rates",
      "Expert in computer vision and image processing",
      "Published research in top-tier AI conferences",
      "Built production AI systems for Fortune 500 companies"
    ],
    icon: Brain
  }
];

const teamStats = [
  {
    number: "26+",
    label: "Years Combined Experience",
    description: "In computer science & AI"
  },
  {
    number: "2",
    label: "PhD Founders",
    description: "Leading our expertise"
  },
  {
    number: "50+",
    label: "Projects Delivered",
    description: "With our direct involvement"
  },
  {
    number: "100%",
    label: "Client Satisfaction",
    description: "From our leadership"
  }
];

const expertise = [
  {
    category: "Artificial Intelligence",
    technologies: ["Machine Learning", "Deep Learning", "Computer Vision", "Natural Language Processing", "Neural Networks"],
    icon: Brain
  },
  {
    category: "System Architecture",
    technologies: ["Distributed Systems", "Cloud Computing", "Microservices", "Enterprise Integration", "Scalable Architectures"],
    icon: Network
  },
  {
    category: "Automation & Process",
    technologies: ["RPA", "Workflow Automation", "Business Process Optimization", "Data Pipeline Automation", "API Development"],
    icon: Zap
  },
  {
    category: "Development & Data",
    technologies: ["Full-Stack Development", "Database Design", "Data Analytics", "Business Intelligence", "Custom Software"],
    icon: Database
  }
];

const values = [
  {
    title: "Academic Excellence",
    description: "Our PhD-level expertise ensures solutions are built on solid theoretical foundations and cutting-edge research.",
    icon: GraduationCap
  },
  {
    title: "Practical Application",
    description: "We bridge the gap between academic research and real-world business applications that drive measurable results.",
    icon: Target
  },
  {
    title: "Continuous Learning",
    description: "We stay current with the latest technological advances, ensuring our clients benefit from emerging innovations.",
    icon: BookOpen
  },
  {
    title: "Collaborative Approach",
    description: "We work closely with our clients' teams, providing training and knowledge transfer for long-term success.",
    icon: Users
  }
];

export default function TeamPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" />
                Meet Our Team
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              PhD Experts Leading
              <span className="text-purple-600 block">Technology Innovation</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our team combines deep academic expertise with real-world business experience to deliver 
              cutting-edge AI, automation, and technology solutions that transform Ohio businesses.
            </p>
          </div>

          {/* Team Stats */}
          <div className="grid md:grid-cols-4 gap-8">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Founding Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Two PhD computer scientists with a shared vision to democratize advanced technology for Ohio businesses.
            </p>
          </div>

          <div className="space-y-16">
            {teamLeaders.map((leader, index) => {
              const IconComponent = leader.icon;
              return (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8 h-full">
                      <div className="flex items-center mb-6">
                        <div className="w-24 h-24 bg-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-6">
                          {leader.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">{leader.name}</h3>
                          <p className="text-lg text-purple-600 font-semibold">{leader.title}</p>
                          <p className="text-gray-600">{leader.degree}</p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <IconComponent className="w-6 h-6 text-purple-600 mr-3" />
                        <span className="text-lg font-semibold text-gray-900">Core Expertise</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {leader.specializations.map((spec, idx) => (
                          <span key={idx} className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {leader.bio}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-gray-900">Key Achievements:</h4>
                      {leader.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Expertise */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Technical Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deep knowledge across the full spectrum of modern technology, from AI research to enterprise implementation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {expertise.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{area.category}</h3>
                  </div>
                  <div className="space-y-2">
                    {area.technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        <span className="text-gray-700">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Leadership Philosophy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in combining academic rigor with practical business solutions to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-purple-100 text-purple-600 mb-6">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Academic Credentials */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Academic Excellence Meets Business Innovation
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our PhD-level expertise sets us apart in the technology consulting landscape. 
                We don't just implement existing solutions – we innovate, research, and develop 
                custom approaches that give our clients significant competitive advantages.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <GraduationCap className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Research-Driven Solutions</h4>
                    <p className="text-gray-600">Our solutions are based on the latest academic research and proven methodologies.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <BookOpen className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Continuous Innovation</h4>
                    <p className="text-gray-600">We stay at the forefront of technological advancement through ongoing research.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Proven Expertise</h4>
                    <p className="text-gray-600">Published researchers with real-world application experience.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why PhD Leadership Matters</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Deep Technical Understanding</h4>
                  <p className="text-gray-600">We understand the fundamental principles behind every technology we implement.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Custom Innovation</h4>
                  <p className="text-gray-600">We can develop entirely new approaches when existing solutions fall short.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Future-Proof Planning</h4>
                  <p className="text-gray-600">Our academic perspective helps us anticipate and prepare for future technological trends.</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-gray-900">Educational Partnership</h4>
                  <p className="text-gray-600">We educate your team, building internal capability alongside our solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Work Directly with PhD Experts
          </h2>
          <p className="text-xl text-purple-100 mb-8 leading-relaxed">
            When you partner with AutoTech Venture, you get direct access to our founding team. 
            No junior consultants – just PhD-level expertise focused on your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Schedule a Consultation
            </a>
            <a
              href="tel:+13212361956"
              className="bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors border-2 border-purple-400"
            >
              Call (321) 236-1956
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}