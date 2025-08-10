import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import TeamSection from '@/components/sections/TeamSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'AI and Automation Company Dayton | AutoTech Venture',
  description: 'AutoTech Venture empowers Ohio small businesses with AI-driven solutions, automation, and professional web services. Led by PhD experts. Based in Dayton, OH.',
  alternates: {
    canonical: 'https://www.atechv.com',
  },
};

export default function HomePage() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <TeamSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
