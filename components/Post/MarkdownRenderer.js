import PropTypes from 'prop-types'

export default function MarkdownRenderer({ content }) {
  return (
    <div
      className='markdown-body'
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

MarkdownRenderer.propTypes = {
  content: PropTypes.string.isRequired
}
