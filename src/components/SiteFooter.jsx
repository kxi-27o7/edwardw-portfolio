import { ArrowUp } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="theme-border theme-muted mx-auto flex max-w-6xl flex-col gap-5 border-t px-4 py-8 font-mono text-[10px] sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-xs lg:px-8">
      <p>© 2026 Edward Wibowo. Built with Next.js, Tailwind CSS &amp; Vercel.</p>
      <div className="flex flex-wrap items-center gap-5">
        <a
          href="#top"
          className="theme-text-secondary theme-hover-accent inline-flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-1"
        >
          <ArrowUp aria-hidden="true" size={13} />
          SYS.TOP
        </a>
        <a
          href="mailto:edwardwibo270@gmail.com"
          className="theme-text-secondary theme-hover-accent transition-all duration-300 hover:-translate-y-1"
        >
          edwardwibo270@gmail.com
        </a>
      </div>
    </footer>
  );
}
