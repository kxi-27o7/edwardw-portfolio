'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowDownToLine, Mail } from 'lucide-react';
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

const focusAreas = [
  { label: 'AI Engineering', value: 'ML + Deep Learning systems' },
  { label: 'Product Delivery', value: 'Full-stack product architecture' },
  { label: 'Research Mindset', value: 'Robust, explainable, deployable solutions' },
];

export default function Hero() {
  const [hasPortrait, setHasPortrait] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section
      id="top"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-4 pt-6 sm:px-6 sm:pb-6 sm:pt-14 lg:px-8"
    >
      <div className="mb-5 flex w-fit max-w-full flex-wrap items-center gap-2 rounded-full border-2 border-neutral-800 bg-white/5 px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.22em] text-slate-200 shadow-[0_0_24px_rgba(148,163,184,0.12)] sm:text-[10px]">
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
        BINUS UNIVERSITY • GPA 3.97 / 4.00 • Computer Science Undergraduate
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_8.5rem] items-center gap-x-3 gap-y-6 sm:grid-cols-[minmax(0,1fr)_11rem] sm:gap-x-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-stretch lg:gap-x-8">
        <div className="contents lg:flex lg:min-w-0 lg:flex-col">
          <div className="col-start-1 row-start-1 min-w-0">
            <h1 className="text-3xl font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
              Edward Wibowo
            </h1>
            <p className="mt-3 max-w-3xl text-base font-semibold leading-snug tracking-[-0.03em] text-slate-300 sm:text-xl">
              <span className="block sm:inline">Software Engineer</span>{' '}
              <span className="block text-indigo-300 sm:inline">&amp; Machine Learning</span>{' '}
              <span className="block sm:inline">Developer</span>
            </p>
          </div>

          <div className="col-span-2 row-start-2 min-w-0 lg:mt-14 lg:flex lg:flex-1 lg:flex-col">
            <div className="max-w-2xl space-y-2.5 text-[13px] leading-5 text-slate-300 sm:text-sm sm:leading-6">
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

            <div className="mt-4 flex flex-wrap items-center gap-2 lg:mt-auto lg:pt-4">
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
                      'inline-flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-1 sm:text-sm',
                      isPrimary
                        ? 'border-transparent bg-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:bg-slate-200'
                        : 'border-neutral-700 bg-slate-950/60 text-slate-100 hover:border-[var(--accent-color)] hover:text-white hover:shadow-[0_0_20px_var(--glow-color)]',
                    ].join(' ')}
                  >
                    <Icon aria-hidden="true" size={15} />
                    {label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-5">
          <div
            aria-label="Profile picture placeholder. Add a portrait at public/profile.jpg."
            className="relative col-start-2 row-start-1 flex h-44 w-full lg:w-[15rem] lg:self-center -translate-y-1 flex-col items-center justify-center overflow-hidden border-2 border-indigo-300/40 bg-gradient-to-b from-indigo-400/20 via-slate-900/80 to-sky-400/10 text-indigo-100 shadow-[0_0_40px_rgba(99,102,241,0.16)] [border-radius:1rem_1rem_50%_50%/1rem_1rem_16%_16%] sm:h-56 sm:-translate-y-2 lg:h-60 lg:-translate-y-8"
          >
            {!portraitFailed && (
              <Image
                src="/profile.jpg"
                alt="Edward Wibowo"
                fill
                sizes="(min-width: 1024px) 352px, (min-width: 640px) 176px, 136px"
                className={`object-cover transition-opacity duration-300 ${hasPortrait ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setHasPortrait(true)}
                onError={() => setPortraitFailed(true)}
              />
            )}
            <div className="absolute inset-2 border border-white/10 [border-radius:0.7rem_0.7rem_50%_50%/0.7rem_0.7rem_16%_16%]" />
            {!hasPortrait && (
              <>
                <span className="relative text-3xl text-indigo-100/70 sm:text-4xl">EW</span>
                <span className="relative mt-2 text-center text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-300 sm:text-[10px] sm:tracking-[0.24em]">
                  {portraitFailed ? 'Add portrait' : 'Profile'}
                </span>
                {!portraitFailed && (
                  <span className="relative mt-1 hidden font-mono text-[9px] text-slate-500 sm:block">
                    public/profile.jpg
                  </span>
                )}
              </>
            )}
          </div>

        <aside className="col-span-2 row-start-3 rounded-2xl border-2 border-neutral-800 bg-slate-950/80 p-3.5 shadow-[0_0_35px_rgba(99,102,241,0.08)] backdrop-blur-sm sm:p-4">
          <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.28em] text-slate-400">
            Focus
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {focusAreas.map((area, index) => (
              <div
                key={area.label}
                className={`rounded-xl border border-neutral-800 bg-slate-900/80 px-3 py-2 ${
                  index === focusAreas.length - 1 ? 'sm:col-span-2' : ''
                }`}
              >
                <span className="block text-[9px] uppercase tracking-[0.2em] text-slate-400">
                  {area.label}
                </span>
                <span className="mt-1 block text-xs font-semibold leading-5 text-white">
                  {area.value}
                </span>
              </div>
            ))}
          </div>
        </aside>
        </div>
      </div>
    </section>
  );
}
