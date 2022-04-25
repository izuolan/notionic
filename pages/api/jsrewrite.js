// const fetch = require('node-fetch')
// import { fetch } from 'node-fetch'

module.exports = async (req, res) => {
  let { url } = req.query

  if (req.query && req.query.url) {
    url = req.query.url
  }

  const response = await fetch(url)
  const originResText = await response.text()
  const modifyResText = originResText
    .replace('&&"s"===c[0]&&', '&&"notes"===c[0]&&')
    .replace('e.comments.length?"s":""', 'e.comments.length?"notes":""')
    .replace('{return"s"===e}', '{return"notes"===e}')
    .replace('o.push("s"),o.push(i)', 'o.push("notes"),o.push(i)')
    .replace('s.comments.length)?"s"', 's.comments.length)?"notes"')
  // don't show the "/b/*" and "/x/*" in the url
  // .replace('window.history.pushState({lukiNavIndex:c.length-1},w.breadcrumb,e.deepLinkUrl)', '""')
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
  res.send(modifyResText)
}
