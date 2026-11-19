'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const variants = {
  hidden: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
}

const TransitionEffect = ({ children }) => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div
        key={pathname}
        initial='hidden'
        animate='enter'
        exit='exit'
        variants={variants}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default TransitionEffect
