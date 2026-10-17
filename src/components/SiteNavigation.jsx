'use client';

import { ArrowUpRight, Moon, Sun } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { useEffect } from 'react';

const sections = [
  { number: '01.', label: 'Projects', href: '#projects' },
  { number: '02.', label: 'Experience', href: '#experience' },
  { number: '03.', label: 'Stack', href: '#technical-stack' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/kxi-27o7', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/edwardwibo', icon: FaLinkedin },
];

export default function SiteNavigation() {
  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';
  }, []);

  function toggleTheme() {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem('portfolio-theme', nextTheme);
  }

  return (
    <>
      <header className="fixed left-1/2 top-6 z-50 w-[90%] max-w-5xl -translate-x-1/2">
        <nav
          aria-label="Main navigation"
          className="theme-nav theme-border flex items-center justify-between gap-2 rounded-full border px-3 py-2.5 shadow-[0_0_25px_rgba(37,99,235,0.12)] backdrop-blur-md sm:gap-4 sm:px-5"
        >
          <a
            href="#top"
            className="theme-text-primary theme-hover-accent shrink-0 font-mono text-sm font-bold tracking-wide transition-all duration-300 hover:-translate-y-1 sm:text-base"
          >
            EdW<span className="theme-accent">.</span>
          </a>

          <div className="flex items-center gap-0.5 sm:gap-2">
            {sections.map((section) => (
              <a
                key={section.href}
                href={section.href}
                className="theme-text-secondary theme-hover-accent rounded-lg px-1.5 py-2 font-mono text-[9px] font-medium transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 sm:px-2.5 sm:text-xs"
              >
                <span className="theme-accent">{section.number}</span>{' '}
                <span className="hidden sm:inline">{section.label}</span>
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <div className="hidden items-center gap-1 sm:flex">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="theme-text-secondary theme-border theme-hover-accent inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_0_14px_rgba(37,99,235,0.2)]"
                >
                  <Icon aria-hidden="true" size={14} />
                </a>
              ))}
            </div>
            <a
              href="/EdwardWibowo_Resume.pdf"
              download
              className="theme-button inline-flex items-center gap-1 rounded-full px-3 py-2 font-mono text-[9px] font-bold transition-all duration-300 hover:-translate-y-1 hover:opacity-85 sm:gap-1.5 sm:px-3.5 sm:text-[10px]"
            >
              Resume.pdf
              <ArrowUpRight aria-hidden="true" size={12} />
            </a>
          </div>
        </nav>
      </header>
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        title="Toggle color theme"
        className="theme-nav theme-border theme-text-secondary theme-hover-accent fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2 rounded-full border px-4 py-3 font-mono text-xs font-semibold shadow-[0_4px_24px_rgba(15,23,42,0.2)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-400 sm:bottom-7 sm:right-7"
      >
        <Moon aria-hidden="true" className="theme-toggle-moon" size={16} />
        <Sun aria-hidden="true" className="theme-toggle-sun" size={16} />
        <span className="theme-toggle-dark-label">Dark mode</span>
        <span className="theme-toggle-light-label">Light mode</span>
      </button>
    </>
  );
}
