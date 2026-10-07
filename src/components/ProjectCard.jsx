'use client';

export default function ProjectCard({ project }) {
  const themeStyle = {
    '--accent-color': project.theme.primary,
    '--glow-color': project.theme.glow,
  };

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border-2 border-neutral-800 bg-slate-950/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_0_35px_var(--glow-color)]"
      style={themeStyle}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <span className="inline-flex rounded-full border border-neutral-700 bg-slate-900/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.24em] text-slate-200">
          {project.category}
        </span>

        <div className="flex items-center gap-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-700 bg-slate-900/80 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100 transition-all duration-300 hover:border-[var(--accent-color)] hover:text-white"
            >
              GitHub
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-700 bg-slate-900/80 px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-100 transition-all duration-300 hover:border-[var(--accent-color)] hover:text-white"
            >
              Demo
            </a>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold tracking-[-0.04em] text-white">{project.title}</h3>
          <p className="mt-2 text-xs uppercase tracking-[0.26em] text-slate-400">
            {project.role} • {project.period || '2024-2025'}
          </p>
        </div>

        <p className="text-base leading-7 text-slate-300">{project.summary}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {Object.entries(project.purpose).map(([key, value]) => (
          <div key={key} className="rounded-xl border border-neutral-800 bg-slate-900/60 p-3.5">
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">
              {key.toUpperCase()}
            </div>
            <p className="text-sm leading-6 text-slate-200">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tech.map((item) => (
          <span
            key={item}
            className="rounded-full border border-neutral-700 bg-slate-900/80 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-200"
          >
            {item}
          </span>
        ))}
      </div>
    </article>
  );
}
