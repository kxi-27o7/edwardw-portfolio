import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import projects from '../../../../data/projects.json';
import BankGuardDemo from '@/components/BankGuardDemo';
import CollabraGallery from '@/components/CollabraGallery';
import FakeGuardDemo from '@/components/FakeGuardDemo';
import SeeFloodDemo from '@/components/SeeFloodDemo';

function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: 'Project not found | Edward Wibowo' };
  }

  return {
    title: `${project.title} | Edward Wibowo`,
    description: project.summary,
  };
}

function ProjectDemo({ demo }) {
  if (demo === 'bankguard') return <BankGuardDemo />;
  if (demo === 'seeflood') return <SeeFloodDemo />;
  if (demo === 'fakeguard') return <FakeGuardDemo />;
  return null;
}

function ProjectPageFallback() {
  return (
    <main className="theme-muted mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-8" aria-live="polite">
      Loading project…
    </main>
  );
}

export default function ProjectPage({ params }) {
  return (
    <Suspense fallback={<ProjectPageFallback />}>
      {params.then(({ slug }) => <ProjectContent slug={slug} />)}
    </Suspense>
  );
}

function ProjectContent({ slug }) {
  const projectIndex = projects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) notFound();

  const project = projects[projectIndex];
  const previousProject = projects[projectIndex - 1];
  const nextProject = projects[projectIndex + 1];
  const themeStyle = {
    '--accent-color': project.theme.primary,
    '--glow-color': project.theme.glow,
  };

  return (
    <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 lg:px-8" style={themeStyle}>
      <Link
        href="/#projects"
        className="theme-text-secondary theme-hover-accent inline-flex items-center gap-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
      >
        <ArrowLeft aria-hidden="true" size={16} />
        All projects
      </Link>

      <header className="theme-border mt-8 border-b pb-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="theme-accent font-mono text-xs font-semibold uppercase tracking-[0.16em]">
            {project.category} |
          </p>
          <p className="theme-muted font-mono text-xs uppercase tracking-[0.12em]">
            {project.role} · {project.period || '2024-2025'}
          </p>
        </div>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <h1 className="theme-text-primary max-w-4xl text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            {project.title}
          </h1>
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-border theme-text-secondary inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--accent-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            >
              Source code
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          )}
        </div>
        <p className="theme-text-secondary mt-5 max-w-3xl text-base leading-7">
          {project.summary}
        </p>
      </header>

      <section aria-label="Project overview" className="mt-8 grid gap-6 md:grid-cols-3">
        {Object.entries(project.purpose).map(([key, value]) => {
          const label = key.charAt(0).toUpperCase() + key.slice(1);
          return (
            <div key={key} className="theme-border border-t pt-4">
              <h2 className="theme-accent font-mono text-xs font-semibold uppercase tracking-[0.14em]">
                {label}
              </h2>
              <p className="theme-text-secondary mt-3 text-sm leading-6">{value}</p>
            </div>
          );
        })}
      </section>

      <section aria-label="Technologies used" className="theme-border mt-8 border-t pt-5">
        <h2 className="theme-muted font-mono text-[10px] font-semibold uppercase tracking-[0.14em]">
          Built with
        </h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {project.tech.map((item) => (
            <li key={item} className="theme-text-secondary font-mono text-xs">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {project.slug === 'collabra' ? (
        <CollabraGallery />
      ) : (
        <ProjectDemo demo={project.demo} />
      )}

      <nav aria-label="Browse project case studies" className="theme-border mt-12 border-t pt-6">
        <div className="flex items-center justify-between gap-4">
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.slug}`}
              className="theme-text-secondary theme-hover-accent inline-flex min-w-0 items-center gap-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
            >
              <ArrowLeft aria-hidden="true" className="shrink-0" size={16} />
              <span className="truncate">{previousProject.title}</span>
            </Link>
          ) : <span />}
          <Link
            href="/#projects"
            className="theme-muted shrink-0 text-xs transition-colors hover:text-[var(--text-primary)]"
          >
            All projects
          </Link>
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="theme-text-secondary theme-hover-accent inline-flex min-w-0 items-center gap-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
            >
              <span className="truncate">{nextProject.title}</span>
              <ArrowRight aria-hidden="true" className="shrink-0" size={16} />
            </Link>
          ) : <span />}
        </div>
      </nav>
    </main>
  );
}
