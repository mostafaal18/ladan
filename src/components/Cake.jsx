import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CANDLE_COUNT = 5

function Candle({ lit, onBlow }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* شعله */}
      <AnimatePresence>
        {lit && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
            className="absolute -top-7 pointer-events-none"
          >
            <motion.div
              animate={{
                scaleY: [1, 1.15, 0.9, 1.05, 1],
                scaleX: [1, 0.9, 1.1, 1, 1],
                rotate: [-4, 4, -4],
              }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
              className="w-3.5 h-6"
              style={{
                borderRadius: '50% 50% 50% 50% / 65% 65% 35% 35%',
                background:
                  'radial-gradient(ellipse at 50% 75%, #ffffff 0%, #ffd93d 30%, #ff8c00 70%, transparent 100%)',
                boxShadow: '0 0 18px #ffb300, 0 0 30px #ffb30088',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* بدنه شمع */}
      <button
        onClick={onBlow}
        disabled={!lit}
        className="relative cursor-pointer group"
        aria-label={lit ? 'فوت کن' : 'خاموش'}
      >
        <div className="w-2 h-9 md:h-11 rounded-sm bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 shadow-md" />
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-1.5 bg-slate-900 rounded" />
        {lit && (
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition">
            فوت کن 💨
          </span>
        )}
      </button>
    </div>
  )
}

export default function Cake({ onComplete }) {
  const [candles, setCandles] = useState(Array(CANDLE_COUNT).fill(true))
  const lit = candles.filter(Boolean).length

  const blow = (i) => {
    if (!candles[i]) return
    setCandles((prev) => {
      const next = [...prev]
      next[i] = false
      if (next.every((c) => !c)) setTimeout(onComplete, 900)
      return next
    })
  }

  return (
    <div className="text-center">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl mb-2 font-bold shimmer-text"
        style={{ backgroundImage: 'linear-gradient(90deg, #ff6b9d, #ffd93d, #c780fa, #ff6b9d)' }}
      >
        {lit > 0 ? 'شمع‌ها رو فوت کن!' : 'آفرین! 🎉'}
      </motion.h2>

      <p className="text-white/60 mb-10 text-sm md:text-base">
        {lit > 0 ? `روی هر شمع کلیک کن — ${lit} تا مونده 🕯️` : 'حالا جشن شروع می‌شه...'}
      </p>

      <motion.div
        initial={{ scale: 0.6, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, delay: 0.2 }}
        className="relative mx-auto"
        style={{ width: 'min(340px, 82vw)' }}
      >
        {/* شمع‌ها */}
        <div className="relative flex justify-center gap-5 md:gap-7 mb-2 z-10">
          {candles.map((isLit, i) => (
            <Candle key={i} lit={isLit} onBlow={() => blow(i)} />
          ))}
        </div>

        {/* طبقه بالا - صورتی */}
        <div className="relative mx-auto w-[78%] h-14 rounded-t-2xl bg-gradient-to-b from-pink-300 to-pink-500 shadow-lg" />
        <div className="relative flex justify-between px-2 -mt-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-5 h-3 rounded-b-full bg-pink-200 shadow-sm" />
          ))}
        </div>

        {/* طبقه وسط - بنفش */}
        <div className="relative mx-auto w-[90%] h-14 rounded-t-md bg-gradient-to-b from-purple-300 to-purple-500 shadow-lg mt-1" />
        <div className="relative flex justify-between px-2 -mt-3">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="w-4 h-3 rounded-b-full bg-purple-200 shadow-sm" />
          ))}
        </div>

        {/* طبقه پایین - کرم */}
        <div className="relative mx-auto w-full h-14 rounded-t-md bg-gradient-to-b from-yellow-200 to-yellow-400 shadow-xl mt-1" />
        <div className="relative flex justify-between px-2 -mt-3">
          {Array.from({ length: 13 }).map((_, i) => (
            <div key={i} className="w-4 h-3 rounded-b-full bg-yellow-100 shadow-sm" />
          ))}
        </div>

        {/* بشقاب */}
        <div className="relative mx-auto w-[112%] -ml-[6%] h-2.5 rounded-full bg-slate-200/70 shadow-2xl" />
        <div className="relative mx-auto w-[118%] -ml-[9%] h-1.5 rounded-full bg-slate-400/40 blur-sm -mt-1" />
      </motion.div>
    </div>
  )
}