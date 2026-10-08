import Hero from '@/components/Hero';
import AboutSection from '@/components/AboutSection';
import ProjectGrid from '@/components/ProjectGrid';
import ExperienceMatrix from '@/components/ExperienceMatrix';
import TechnicalStackGrid from '@/components/TechnicalStackGrid';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <>
      <main className="relative">
        <Hero />
        <AboutSection />
        <ProjectGrid />
        <ExperienceMatrix />
        <TechnicalStackGrid />
      </main>
      <SiteFooter />
    </>
  );
}
