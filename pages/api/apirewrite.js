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
    url = req.query.url
  }

  try {
    const response = await fetch(url)
    res.send(await response.json())
  } catch (e) {
    res.send(e)
  }
}
