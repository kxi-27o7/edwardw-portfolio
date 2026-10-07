const sections = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Technical stack', href: '#technical-stack' },
];

export default function SiteNavigation() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0A0E17]/85 backdrop-blur-xl">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8"
      >
        <a
          href="#top"
          className="shrink-0 text-sm font-bold tracking-wide text-white transition-colors hover:text-indigo-200"
        >
          EW<span className="text-indigo-300">.</span>
        </a>
        <div className="flex items-center gap-1 sm:gap-2">
          {sections.map((section) => (
            <a
              key={section.href}
              href={section.href}
              className="rounded-lg px-2.5 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:bg-white/5 hover:text-white sm:px-3 sm:text-sm"
            >
              {section.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
