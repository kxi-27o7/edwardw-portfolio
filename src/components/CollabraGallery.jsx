'use client';

import Image from 'next/image';
import { useState } from 'react';

const screenshots = [
  {
    src: '/projects/collabra/screenshots/landing_page.png',
    label: 'Landing page',
    alt: 'Collabra landing page introducing the project collaboration workspace.',
  },
  {
    src: '/projects/collabra/screenshots/create_project_page1.png',
    label: 'Create project · 1',
    alt: 'Collabra project creation form, first step.',
  },
  {
    src: '/projects/collabra/screenshots/create_project_page2.png',
    label: 'Create project · 2',
    alt: 'Collabra project creation form, second step.',
  },
  {
    src: '/projects/collabra/screenshots/join_project_page.png',
    label: 'Join project',
    alt: 'Collabra screen for joining a project.',
  },
  {
    src: '/projects/collabra/screenshots/manage_team_page.png',
    label: 'Manage team',
    alt: 'Collabra project team management screen.',
  },
  {
    src: '/projects/collabra/screenshots/update_taskprogress_page.png',
    label: 'Task progress',
    alt: 'Collabra task progress update screen.',
  },
  {
    src: '/projects/collabra/screenshots/files_tab.png',
    label: 'Project files',
    alt: 'Collabra project files tab.',
  },
];

export default function CollabraGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeScreenshot = screenshots[activeIndex];

  return (
    <section aria-labelledby="collabra-gallery-title" className="mt-12">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="collabra-gallery-title" className="theme-text-primary text-2xl font-bold tracking-[-0.03em]">
            Product walkthrough
          </h2>
          <p className="theme-text-secondary mt-2 text-sm leading-6">
            A selection of screens from project setup through team collaboration.
          </p>
        </div>
        <p className="theme-muted font-mono text-xs">
          {activeIndex + 1} / {screenshots.length}
        </p>
      </div>

      <div
        role="group"
        aria-label="Choose a Collabra screenshot"
        className="mt-4 flex flex-wrap gap-2"
      >
        {screenshots.map((screenshot, index) => (
          <button
            key={screenshot.src}
            type="button"
            aria-pressed={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              index === activeIndex
                ? 'theme-button'
                : 'theme-border theme-text-secondary border hover:text-[var(--text-primary)]'
            }`}
          >
            {screenshot.label}
          </button>
        ))}
      </div>

      <figure className="theme-border theme-surface mt-5 overflow-hidden rounded-2xl border">
        <Image
          src={activeScreenshot.src}
          alt={activeScreenshot.alt}
          width={512}
          height={232}
          priority
          className="h-auto w-full"
        />
        <figcaption className="theme-border theme-text-secondary border-t px-4 py-3 text-sm">
          {activeScreenshot.label}
        </figcaption>
      </figure>
    </section>
  );
}
