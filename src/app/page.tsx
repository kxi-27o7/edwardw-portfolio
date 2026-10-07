import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import ExperienceMatrix from '@/components/ExperienceMatrix';
import TechnicalStackGrid from '@/components/TechnicalStackGrid';
import SiteNavigation from '@/components/SiteNavigation';

export default function Home() {
  return (
    <>
      <SiteNavigation />
      <main className="relative">
        <Hero />
        <ProjectGrid />
        <ExperienceMatrix />
        <TechnicalStackGrid />
      </main>
    </>
  );
}
