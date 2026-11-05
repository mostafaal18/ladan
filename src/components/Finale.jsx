import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Fireworks from './Fireworks'

export default function Finale({ photo = null }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Fireworks />

      <div className="relative z-10 text-center px-6">
        {/* عکس اختیاری */}
        {photo && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 90, delay: 0.3 }}
            className="mx-auto mb-6 w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-pink-400/50 shadow-2xl shadow-pink-500/40"
          >
            <img src={photo} alt="لادن" className="w-full h-full object-cover" />
          </motion.div>
        )}

        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 70, delay: 0.4 }}
          className="text-7xl md:text-8xl mb-4 inline-block"
        >
          🎂
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold leading-tight shimmer-text"
          style={{
            backgroundImage: 'linear-gradient(90deg, #ff6b9d, #ffd93d, #c780fa, #4d96ff, #ff6b9d)',
          }}
        >
          تولدت مبارک
          <br />
          لادن عزیزم تر از جانم! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 1 }}
          className="mt-7 text-base md:text-xl text-white/85 max-w-xl mx-auto leading-8 md:leading-9"
        >
          امیدوارم هر روزت پر از لبخند، عشق و لحظه‌های ناب باشه
          <Heart className="inline w-5 h-5 text-pink-400 fill-pink-400 mx-1 -mt-1" />
          <br />
          این سال، سال تو باشه ✨
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
          className="mt-10 flex justify-center gap-4 text-4xl md:text-5xl"
        >
          {['🎈', '🎁', '💖', '✨', '🌟'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.15, ease: 'easeInOut' }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}