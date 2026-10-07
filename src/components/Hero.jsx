'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowDownToLine, Mail, UserRound } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

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
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/edwardwibo',
    variant: 'secondary',
    icon: FaLinkedin,
  },
  {
    label: 'Email',
    href: 'mailto:edwardwibo270@gmail.com',
    variant: 'secondary',
    icon: Mail,
  },
];

export default function Hero() {
  const [hasPortrait, setHasPortrait] = useState(false);

  return (
    <section
      id="top"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-8"
    >
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border-2 border-neutral-800 bg-white/5 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-200 shadow-[0_0_24px_rgba(148,163,184,0.12)]">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
        BINUS UNIVERSITY • GPA 3.97 / 4.00 • Computer Science Undergraduate
      </div>

      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_12rem]">
        <div>
          <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.065em] text-white sm:text-6xl lg:text-7xl">
            Edward Wibowo
          </h1>
          <p className="mt-4 max-w-3xl text-xl font-semibold leading-snug tracking-[-0.03em] text-slate-300 sm:text-2xl">
            Software Engineer <span className="text-indigo-300">&amp;</span> Machine Learning Developer
          </p>
        </div>

        <div
          aria-label="Profile picture placeholder. Add a portrait at public/profile.jpg."
          className="relative mx-auto flex h-48 w-40 flex-col items-center justify-center overflow-hidden border-2 border-indigo-300/40 bg-gradient-to-b from-indigo-400/20 via-slate-900/80 to-sky-400/10 text-indigo-100 shadow-[0_0_40px_rgba(99,102,241,0.16)] [border-radius:1rem_1rem_50%_50%/1rem_1rem_16%_16%] md:mx-0 md:h-56 md:w-44"
        >
          <Image
            src="/profile.jpg"
            alt="Edward Wibowo"
            fill
            sizes="(min-width: 768px) 176px, 160px"
            className={`object-cover transition-opacity duration-300 ${hasPortrait ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setHasPortrait(true)}
          />
          <div className="absolute inset-2 border border-white/10 [border-radius:0.7rem_0.7rem_50%_50%/0.7rem_0.7rem_16%_16%]" />
          {!hasPortrait && (
            <>
              <UserRound aria-hidden="true" className="relative h-12 w-12 opacity-70" strokeWidth={1.2} />
              <span className="relative mt-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300">
                Add portrait
              </span>
              <span className="relative mt-1 font-mono text-[9px] text-slate-500">
                public/profile.jpg
              </span>
            </>
          )}
        </div>
      </div>

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-10">
        <div>
          <div className="max-w-3xl space-y-5 text-base leading-8 text-slate-300 sm:text-lg">
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
                  <Icon aria-hidden="true" size={16} />
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
