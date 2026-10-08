'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

const actionLinks = [
  {
    label: 'Download Resume.pdf',
    href: '/EdwardWibowo_Resume.pdf',
    icon: ArrowDownToLine,
    download: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/kxi-27o7',
    icon: FaGithub,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/edwardwibo',
    icon: FaLinkedin,
  },
  {
    label: 'Email',
    href: 'mailto:edwardwibo270@gmail.com',
    icon: Mail,
  },
];

export default function Hero() {
  const [hasPortrait, setHasPortrait] = useState(false);
  const [portraitFailed, setPortraitFailed] = useState(false);

  return (
    <section
      id="top"
      className="relative mx-auto max-w-6xl scroll-mt-24 px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8"
    >

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
        <div className="min-w-0">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-indigo-300">
            BINUS UNIVERSITY <span className="text-indigo-300">•</span> GPA 3.97 / 4.00  
            <span className="text-indigo-300">•</span> Computer Science Undergraduate
          </p>
          <h1 className="text-4xl font-black leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            Edward Wibowo
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-semibold leading-snug tracking-[-0.03em] text-slate-200 sm:text-2xl">
            Building intelligent systems for real-world impact.
          </p>
          <p className="mt-2 text-sm font-medium text-indigo-300 sm:text-lg">
            Software Engineer &amp; Machine Learning Developer
          </p>

          <div className="mt-7 max-w-2xl overflow-hidden rounded-2xl border-[1.5px] border-white/10 bg-[#080B12]/85 shadow-[0_0_35px_rgba(99,102,241,0.10)] backdrop-blur-sm">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-rose-400/80" />
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-300/80" />
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-300/80" />
              <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                identity.json
              </span>
            </div>
            <pre
              aria-label="Developer identity in JSON format"
              className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 sm:px-6 sm:text-sm"
            >
              <code>
                <span className="text-slate-500">{'{'}</span>
                {'\n  '}
                <span className="text-sky-300">&quot;developer&quot;</span>
                <span className="text-slate-400">: </span>
                <span className="text-emerald-300">&quot;Edward Wibowo&quot;</span>
                <span className="text-slate-400">,</span>
                {'\n  '}
                <span className="text-sky-300">&quot;role&quot;</span>
                <span className="text-slate-400">: </span>
                <span className="text-emerald-300">
                  &quot;Software Engineer &amp; Machine Learning Developer&quot;
                </span>
                <span className="text-slate-400">,</span>
                {'\n  '}
                <span className="text-sky-300">&quot;location&quot;</span>
                <span className="text-slate-400">: </span>
                <span className="text-emerald-300">&quot;Jakarta, ID&quot;</span>
                <span className="text-slate-400">,</span>
                {'\n'}
                <span className="text-slate-500">{'}'}</span>
              </code>
            </pre>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {actionLinks.map(({ label, href, icon: Icon, download }) => (
              <a
                key={label}
                href={href}
                download={download ? true : undefined}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={[
                  'inline-flex items-center gap-2 rounded-xl border-[1.5px] px-3.5 py-2.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-1 sm:text-sm',
                  download
                    ? 'border-transparent bg-white text-slate-950 shadow-[0_0_30px_rgba(255,255,255,0.18)] hover:bg-slate-200'
                    : 'border-white/10 bg-white/[0.04] text-slate-100 hover:border-indigo-300/60 hover:bg-indigo-400/10 hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.18)]',
                ].join(' ')}
              >
                <Icon aria-hidden="true" size={15} />
                {label}
                {href.startsWith('http') && <ArrowUpRight aria-hidden="true" size={13} />}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[17rem]">
          <div
            aria-label={portraitFailed ? 'Profile portrait unavailable' : 'Profile portrait'}
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-[1.5px] border-indigo-300/40 bg-gradient-to-b from-indigo-400/20 via-slate-900/80 to-sky-400/10 text-indigo-100 shadow-[0_0_45px_rgba(99,102,241,0.18)]"
          >
            {!portraitFailed && (
              <Image
                src="/profile.jpg"
                alt="Edward Wibowo"
                fill
                priority
                sizes="(min-width: 1024px) 272px, (min-width: 640px) 272px, 70vw"
                className={`object-cover transition-opacity duration-300 ${hasPortrait ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setHasPortrait(true)}
                onError={() => setPortraitFailed(true)}
              />
            )}
            {!hasPortrait && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl text-indigo-100/70">EW</span>
                <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-300">
                  {portraitFailed ? 'Portrait unavailable' : 'Loading portrait'}
                </span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-white/15" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.5rem] border border-indigo-300/15 blur-[1px]"
          />
        </div>
      </div>

      <div aria-hidden="true" className="hero-warp-lines">
        <span className="hero-warp-line hero-warp-line--long" />
        <span className="hero-warp-line hero-warp-line--medium" />
        <span className="hero-warp-line hero-warp-line--short" />
      </div>
    </section>
  );
}
