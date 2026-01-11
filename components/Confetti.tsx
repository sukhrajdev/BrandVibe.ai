import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
}

export const Confetti: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#a855f7', '#22d3ee', '#f472b6', '#fff'];
    const particleCount = 50;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: 50, // Start from center (percentage)
        y: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={p.id}
          className="absolute rounded-sm animate-confetti-explode"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `rotate(${p.rotation}deg)`,
            // Randomize trajectory via CSS variables usually, but for simplicity here we use inline styles for initial pos
            // and a keyframe animation defined below in a style tag for the explosion effect
            '--tx': `${(Math.random() - 0.5) * 100}vw`,
            '--ty': `${(Math.random() - 1) * 100}vh`,
          } as React.CSSProperties}
        />
      ))}
      <style>{`
        @keyframes confetti-explode {
          0% { opacity: 1; transform: translate(0, 0) rotate(0deg); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) rotate(720deg); }
        }
        .animate-confetti-explode {
          animation: confetti-explode 1.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};