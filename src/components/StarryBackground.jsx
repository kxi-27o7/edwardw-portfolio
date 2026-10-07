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
      value: 90,
      density: { enable: true, area: 1200 },
    },
    color: { value: ['#E2E8F0', '#C4B5FD', '#BAE6FD'] },
    opacity: { value: { min: 0.2, max: 0.65 }, animation: { enable: true, speed: 0.35, minimumValue: 0.15 } },
    size: { value: { min: 1, max: 2.5 } },
    move: {
      enable: true,
      speed: 0.2,
      direction: 'none',
      random: true,
      straight: false,
      outModes: { default: 'out' },
    },
    links: { enable: false },
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
    </ParticlesProvider>
  );
}
