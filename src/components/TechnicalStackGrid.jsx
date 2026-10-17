'use client';

const stackGroups = [
  {
    title: 'Languages',
    items: ['C/C++', 'Python', 'SQL', 'JavaScript'],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      'HTML',
      'CSS',
      'PyTorch',
      'Scikit-Learn',
      'OpenCV',
      'Flask',
      'FastAPI',
      'React',
      'Tailwind CSS',
    ],
  },
  {
    title: 'Tools & Infra',
    items: ['Git', 'Docker', 'PostgreSQL', 'OAuth2/JWT', 'Render', 'Figma'],
  },
];

export default function TechnicalStackGrid() {
  return (
    <section
      id="technical-stack"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mb-8">
        <p className="theme-accent font-mono text-xs font-medium uppercase tracking-[0.24em]">
          {'Technical Stack'}
        </p>
        <h2 className="theme-text-primary mt-3 text-3xl font-black tracking-tighter sm:text-4xl">
          Tools I build with
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stackGroups.map((group) => (
          <div
            key={group.title}
            className="theme-border theme-surface rounded-2xl border-[1.5px] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_24px_rgba(37,99,235,0.1)]"
          >
            <h3 className="theme-text-secondary mb-4 text-sm font-semibold uppercase tracking-[0.28em]">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="theme-border theme-surface-chip theme-text-secondary theme-hover-accent rounded-full border px-2.5 py-1.5 font-mono text-[10px] font-medium transition-all duration-300 hover:-translate-y-1 hover:border-sky-400"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
