import BLOG from '@/blog.config'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { NotionRenderer as Renderer } from 'react-notion-x'

// Lazy-load some heavy components & override the renderers of some block types
const components = {
  // Code block
  Code: dynamic(() => {
    return import('react-notion-x/build/third-party/code').then(async module => {
      // Additional prismjs syntax
      await Promise.all([
        import('prismjs/components/prism-bash'),
        import('prismjs/components/prism-c'),
        import('prismjs/components/prism-cpp'),
        import('prismjs/components/prism-docker'),
        import('prismjs/components/prism-js-templates'),
        import('prismjs/components/prism-diff'),
        import('prismjs/components/prism-git'),
        import('prismjs/components/prism-go'),
        import('prismjs/components/prism-graphql'),
        import('prismjs/components/prism-makefile'),
        import('prismjs/components/prism-markdown'),
        import('prismjs/components/prism-python'),
        import('prismjs/components/prism-rust'),
        import('prismjs/components/prism-solidity'),
        import('prismjs/components/prism-sql'),
        import('prismjs/components/prism-swift'),
        import('prismjs/components/prism-wasm'),
        import('prismjs/components/prism-yaml')
      ])
      return module.Code
    })
  }),
  // Database block
  Collection: dynamic(() => {
    return import('react-notion-x/build/third-party/collection').then(module => module.Collection)
  }),
  // Equation block & inline variant
  Equation: dynamic(() => {
    return import('react-notion-x/build/third-party/equation').then(module => module.Equation)
  })
}

/**
 * Notion page renderer
 *
 * A wrapper of react-notion-x/NotionRenderer with predefined `components` and `mapPageUrl`
 *
 * @param props - Anything that react-notion-x/NotionRenderer supports
 */
export default function NotionRenderer (props) {
  const { locale } = useRouter()
  const mapPageUrl = (id) => {
    // console.log('mapPageUrl', BLOG.lang.split('-')[0])
    if (locale === BLOG.lang.split('-')[0]) {
      return '/s/' + id.replace(/-/g, '')
    } else {
      return '/' + locale + '/s/' + id.replace(/-/g, '')
    }
  }
  return (
    <Renderer
      components={components}
      mapPageUrl={mapPageUrl}
      recordMap={props.blockMap}
      {...props}
    />
  )
}

NotionRenderer.propTypes = {
  frontMatter: PropTypes.object.isRequired,
  blockMap: PropTypes.object.isRequired
}
