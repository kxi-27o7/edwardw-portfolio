import { ArrowUp } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-5 border-t border-white/10 px-4 py-8 font-mono text-[10px] text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-xs lg:px-8">
      <p>© 2026 Edward Wibowo. Built with Next.js, Tailwind CSS &amp; Vercel.</p>
      <div className="flex flex-wrap items-center gap-5">
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 transition-all duration-300 hover:-translate-y-1 hover:text-white"
        >
          <ArrowUp aria-hidden="true" size={13} />
          SYS.TOP
        </a>
        <a
          href="mailto:edwardwibo270@gmail.com"
          className="transition-all duration-300 hover:-translate-y-1 hover:text-white"
        >
          edwardwibo270@gmail.com
        </a>
      </div>
    </footer>
  );
}
