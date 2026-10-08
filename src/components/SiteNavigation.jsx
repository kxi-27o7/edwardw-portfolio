import { ArrowUpRight } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';

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
  return (
    <header className="fixed left-1/2 top-6 z-50 w-[90%] max-w-5xl -translate-x-1/2">
      <nav
        aria-label="Main navigation"
        className="flex items-center justify-between gap-2 rounded-full border border-white/10 bg-[#05070C]/70 px-3 py-2.5 shadow-[0_0_25px_rgba(99,102,241,0.12)] backdrop-blur-md sm:gap-4 sm:px-5"
      >
        <a
          href="#top"
          className="shrink-0 font-mono text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:text-indigo-200 sm:text-base"
        >
          EdW<span className="text-indigo-300">.</span>
        </a>

        <div className="flex items-center gap-0.5 sm:gap-2">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="rounded-lg px-1.5 py-2 font-mono text-[9px] font-medium text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:text-white sm:px-2.5 sm:text-xs"
            >
              <span className="text-indigo-300">{section.number}</span>{' '}
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
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300/50 hover:text-white hover:shadow-[0_0_14px_rgba(99,102,241,0.2)]"
              >
                <Icon aria-hidden="true" size={14} />
              </a>
            ))}
          </div>
          <a
            href="/EdwardWibowo_Resume.pdf"
            download
            className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 font-mono text-[9px] font-bold text-slate-950 transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-100 sm:gap-1.5 sm:px-3.5 sm:text-[10px]"
          >
            Resume.pdf
            <ArrowUpRight aria-hidden="true" size={12} />
          </a>
        </div>
      </nav>
    </header>
  );
}
