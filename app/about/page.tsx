import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'About AutoTech Venture | AI & Automation Experts | Dayton Ohio',
  description: 'Learn about AutoTech Venture\'s mission to empower Ohio businesses with AI solutions. Meet our PhD-led team based in Dayton, Ohio.',
  alternates: {
    canonical: 'https://www.atechv.com/about',
  },
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About AutoTech Venture
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering Ohio businesses with AI-driven solutions, automation, and 
              professional web services. Led by PhD experts in computer science.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2019 by Dr. Hossein Mohammadi and Dr. Maziyar Pouyan, 
                AutoTech Venture emerged from a shared vision to make advanced 
                technology accessible to small and medium businesses.
              </p>
              <p className="text-gray-600">
                Based in Dayton, Ohio, we understand the unique challenges facing 
                businesses in our community and provide personalized solutions 
                that drive real results.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize access to cutting-edge AI and automation technologies, 
                empowering businesses of all sizes to compete and thrive in the 
                digital economy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
