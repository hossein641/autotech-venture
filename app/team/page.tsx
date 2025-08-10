import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Our Team | AutoTech Venture Leadership | Dayton Ohio',
  description: 'Meet the AutoTech Venture team. PhD computer scientists and technology experts based in Dayton, Ohio.',
  alternates: {
    canonical: 'https://www.atechv.com/team',
  },
};

export default function TeamPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-gray-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Expert Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the PhD computer scientists and technology experts driving innovation at AutoTech Venture.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
