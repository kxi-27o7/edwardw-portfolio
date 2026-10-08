const focusAreas = [
  { label: 'AI Engineering', value: 'ML + Deep Learning Systems' },
  { label: 'Product Delivery', value: 'Full-stack Product Architecture' },
  { label: 'Research Mindset', value: 'Robust, explainable, deployable solutions' },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mb-8 border-b border-white/10 pb-5">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.24em] text-indigo-300">
          {'About & Core Focus'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-12">
        <div className="max-w-3xl space-y-4 text-sm leading-7 text-slate-300 sm:text-base">
          <p>
            Hi, I'm Edward Wibowo.
          </p>
          <p>
            I'm a Computer Science student at BINUS University focused on building intelligent
            systems to solve real-world problems. I work across both traditional Machine
            Learning and Deep Learning, engineering models that draw insights from complex
            data and solve practical challenges.
          </p>
          <p>
            Beyond AI development, I architect the full-stack software needed to bring
            models into production. Whether crafting responsive frontends, designing
            secure backend APIs, or training intelligent pipelines, I enjoy turning
            complex technical problems into clean, reliable software.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {focusAreas.map((area) => (
            <article
              key={area.label}
              className="rounded-2xl border-[1.5px] border-white/10 bg-white/[0.035] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/35 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)]"
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-indigo-200">
                {area.label}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-white">{area.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
