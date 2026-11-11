import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function ProjectCard({ project }) {
  const themeStyle = {
    '--accent-color': project.theme.primary,
    '--glow-color': project.theme.glow,
  };

  return (
    <article
      className="theme-border theme-surface group relative flex h-full flex-col overflow-hidden rounded-2xl border-[1.5px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_8px_28px_var(--glow-color)] sm:p-6"
      style={themeStyle}
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="theme-text-secondary font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
          {project.category}
        </span>
        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-text-secondary rounded-lg px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors hover:text-[var(--accent-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="theme-text-primary text-2xl font-bold tracking-[-0.03em]">{project.title}</h3>
        <p className="theme-muted mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] sm:text-xs">
          {project.role} <span className="theme-subtle px-1">·</span> {project.period || '2024-2025'}
        </p>
        <p className="theme-text-secondary mt-4 text-sm leading-6">{project.summary}</p>

        <div className="mt-auto pt-5">
          <div className="theme-border flex flex-wrap items-center justify-between gap-3 border-t pt-4">
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {project.tech.slice(0, 4).map((item) => (
                <span key={item} className="theme-muted font-mono text-[10px]">
                  {item}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="theme-muted font-mono text-[10px]">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>
            <span className="theme-subtle shrink-0 font-mono text-[9px] uppercase tracking-[0.1em]">
              {project.demo ? 'Interactive demo' : 'Screenshot walkthrough'}
            </span>
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="theme-accent mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-[var(--accent-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            Learn more
            <ArrowUpRight aria-hidden="true" size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
