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
      <div className="theme-border mb-8 border-b pb-5">
        <p className="theme-accent font-mono text-xs font-medium uppercase tracking-[0.24em]">
          {'About & Core Focus'}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-12">
        <div className="theme-text-secondary max-w-3xl space-y-4 text-sm leading-7 sm:text-base">
          <p>
            Hi, I&apos;m Edward Wibowo.
          </p>
          <p>
            I&apos;m a Computer Science student at BINUS University focused on building intelligent
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
              className="theme-border theme-surface-chip rounded-2xl border-[1.5px] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_24px_rgba(37,99,235,0.1)]"
            >
              <h3 className="theme-accent font-mono text-[10px] uppercase tracking-[0.2em]">
                {area.label}
              </h3>
              <p className="theme-text-primary mt-2 text-sm font-semibold leading-6">{area.value}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
