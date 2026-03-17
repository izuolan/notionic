import SEO from '@/components/Common/SEO'
import BLOG from '@/blog.config'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Container = ({ children, fullWidth, ...customMeta }) => {
  const meta = {
    title: BLOG.title,
    type: 'website',
    ...customMeta
  }
  return (
    <>
      <SEO meta={meta} />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
        className={`m-auto flex-grow w-full transition-all ${
          !fullWidth ? 'max-w-2xl px-4' : 'px-4 md:px-24'
        }`}
      >
        {children}
      </motion.main>
    </>
  )
}

Container.propTypes = {
  children: PropTypes.node
}

export default Container
