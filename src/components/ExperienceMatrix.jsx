'use client';

const experiences = [
  {
    title: 'BNCC Praetorian C Instructor',
    period: 'Sep 2025 – Feb 2026',
    description:
      'Taught 13-session C curriculum, conducted algorithm code reviews, and managed performance metrics.',
    accent: 'from-indigo-500/20 via-indigo-500/5 to-transparent',
  },
  {
    title: 'Samsung Innovation Campus — Team KYGE',
    period: 'Jan 2025 – May 2025',
    description:
      'Advanced to Stage 4 (Top 320 out of 10,000+ candidates) in smart IoT & GenAI solution architecture.',
    accent: 'from-emerald-500/20 via-emerald-500/5 to-transparent',
  },
  {
    title: 'ElevAIte Hackathon 2025',
    period: 'May 2025 - Jun 2025',
    description:
      'Designed UI/UX component systems and high-fidelity interactive prototypes in Figma.',
    accent: 'from-sky-500/20 via-sky-500/5 to-transparent',
  },
];

export default function ExperienceMatrix() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          Milestones & Experience
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white sm:text-4xl">
          Personal & Professional Growth
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {experiences.map((experience, index) => (
          <article
            key={experience.title}
            className="relative overflow-hidden rounded-2xl border-2 border-neutral-800 bg-slate-950/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-color)] hover:shadow-[0_0_30px_var(--glow-color)]"
            style={{
              '--accent-color': index === 0 ? '#6366F1' : index === 1 ? '#10B981' : '#0EA5E9',
              '--glow-color':
                index === 0
                  ? 'rgba(99, 102, 241, 0.15)'
                  : index === 1
                    ? 'rgba(16, 185, 129, 0.15)'
                    : 'rgba(14, 165, 233, 0.15)',
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${experience.accent}`} />
            <div className="relative">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="rounded-full border border-neutral-700 bg-slate-900/80 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-200">
                  {experience.period}
                </span>
              </div>

              <h3 className="text-xl font-bold tracking-[-0.04em] text-white">{experience.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">{experience.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
