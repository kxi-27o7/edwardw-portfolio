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

      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-10">
        <div className="min-w-0">
          <p className="theme-accent mb-4 font-mono text-xs uppercase tracking-[0.24em] lg:whitespace-nowrap lg:text-[10px] lg:tracking-[0.12em]">
            BINUS UNIVERSITY <span>•</span> GPA 3.97 / 4.00
            <span>•</span> Computer Science Undergraduate
          </p>
          <h1 className="theme-text-primary text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
            Edward Wibowo
          </h1>
          <p className="theme-text-secondary mt-5 max-w-3xl text-lg font-semibold leading-snug tracking-[-0.03em] sm:text-2xl">
            Building intelligent systems for real-world impact.
          </p>
          <p className="theme-accent mt-2 text-sm font-medium sm:text-lg">
            Software Engineer &amp; Machine Learning Developer
          </p>

          <div className="theme-surface-raised theme-border mt-7 max-w-2xl overflow-hidden rounded-2xl border-[1.5px] shadow-[0_0_35px_rgba(37,99,235,0.10)] backdrop-blur-sm sm:max-w-xl">
            <div className="theme-border flex items-center gap-2 border-b px-4 py-3">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-rose-400/80" />
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-300/80" />
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-300/80" />
              <span className="theme-muted ml-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                identity.json
              </span>
            </div>
            <pre
              aria-label="Developer identity in JSON format"
              className="overflow-x-auto px-4 py-4 font-mono text-xs leading-6 sm:px-6 sm:text-sm"
            >
              <code>
                <span className="theme-muted">{'{'}</span>
                {'\n  '}
                <span className="theme-code-key">&quot;developer&quot;</span>
                <span className="theme-code-punctuation">: </span>
                <span className="theme-code-value">&quot;Edward Wibowo&quot;</span>
                <span className="theme-code-punctuation">,</span>
                {'\n  '}
                <span className="theme-code-key">&quot;role&quot;</span>
                <span className="theme-code-punctuation">: </span>
                <span className="theme-code-value">
                  &quot;Software Engineer &amp; Machine Learning Developer&quot;
                </span>
                <span className="theme-code-punctuation">,</span>
                {'\n  '}
                <span className="theme-code-key">&quot;location&quot;</span>
                <span className="theme-code-punctuation">: </span>
                <span className="theme-code-value">&quot;Jakarta, ID&quot;</span>
                <span className="theme-code-punctuation">,</span>
                {'\n'}
                <span className="theme-muted">{'}'}</span>
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
                    ? 'theme-button border-transparent shadow-[0_0_30px_rgba(37,99,235,0.18)] hover:opacity-85'
                    : 'theme-border theme-surface-chip theme-text-secondary theme-hover-accent border hover:border-sky-400 hover:shadow-[0_0_20px_rgba(37,99,235,0.18)]',
                ].join(' ')}
              >
                <Icon aria-hidden="true" size={15} />
                {label}
                {href.startsWith('http') && <ArrowUpRight aria-hidden="true" size={13} />}
              </a>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[12.5rem] sm:max-w-[14rem] lg:flex lg:flex-col lg:self-stretch lg:items-center lg:justify-center lg:justify-self-end lg:-translate-x-16">
          <Image
            src="/thinking-line-art.png"
            alt=""
            aria-hidden="true"
            width={400}
            height={690}
            loading="eager"
            className="thinking-line-art pointer-events-none absolute -right-24 -bottom-5 z-0 h-auto w-[11.5rem] opacity-40 sm:-top-12 sm:w-[12.5rem] lg:-right-44 lg:top-auto lg:-bottom-12 lg:w-[22rem] lg:max-w-none lg:-translate-x-8"
          />
          <div
            aria-label={portraitFailed ? 'Profile portrait unavailable' : 'Profile portrait'}
            className="theme-border theme-surface relative z-10 aspect-[4/5] w-full translate-y-3 -translate-x-20 overflow-hidden rounded-[2rem] border-[1.5px] bg-gradient-to-b from-sky-400/20 via-slate-900/10 to-cyan-400/10 text-sky-700 shadow-[0_0_45px_rgba(37,99,235,0.18)] sm:translate-y-5"
          >
            {!portraitFailed && (
              <Image
                src="/profile.jpg"
                alt="Edward Wibowo"
                fill
                priority
                sizes="(min-width: 1024px) 224px, (min-width: 640px) 224px, 200px"
                className={`object-cover transition-opacity duration-300 ${hasPortrait ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setHasPortrait(true)}
                onError={() => setPortraitFailed(true)}
              />
            )}
            {!hasPortrait && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl text-sky-600/70">E.W.</span>
                <span className="theme-text-secondary mt-2 font-mono text-[10px] uppercase tracking-[0.2em]">
                  {portraitFailed ? 'Portrait unavailable' : 'Loading portrait'}
                </span>
              </div>
            )}
            <div className="theme-border pointer-events-none absolute inset-3 rounded-[1.5rem] border" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 -z-10 rounded-[2.5rem] border border-sky-400/20 blur-[1px]"
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
