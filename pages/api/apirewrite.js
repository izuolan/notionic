// const fetch = require('node-fetch')

module.exports = async (req, res) => {
  let { url } = req.query
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.query && req.query.url) {
    url = 'https://www.craft.do/api/' + req.query.url
  }

  try {
    const response = await fetch(url)
    res.send(await response.json())

    // const originResText = await response.text()
    // const modifyResText = originResText
    // .replace(/5A942651-8A73-49C7-9B36-0FD047A6D6EC/g, 'test-page')
    // .replace(/craftdocs:\/\/open\?blockId=/g, 'https://zuolan.me/notes/page/')
    // .replace(/&spaceId=48c91199-cb47-f359-8399-2a12d07b0b02/g, '')
    // console.log(modifyResText.toString())
    // res.send(await modifyResText.toString())
  } catch (e) {
    res.send(e)
  }
}
