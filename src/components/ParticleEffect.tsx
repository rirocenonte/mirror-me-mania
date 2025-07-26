import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

interface ParticleEffectProps {
  active: boolean;
  x: number;
  y: number;
  color: 'blue' | 'pink' | 'gold';
  count?: number;
}

export const ParticleEffect = ({ active, x, y, color, count = 8 }: ParticleEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const colorMap = {
      blue: 'hsl(var(--player-blue))',
      pink: 'hsl(var(--mirror-pink))',
      gold: 'hsl(var(--target-glow))'
    };

    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4 - 1,
      life: 60,
      maxLife: 60,
      color: colorMap[color]
    }));

    setParticles(newParticles);

    const interval = setInterval(() => {
      setParticles(prev => 
        prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1, // gravity
          life: p.life - 1
        })).filter(p => p.life > 0)
      );
    }, 16); // ~60fps

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setParticles([]);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [active, x, y, color, count]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full animate-particle"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 4px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
};