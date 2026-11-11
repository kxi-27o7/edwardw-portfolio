import ProjectCard from './ProjectCard';
import projects from '../../data/projects.json';

export default function ProjectGrid() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="theme-text-primary text-3xl font-black tracking-[-0.04em] sm:text-4xl">
            Selected product works
          </h2>
          <p className="theme-text-secondary mt-3 max-w-2xl text-sm leading-6">
            A selection of software and machine-learning projects, with implementation details and demos inside each case study.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
