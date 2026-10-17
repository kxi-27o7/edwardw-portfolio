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
      className="theme-border theme-surface group relative overflow-hidden rounded-2xl border-[1.5px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_0_35px_var(--glow-color)] sm:p-6"
      style={themeStyle}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <span className="theme-border theme-surface-chip theme-text-secondary inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]">
          {project.category}
        </span>

        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-border theme-surface-chip theme-text-secondary rounded-lg border px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:shadow-[0_0_16px_var(--glow-color)]"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      <div>
        <h3 className="theme-text-primary text-2xl font-bold tracking-[-0.04em]">{project.title}</h3>
        <p className="theme-muted mt-2 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-xs">
          {project.role} <span className="theme-subtle px-1">•</span>
          {project.period || '2024-2025'}
        </p>
        <p className="theme-text-secondary mt-4 max-w-4xl text-sm leading-6">{project.summary}</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {Object.entries(project.purpose).map(([key, value]) => (
          <div
            key={key}
            className="theme-border theme-surface-inset rounded-xl border p-4"
          >
            <div className="theme-text-secondary mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
              {breakdownLabels[key] || key}
            </div>
            <p className="theme-text-secondary text-sm leading-6">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="theme-border theme-surface-chip theme-text-secondary rounded-full border px-2.5 py-1.5 font-mono text-[10px] font-medium transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:shadow-[0_0_14px_var(--glow-color)]"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
