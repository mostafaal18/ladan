import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Music, VolumeX } from 'lucide-react'
import Starfield from './components/Starfield'
import Balloons from './components/Balloons'
import GiftBox from './components/GiftBox'
import Cake from './components/Cake'
import Finale from './components/Finale'

export default function App() {
  const [stage, setStage] = useState('gift')     // gift | cake | finale
  const [muted, setMuted] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const audioRef = useRef(null)

  // تلاش اولیه برای پخش
  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0.35
    a.play().then(() => setAudioReady(true)).catch(() => {})
  }, [])

  const startMusic = () => {
    const a = audioRef.current
    if (!a) return
    a.muted = false
    setMuted(false)
    a.play().then(() => setAudioReady(true)).catch(() => {})
  }

  const toggleMute = () => {
    const a = audioRef.current
    if (!a) return
    a.muted = !a.muted
    setMuted(a.muted)
    if (!a.paused && !a.muted) setAudioReady(true)
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-b from-[#05010f] via-[#1a0b2e] to-[#0a0118] text-white">
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      <Starfield />
      <Balloons />

      {/* دکمه‌ی صدا */}
      <button
        onClick={toggleMute}
        className="absolute top-4 left-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
        aria-label="صدا"
      >
        {muted ? <VolumeX className="w-5 h-5 text-white/70" /> : <Music className="w-5 h-5 text-pink-300" />}
      </button>

      {/* دکمه‌ی شروع موسیقی (اگه autoplay بلاک شد) */}
      {!audioReady && (
        <button
          onClick={startMusic}
          className="absolute bottom-4 right-4 z-50 px-4 py-2 rounded-full bg-pink-500/80 backdrop-blur border border-pink-300/40 text-sm font-bold hover:bg-pink-500 transition animate-pulse"
        >
          🎵 پخش موسیقی
        </button>
      )}

      {/* مراحل */}
      <div className="relative z-20 h-full flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          {stage === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ scale: 0, opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
            >
              <GiftBox onOpen={() => { startMusic(); setStage('cake') }} />
            </motion.div>
          )}

          {stage === 'cake' && (
            <motion.div
              key="cake"
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.4, opacity: 0, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 80, damping: 14 }}
            >
              <Cake onComplete={() => setStage('finale')} />
            </motion.div>
          )}

          {stage === 'finale' && (
            <motion.div
              key="finale"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="w-full"
            >
              <Finale />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}