// app/about/page.tsx
import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Award, Users, Target, Zap, CheckCircle, MapPin, Clock, TrendingUp, Shield, Heart, Lightbulb, Rocket } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About AutoTech Venture | AI & Automation Company Dayton Ohio',
  description: 'Learn about AutoTech Venture - a leading AI and automation company in Dayton, Ohio. Founded by PhD experts, we empower local businesses with cutting-edge technology solutions.',
  keywords: [
    'AutoTech Venture about',
    'AI company Dayton history',
    'automation company Ohio',
    'PhD technology experts Dayton',
    'local tech company Ohio'
  ],
  openGraph: {
    title: 'About AutoTech Venture | AI & Automation Company Dayton Ohio',
    description: 'Founded by PhD experts, AutoTech Venture empowers Dayton businesses with AI, automation, and web solutions.',
    url: 'https://www.atechv.com/about',
    siteName: 'AutoTech Venture',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About AutoTech Venture | AI & Automation Company Dayton Ohio',
    description: 'Founded by PhD experts, AutoTech Venture empowers Dayton businesses with AI, automation, and web solutions.',
  },
};

const stats = [
  {
    number: "50+",
    label: "Successful Projects",
    description: "Delivered across Ohio"
  },
  {
    number: "4.9★",
    label: "Average Rating",
    description: "Proven track record"
  },
  {
    number: "95%",
    label: "On-Time & On-Budget",
    description: "Reliable delivery"
  },
  {
    number: "26+",
    label: "Years Experience",
    description: "Combined expertise"
  }
];

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We build long-term relationships through honest communication, transparent processes, and reliable delivery on our promises."
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay at the forefront of technology, continuously learning and implementing cutting-edge solutions for our clients."
  },
  {
    icon: Heart,
    title: "Community",
    description: "We're committed to supporting Dayton's business community and helping local companies thrive in the digital age."
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We deliver exceptional results through meticulous attention to detail and a commitment to exceeding expectations."
  }
];

const milestones = [
  {
    year: "2015",
    title: "First Industrial AI Pilot",
    description:
      "Built a predictive-maintenance prototype (Python, scikit-learn) for an Ohio machine shop using vibration and uptime data."
  },
  {
    year: "2017",
    title: "Vision-Powered QA",
    description:
      "Integrated OpenCV cameras with PLCs to flag defects on the line, reducing manual inspection effort."
  },
  {
    year: "2019",
    title: "Data Pipelines & Dashboards",
    description:
      "ETL from ERP/SCADA into a warehouse; delivered real-time OEE and throughput dashboards for supervisors."
  },
  {
    year: "2021",
    title: "MLOps & Model Serving",
    description:
      "Containerized model APIs with CI/CD, monitoring for drift, and safe rollbacks to keep AI stable in production."
  },
  {
    year: "2023",
    title: "Generative AI Experiments",
    description:
      "RAG assistant over SOPs, maintenance logs, and drawings; automated ticket summaries and report drafting."
  },
  {
    year: "2024",
    title: "Process Automation at Scale",
    description:
      "Deployed bots and schedulers to streamline quoting, scheduling, and inventory checks across Ohio SMBs."
  },
  {
    year: "2025",
    title: "Optimization & Safety",
    description:
      "Built routing/scheduling optimizers with OR-Tools and established evals for accuracy, privacy, and robustness."
  }
];


export default function AboutPage() {
  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Award className="w-4 h-4" />
                About AutoTech Venture
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empowering Ohio Businesses
              <span className="text-blue-600 block">Through Technology</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Since 2019, AutoTech Venture has been at the forefront of technological innovation in Dayton, Ohio. 
              Founded by PhD experts in computer science, we transform businesses through AI, automation, and 
              cutting-edge web solutions.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-xl p-6 shadow-lg">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To democratize advanced technology for small and medium-sized businesses in Ohio, 
                making AI, automation, and professional web solutions accessible and affordable 
                for companies that traditionally couldn't access these capabilities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe every business, regardless of size, should have access to the same 
                technological advantages that drive efficiency, growth, and competitive advantage 
                in today's digital economy.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To become the leading technology partner for Ohio businesses, creating a thriving 
                ecosystem where local companies leverage cutting-edge AI and automation to compete 
                globally while strengthening the regional economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every solution we deliver.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
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

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a vision to transform Ohio businesses to becoming a trusted technology partner.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-blue-200"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse'}`}>
                  {index % 2 === 0 ? (
                    <>
                      <div className="md:pr-8">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                          {milestone.year}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </div>
                      <div className="hidden md:block"></div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block"></div>
                      <div className="md:pl-8">
                        <div className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                          {milestone.year}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{milestone.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                      </div>
                    </>
                  )}
                  
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Businesses Choose AutoTech Venture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine deep technical expertise with a genuine understanding of Ohio business challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">PhD Expertise</h3>
              <p className="text-gray-600 leading-relaxed">
                Led by computer science PhDs with 15+ years of combined experience in AI, 
                automation, and enterprise technology solutions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Local Presence</h3>
              <p className="text-gray-600 leading-relaxed">
                Based in Dayton, Ohio, we understand local business challenges and provide 
                personalized, hands-on service to Ohio companies.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Proven Results</h3>
              <p className="text-gray-600 leading-relaxed">
                50+ successful projects with 100% client satisfaction rate. Our solutions 
                deliver measurable ROI and long-term business value.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Rocket className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">End-to-End Solutions</h3>
              <p className="text-gray-600 leading-relaxed">
                From strategy to implementation to ongoing support, we handle every aspect 
                of your technology transformation journey.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Scalable Technology</h3>
              <p className="text-gray-600 leading-relaxed">
                We build solutions that grow with your business, ensuring long-term value 
                and avoiding costly technology debt.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="inline-flex p-4 rounded-full bg-blue-100 text-blue-600 mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Responsive Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated support team ensures your systems run smoothly with proactive 
                monitoring and rapid issue resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join 50+ satisfied clients who have revolutionized their operations with AutoTech Venture's 
            innovative solutions. Let's discuss how we can help your business thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Free Consultation
            </a>
            <a
              href="tel:+13212361956"
              className="bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-blue-400"
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