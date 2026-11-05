import { useMemo } from 'react'
import { motion } from 'framer-motion'

const palette = [
  ['#ff6b9d', '#ffb3cd'],
  ['#ffd93d', '#fff2a8'],
  ['#c780fa', '#e6c5ff'],
  ['#4d96ff', '#a8c9ff'],
  ['#6bcB77', '#b8e8bf'],
]

export default function Balloons({ count = 9 }) {
  const balloons = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        delay: Math.random() * 10,
        duration: 14 + Math.random() * 10,
        size: 28 + Math.random() * 26,
        color: palette[i % palette.length],
        sway: 25 + Math.random() * 25,
      })),
    [count],
  )

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.left}%`, bottom: 0 }}
          initial={{ y: '110vh' }}
          animate={{ y: '-30vh' }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            animate={{ x: [0, b.sway, -b.sway, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
            style={{ width: b.size, height: b.size * 1.2 }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle at 30% 25%, ${b.color[1]}, ${b.color[0]})`,
                boxShadow: `0 0 25px ${b.color[0]}88`,
              }}
            />
            <div
              className="absolute left-1/2 top-full w-px h-20 bg-white/25"
              style={{ transform: 'translateX(-50%)' }}
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}