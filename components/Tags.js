import Link from 'next/link'

const Tags = ({ tags, currentTag }) => {
  if (!tags) return null
  return (
    <div className='tag-container'>
      <div className='flex flex-wrap justify-center mt-4'>
        {Object.keys(tags).map((key) => {
          const selected = key === currentTag
          return (
            <div
              key={key}
              className={`m-1 font-medium rounded-lg whitespace-nowrap hover:text-gray-100 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-600 ${
                selected
                  ? 'text-gray-100 bg-gray-400 dark:bg-gray-600'
                  : 'text-gray-400 bg-gray-100 dark:bg-night'
              }`}
            >
              <Link
                key={key}
                scroll={false}
                href={selected ? '/search' : `/tag/${encodeURIComponent(key)}`}
              >
                <a className='px-4 py-2 block'>{`${key} (${tags[key]})`}</a>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Tags
