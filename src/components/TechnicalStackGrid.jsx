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
        <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-indigo-300">
          {'Technical Stack'}
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tighter text-white sm:text-4xl">
          Tools I build with
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stackGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border-[1.5px] border-white/10 bg-slate-950/75 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/30 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)]"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1.5 font-mono text-[10px] font-medium text-slate-100 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/40 hover:text-white"
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
