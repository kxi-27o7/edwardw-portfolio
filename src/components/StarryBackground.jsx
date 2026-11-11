'use client';

import { useCallback } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const particleOptions = {
  fullScreen: { enable: false },
  background: { color: 'transparent' },
  fpsLimit: 30,
  particles: {
    number: {
      value: 36,
      density: { enable: true, area: 1400 },
    },
    color: { value: ['#FFFFFF', '#BAE6FD', '#7DD3FC'] },
    opacity: { value: { min: 0.85, max: 1 } },
    size: { value: { min: 1.7, max: 3 } },
    move: { enable: false },
    links: {
      enable: true,
      distance: 150,
      color: '#7DD3FC',
      opacity: 0.3,
      width: 1,
    },
    shape: { type: 'circle' },
  },
  detectRetina: true,
};

export default function StarryBackground() {
  const initializeParticles = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <ParticlesProvider init={initializeParticles}>
      <Particles
        id="starry-background"
        className="pointer-events-none fixed inset-0 z-0"
        options={particleOptions}
      />
      <div className="constellation-map" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <g className="leo-constellation" transform="translate(960 150) scale(.23)">
            <path d="M470 25 580 62" />
            <path d="M470 25 405 180 440 280 560 310 625 430" />
            <path d="M440 280 115 445 0 700 180 570 625 430" />
            <path d="M115 445 180 570" />
            <circle className="leo-star leo-star--bright" cx="580" cy="62" r="8" />
            <circle cx="470" cy="25" r="5" />
            <circle cx="405" cy="180" r="6" />
            <circle className="leo-star leo-star--bright" cx="440" cy="280" r="8" />
            <circle cx="560" cy="310" r="6" />
            <circle className="leo-star leo-star--bright" cx="625" cy="430" r="8" />
            <circle cx="115" cy="445" r="7" />
            <circle cx="180" cy="570" r="6" />
            <circle className="leo-star leo-star--bright" cx="0" cy="700" r="8" />
            <text className="leo-star-label" x="595" y="58">ALGENUBI</text>
            <text className="leo-star-label" x="638" y="428">REGULUS</text>
            <text className="leo-star-label" x="12" y="702">DENEBOLA</text>
            <text className="leo-constellation-label" x="310" y="400">LEO</text>
          </g>
        </svg>
      </div>
      <div className="shooting-stars" aria-hidden="true">
        <span className="shooting-stars__meteor shooting-stars__meteor--one" />
        <span className="shooting-stars__meteor shooting-stars__meteor--two" />
        <span className="shooting-stars__meteor shooting-stars__meteor--three" />
      </div>
    </ParticlesProvider>
  );
}
