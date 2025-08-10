import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Contact AutoTech Venture | AI Solutions Dayton Ohio',
  description: 'Contact AutoTech Venture for AI solutions, automation, and web services in Dayton, Ohio. Get your free consultation today.',
  alternates: {
    canonical: 'https://www.atechv.com/contact',
  },
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your business with AI? Contact our expert team for a free consultation.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
