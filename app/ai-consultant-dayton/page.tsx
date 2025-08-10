import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AI Consultant Dayton | AI Strategy Consulting | AutoTech Venture',
  description: 'Expert AI consultant in Dayton, Ohio. Strategic AI implementation, digital transformation planning, and technology consulting by PhD computer scientists.',
  alternates: {
    canonical: 'https://www.atechv.com/ai-consultant-dayton',
  },
};

export default function AIConsultantPage() {
  return (
    <main>
      <Header />
      <section className="bg-gradient-to-br from-indigo-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI Consultant in Dayton, Ohio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get expert AI consulting from PhD computer scientists. We help Dayton businesses 
              develop AI strategies, plan implementations, and navigate digital transformation.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
