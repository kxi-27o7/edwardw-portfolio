import Hero from '@/components/Hero';
import ProjectGrid from '@/components/ProjectGrid';
import ExperienceMatrix from '@/components/ExperienceMatrix';
import TechnicalStackGrid from '@/components/TechnicalStackGrid';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ProjectGrid />
      <ExperienceMatrix />
      <TechnicalStackGrid />
    </main>
  );
}
