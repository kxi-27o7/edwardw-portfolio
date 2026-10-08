'use client';

import ProjectCard from './ProjectCard';
import projects from '../../data/projects.json';

export default function ProjectGrid() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-indigo-300">
            {'Case Studies'}
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
            Selected product works
          </h2>
        </div>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
