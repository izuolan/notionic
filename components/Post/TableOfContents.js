import PropTypes from 'prop-types'
import { getPageTableOfContents } from 'notion-utils'
import Link from 'next/link'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import BLOG from '@/blog.config'

export default function TableOfContents ({ blockMap, frontMatter, pageTitle, showScrollElement }) {
  let collectionId, page
  if (pageTitle) {
    collectionId = Object.keys(blockMap.block)[0]
    page = blockMap.block[collectionId].value
  } else {
    collectionId = Object.keys(blockMap.collection)[0]
    page = Object.values(blockMap.block).find(block => block.value.parent_id === collectionId).value
  }
  const nodes = getPageTableOfContents(page, blockMap)
  if (!nodes.length || !showScrollElement) return null

  /**
   * 获取标题层级 (1-6)
   * @param {Object} node - 标题节点
   */
  const getHeaderLevel = (node) => {
    // 通过 blockMap 获取对应 block 的类型信息
    const block = blockMap?.block?.[node.id]?.value
    if (block?.type === 'header') return 1
    if (block?.type === 'sub_header') return 2
    if (block?.type === 'sub_sub_header') return 3
    // 兜底：尝试从 node 本身获取层级信息
    return node.level || 1
  }

  /**
   * 根据层级获取缩进和样式类名
   * @param {number} level - 标题层级
   */
  const getLevelStyles = (level) => {
    const styles = {
      1: 'pl-2 text-gray-700 dark:text-gray-300 font-medium',
      2: 'pl-6 text-gray-600 dark:text-gray-400',
      3: 'pl-10 text-gray-500 dark:text-gray-500 text-xs',
    }
    return styles[level] || styles[3] // 超过3级的按3级处理
  }

  /**
   * @param {string} id - The ID of target heading block (could be in UUID format)
   */
  function scrollTo (id) {
    id = id.replaceAll('-', '')
    const target = document.querySelector(`.notion-block-${id}`)
    if (!target) return
    // `65` is the height of expanded nav
    // TODO: Remove the magic number
    const top = document.documentElement.scrollTop + target.getBoundingClientRect().top - 65
    document.documentElement.scrollTo({
      top,
      behavior: 'smooth'
    })
  }

  return (
    <div
      className='table-of-contents toc-fade-in'
    >
      {pageTitle && (
        <Link
          passHref
          href={`${BLOG.path}/${frontMatter.slug}`}
          scroll={false}
          className='block -ml-6 mb-2 p-2 hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg'
        >
          <ChevronLeftIcon className='inline-block mb-1 h-5 w-5' />
          <span className='ml-1'>{frontMatter.title}</span>
        </Link>
      )}
      {nodes.map(node => {
        const level = getHeaderLevel(node)
        const levelStyles = getLevelStyles(level)
        
        return (
          <div key={node.id} className='hover:bg-gray-200 hover:dark:bg-gray-700 rounded-lg transition-colors relative'>
            <a
              data-target-id={node.id}
              className={`block py-1.5 px-2 cursor-pointer transition-colors relative ${levelStyles}`}
              onClick={() => scrollTo(node.id)}
              title={node.text}
            >
              {/* 添加层级指示器 */}
              {level > 1 && (
                <span 
                  className="absolute top-1/2 transform -translate-y-1/2 w-1 h-1 bg-current rounded-full opacity-60"
                  style={{ left: `${level === 2 ? '12px' : '24px'}` }}
                />
              )}
              <span className={level > 1 ? 'truncate block' : ''}>{node.text}</span>
            </a>
          </div>
        )
      })}
    </div>
  )
}

TableOfContents.propTypes = {
  blockMap: PropTypes.object.isRequired,
  frontMatter: PropTypes.object.isRequired,
  pageTitle: PropTypes.string,
  showScrollElement: PropTypes.bool.isRequired
}
