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
    .replace('"https://www.craft.do"', '"/"') // replace logo url
    .replace(/children:\(0,vr.jsx\)\("svg".*\}\)\]\}\)\}\)/, '') // remove Craft.do logo
    .replace(
      /\("svg",\{className:e.className.*id:"blue"\}\)\]\}\)\}\)\}\)/,
      '("img",{className:e.className,alt:"logo",src:"/favicon.svg"})'
    ) // replace loading logo to favicon.svg

  // don't show the "/b/*" and "/x/*" in the url
  // .replace('window.history.pushState({lukiNavIndex:c.length-1},w.breadcrumb,e.deepLinkUrl)', '""')
  res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
  res.send(modifyResText)
}
