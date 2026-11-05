import { useEffect, useRef } from 'react'

export default function MusicVisualizer({ audioRef }) {
  const canvasRef = useRef()
  const ctxRef = useRef()

  useEffect(() => {
    const audio = audioRef?.current
    if (!audio) return

    const AudioCtx = window.AudioContext || window.webkitAudioContext

    if (!audio.__analyser) {
      try {
        const ctx = new AudioCtx()
        ctxRef.current = ctx
        const source = ctx.createMediaElementSource(audio)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 128
        source.connect(analyser)
        analyser.connect(ctx.destination)
        audio.__analyser = analyser
        audio.__ctx = ctx
      } catch {
        return
      }
    }
    const analyser = audio.__analyser
    const ctx = audio.__ctx
    if (!analyser || !ctx) return

    if (ctx.state === 'suspended') ctx.resume().catch(() => {})

    const canvas = canvasRef.current
    const c = canvas.getContext('2d')

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const data = new Uint8Array(analyser.frequencyBinCount)
    let raf
    const tick = () => {
      analyser.getByteFrequencyData(data)
      c.clearRect(0, 0, canvas.width, canvas.height)
      const bars = 28
      const w = canvas.width / bars
      for (let i = 0; i < bars; i++) {
        const v = (data[i * 2] || 0) / 255
        const h = Math.max(3, v * canvas.height * 0.9)
        const grad = c.createLinearGradient(0, canvas.height - h, 0, canvas.height)
        grad.addColorStop(0, '#ff6b9d')
        grad.addColorStop(0.5, '#c780fa')
        grad.addColorStop(1, '#4d96ff')
        c.fillStyle = grad
        c.beginPath()
        c.roundRect(i * w + w * 0.22, canvas.height - h, w * 0.56, h, 6)
        c.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [audioRef])

  return <canvas ref={canvasRef} className="w-full h-14 opacity-75" />
}