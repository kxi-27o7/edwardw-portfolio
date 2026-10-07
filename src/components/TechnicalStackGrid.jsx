'use client';

const stackGroups = [
  {
    title: 'Languages',
    items: ['C/C++', 'Python', 'SQL', 'JavaScript', 'HTML/CSS'],
  },
  {
    title: 'Frameworks & Libraries',
    items: ['PyTorch', 'Scikit-Learn', 'OpenCV', 'Flask', 'FastAPI', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Tools & Infra',
    items: ['Git', 'Docker', 'PostgreSQL', 'OAuth2/JWT', 'Render', 'Figma'],
  },
];

export default function TechnicalStackGrid() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-[0.32em] text-slate-400">
          Technical Stack
        </p>
        <h2 className="mt-3 text-3xl font-black tracking-tighter text-white sm:text-4xl">
          Tools I build with
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {stackGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border-2 border-neutral-800 bg-slate-950/70 p-5 shadow-[0_0_20px_rgba(15,23,42,0.55)]"
          >
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-300">
              {group.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-700 bg-slate-900/80 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-100"
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
