import { useEffect, useRef } from 'react'

const COLORS = ['#ff6b9d', '#ffd93d', '#6bcB77', '#4d96ff', '#c780fa', '#ff9f1c']

export default function Fireworks() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let stop = false

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = []

    const burst = (x, y) => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      const count = 70
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.15
        const speed = 1.5 + Math.random() * 4.5
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
          size: 1.5 + Math.random() * 2,
        })
      }
    }

    const loop = () => {
      if (stop) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'lighter'

      if (Math.random() < 0.025) {
        burst(Math.random() * canvas.width, Math.random() * canvas.height * 0.6)
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.045
        p.vx *= 0.99
        p.vy *= 0.99
        p.life -= 0.011

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.shadowBlur = 10
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      raf = requestAnimationFrame(loop)
    }

    // انفجارهای اولیه
    setTimeout(() => burst(canvas.width / 2, canvas.height * 0.35), 200)
    setTimeout(() => burst(canvas.width * 0.25, canvas.height * 0.28), 500)
    setTimeout(() => burst(canvas.width * 0.75, canvas.height * 0.30), 800)

    loop()

    return () => {
      stop = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}