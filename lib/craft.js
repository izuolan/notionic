import BLOG from '@/blog.config'

export async function getAllNotes() {
  const craftConfigSecret = BLOG.craftConfigShareUrl.slice(23)
  const craftConfigApiUrl = 'https://www.craft.do/api/share/' + craftConfigSecret
  const init = {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  }
  const configResponse = await fetch(craftConfigApiUrl, init)
  const responseJson = await configResponse.json()
  const pageBlocksLength = responseJson.blocks[0].blocks.length
  // console.log('craft.js Blocks Num: ', pageBlocksLength)

  const configJson = []
  for (let i = 0; i < pageBlocksLength; i = i + 3) {
    const t = i + 1
    const p = i + 2
    const l = i + 3
    // console.log('craft.js t: ', t)
    // console.log('craft.js p: ', p)
    // console.log('craft.js l: ', l)
    try {
      const noteTitle = responseJson.blocks[t].content
      const notePath = responseJson.blocks[p].content
      const craftLink = responseJson.blocks[l].content
      // console.log('craft.js noteTitle: ', noteTitle)
      // console.log('craft.js notePath: ', notePath)
      // console.log('craft.js craftLink: ', craftLink)
      const tpl = `{"title":"${noteTitle}","path":"${notePath}","link":"${craftLink}"}`
      // console.log('craft.js tpl: ', tpl)
      configJson.push(JSON.parse(tpl))
    } catch (error) {
      console.log('craft.js error: ', error)
      const tpl = '{"title":"NULL","path":"","link":""}'
      configJson.push(JSON.parse(tpl))
    }
  }
  // console.log('craft.js configJson: ', configJson)
  return configJson
}
