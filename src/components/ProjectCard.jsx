'use client';

const breakdownLabels = {
  problem: 'Problem',
  solution: 'Solution',
  impact: 'Impact',
};
export default function ProjectCard({ project }) {
  const themeStyle = {
    '--accent-color': project.theme.primary,
    '--glow-color': project.theme.glow,
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border-[1.5px] border-white/10 bg-slate-950/75 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_0_35px_var(--glow-color)] sm:p-6"
      style={themeStyle}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-200">
          {project.category}
        </span>

        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:text-white hover:shadow-[0_0_16px_var(--glow-color)]"
            >
              GitHub
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:text-white hover:shadow-[0_0_16px_var(--glow-color)]"
            >
              Demo
            </a>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold tracking-[-0.04em] text-white">{project.title}</h3>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
          {project.role} <span className="px-1 text-slate-600">•</span>
          {project.period || '2024-2025'}
        </p>
        <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300">{project.summary}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {Object.entries(project.purpose).map(([key, value]) => (
          <div
            key={key}
            className="rounded-xl border border-white/10 bg-white/[0.025] p-4"
          >
            <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-300">
              {breakdownLabels[key] || key}
            </div>
            <p className="text-sm leading-6 text-slate-200">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] font-medium text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:text-white hover:shadow-[0_0_14px_var(--glow-color)]"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
