'use client';

import { ArrowDownToLine, ArrowUpRight, Globe, Mail } from 'lucide-react';

const actionLinks = [
  {
    label: 'Download Resume PDF',
    href: '/EdwardWibowo_Resume.pdf',
    variant: 'primary',
    icon: ArrowDownToLine,
    download: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/kxi-27o7',
    variant: 'secondary',
    icon: Globe,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/edwardwibo',
    variant: 'secondary',
    icon: ArrowUpRight,
  },
  {
    label: 'Email',
    href: 'mailto:edwardwibo270@gmail.com',
    variant: 'secondary',
    icon: Mail,
  },
];

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-22 pt-18 sm:px-6 lg:px-8">
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-neutral-800 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-200 shadow-[0_0_24px_rgba(148,163,184,0.12)]">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
        BINUS UNIVERSITY • GPA 3.97 / 4.00 • Computer Science Undergraduate
      </div>

      <div className="grid items-start gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
            Edward Wibowo — Software Engineer &amp; Machine Learning Developer
          </h1>

          <div className="mt-8 max-w-3xl space-y-5 text-lg leading-8 text-slate-300">
            <p className="font-semibold text-white">Hi, I’m Edward Wibowo.</p>
            <p>
              I’m a Computer Science student at BINUS University focused on building
              intelligent systems to solve real-world problems. I work across both
              traditional Machine Learning and Deep Learning—engineering models that
              draw insights from complex data and solve practical challenges.
            </p>
            <p>
              Beyond AI development, I architect the full-stack software needed to bring
              models into production. Whether crafting responsive frontends, designing
              secure backend APIs, or training intelligent pipelines, I enjoy turning
              complex technical problems into clean, reliable software.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {actionLinks.map(({ label, href, variant, icon: Icon, download }) => {
              const isPrimary = variant === 'primary';
              return (
                <a
                  key={label}
                  href={href}
                  download={download ? true : undefined}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={[
                    'inline-flex items-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1',
                    isPrimary
                      ? 'border-transparent bg-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:bg-slate-200'
                      : 'border-neutral-700 bg-slate-950/60 text-slate-100 hover:border-[var(--accent-color)] hover:text-white hover:shadow-[0_0_20px_var(--glow-color)]',
                  ].join(' ')}
                >
                  <Icon size={16} />
                  {label}
                </a>
              );
            })}
          </div>
        </div>

        <aside className="rounded-2xl border-2 border-neutral-800 bg-slate-950/70 p-6 shadow-[0_0_35px_rgba(99,102,241,0.08)] backdrop-blur-sm">
          <div className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-slate-400">
            Focus
          </div>
          <div className="space-y-3 text-sm text-slate-200">
            <div className="rounded-xl border border-neutral-800 bg-slate-900/80 p-3">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">
                AI Engineering
              </span>
              <span className="mt-2 block text-base font-semibold text-white">
                ML + Deep Learning systems
              </span>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-slate-900/80 p-3">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">
                Product Delivery
              </span>
              <span className="mt-2 block text-base font-semibold text-white">
                Full-stack product architecture
              </span>
            </div>
            <div className="rounded-xl border border-neutral-800 bg-slate-900/80 p-3">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">
                Research Mindset
              </span>
              <span className="mt-2 block text-base font-semibold text-white">
                Robust, explainable, deployable solutions
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
