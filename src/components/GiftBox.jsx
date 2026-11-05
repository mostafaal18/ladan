import { motion } from 'framer-motion'

export default function GiftBox({ onOpen }) {
  return (
    <div className="text-center">
      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm md:text-base text-white/60 mb-3 tracking-widest"
      >
        یه سورپرایز برای...
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-12 shimmer-text"
        style={{ backgroundImage: 'linear-gradient(90deg, #ff6b9d, #ffd93d, #c780fa, #4d96ff, #ff6b9d)' }}
      >
        یه آدم خیلی خاص
      </motion.h2>

      <motion.button
        onClick={onOpen}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 110, damping: 12, delay: 0.9 }}
        whileHover={{ scale: 1.08, rotate: 2 }}
        whileTap={{ scale: 0.94 }}
        className="relative cursor-pointer group"
      >
        {/* هاله‌ی نور */}
        <motion.div
          className="absolute inset-0 -m-16 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.55), transparent 65%)' }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.95, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        />

        {/* جعبه */}
        <div className="relative w-52 h-52 md:w-60 md:h-60">
          {/* بدنه */}
          <div className="absolute inset-x-0 bottom-0 h-36 md:h-40 rounded-b-lg rounded-t-sm bg-gradient-to-b from-pink-500 to-pink-800 shadow-2xl shadow-pink-900/60" />
          {/* درب */}
          <motion.div
            className="absolute inset-x-[-4px] top-10 md:top-12 h-14 md:h-16 rounded-t-md bg-gradient-to-b from-pink-400 to-pink-600 shadow-xl"
            animate={{ y: [0, -3, 0], rotate: [0, -2, 2, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          />
          {/* روبان عمودی */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 shadow-md" />
          {/* روبان افقی */}
          <div className="absolute top-14 md:top-16 left-0 right-0 h-4 bg-gradient-to-b from-yellow-200 via-yellow-400 to-yellow-600 shadow-md" />
          {/* پاپیون */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex -space-x-1">
            <div className="w-8 h-8 rounded-full border-[3px] border-yellow-400 bg-yellow-300 shadow-md" />
            <div className="w-8 h-8 rounded-full border-[3px] border-yellow-400 bg-yellow-300 shadow-md" />
          </div>
        </div>
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-12 text-base md:text-lg text-white/70 animate-pulse"
      >
        کلیک کن تا باز شه ✨
      </motion.p>
    </div>
  )
}