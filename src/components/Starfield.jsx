import { useMemo } from 'react'

export default function Starfield({ count = 130 }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 4,
        duration: 2 + Math.random() * 3,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white star-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: `0 0 ${s.size * 3}px rgba(255,255,255,0.9)`,
          }}
        />
      ))}
    </div>
  )
}