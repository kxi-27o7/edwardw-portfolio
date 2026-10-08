const experiences = [
  {
    title: 'BNCC Praetorian C Instructor',
    role: 'Course Instructor',
    period: 'Sep 2025 – Feb 2026',
    description:
      'Taught a 13-session C programming curriculum, conducted code reviews, and managed KPI benchmarks.',
    accent: '#6366F1',
    glow: 'rgba(99, 102, 241, 0.15)',
    tint: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
  },
  {
    title: 'Samsung Innovation Campus -- Team KYGE',
    role: 'Solution Designer',
    period: 'Jan 2025 – May 2025',
    description:
      'Advanced to Stage 4 (Top 320 out of 10,000+ candidates). Designed IoT monitoring architecture and Generative AI integration frameworks.',
    accent: '#0EA5E9',
    glow: 'rgba(14, 165, 233, 0.15)',
    tint: 'from-sky-500/20 via-sky-500/5 to-transparent',
  },
  {
    title: 'ElevAIte Hackathon 2025',
    role: 'UI/UX Designer & Prototyper',
    period: 'May 2025 – June 2025',
    description:
      'Architected user flows and interactive Figma component systems for an AI product concept, advancing as a semifinalist.',
    accent: '#10B981',
    glow: 'rgba(16, 185, 129, 0.15)',
    tint: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
];

export default function ExperienceMatrix() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mb-8 border-b border-white/10 pb-5">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-indigo-300">
          {'Milestones & Experience'}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
          Personal & Professional Growth
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
        {experiences.map((experience, index) => (
          <article
            key={experience.title}
            className={`group relative min-h-56 overflow-hidden rounded-2xl border-[1.5px] border-white/10 bg-slate-950/75 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_0_30px_var(--glow-color)] sm:p-6 ${
              index === 0 ? 'md:row-span-2 md:min-h-0' : ''
            }`}
            style={{
              '--accent-color': experience.accent,
              '--glow-color': experience.glow,
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${experience.tint} opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative flex h-full flex-col">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                  {experience.period}
                </span>
                {index === 0 && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-indigo-200">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold tracking-[-0.04em] text-white sm:text-2xl">
                {experience.title}
              </h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-indigo-200">
                {experience.role}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-300">{experience.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
