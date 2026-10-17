const experiences = [
  {
    title: 'BNCC Praetorian C Instructor',
    role: 'Course Instructor',
    period: 'Sep 2025 – Feb 2026',
    description:
      'Taught a 13-session C programming curriculum, conducted code reviews, and managed KPI benchmarks.',
    accent: '#2563EB',
    glow: 'rgba(37, 99, 235, 0.15)',
    tint: 'from-blue-500/20 via-blue-500/5 to-transparent',
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
      <div className="theme-border mb-8 border-b pb-5">
        <p className="theme-accent font-mono text-xs font-medium uppercase tracking-[0.24em]">
          {'Milestones & Experience'}
        </p>
        <h2 className="theme-text-primary mt-3 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
          Personal & Professional Growth
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2">
        {experiences.map((experience, index) => (
          <article
            key={experience.title}
            className={`theme-border theme-surface group relative min-h-56 overflow-hidden rounded-2xl border-[1.5px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_0_30px_var(--glow-color)] sm:p-6 ${
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
                <span className="theme-border theme-surface-chip theme-text-secondary rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em]">
                  {experience.period}
                </span>
                {index === 0 && (
                  <span className="theme-accent font-mono text-[10px] uppercase tracking-[0.18em]">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="theme-text-primary text-xl font-bold tracking-[-0.04em] sm:text-2xl">
                {experience.title}
              </h3>
              <p className="theme-accent mt-2 font-mono text-xs uppercase tracking-[0.16em]">
                {experience.role}
              </p>
              <p className="theme-text-secondary mt-4 text-sm leading-6">{experience.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
