import { getBlocksMaps } from '@/lib/getBlocksMaps'

async function getBlockItem(path) {
  const { pagesJson, siteConfigObj } = await getBlocksMaps()

  for (let i = 0; i < pagesJson.length; i++) {
    const blockItem = pagesJson[i]
    if (path === blockItem.slug) {
      return { blockItem, siteConfigObj }
    }
  }
  return { blockItem: null, siteConfigObj }
}

module.exports = async (req, res) => {
  // const { pathname, slug } = req.query
  const { pathname } = req.query
  let realPath
  if (pathname.includes('/b/')) {
    realPath = pathname.split('/b/')[0]
  } else if (pathname.includes('/x/')) {
    realPath = pathname.split('/x/')[0]
  } else {
    realPath = pathname
  }
  // console.log('realPath: ', realPath)
  // console.log('slug: ', slug)

  const { blockItem, siteConfigObj } = await getBlockItem(realPath)
  if (blockItem === null) {
    res.statusCode = 404
    res.end(
      'Notes Not Found, Make sure you have the correct pathname and check your Craft.do setting page.'
    )
    return
  }
  const craftUrl = blockItem.url
  // console.log('htmlrewrite craftUrl: ', craftUrl)

  const bodyStr = `
  <div class="navigation">
    <input type="checkbox" class="navigation__checkbox" id="nav-toggle" />
    <label for="nav-toggle" class="navigation__button">
      <a aria-label="toggle navigation menu" class="navigation__logo">
        <img alt="logo" class="logo" src="${siteConfigObj['Site Logo']}" />
      </a>
    </label>
    <div class="navigation__background"></div>

    <p class="navigation__title">${siteConfigObj['Site Name']}</p>

    <nav class="navigation__nav" role="navigation">
      <ul class="navigation__list">
        <li class="navigation__item">
          <a href="/" class="navigation__link">${siteConfigObj['Home Menu Text']}</a>
        </li>
        <li class="navigation__item">
          <a href="/notes" class="navigation__link">${siteConfigObj['Archive Menu Text']}</a>
        </li>
        <li class="navigation__item">
          <a href="/about" target="_blank" class="navigation__link">${siteConfigObj['About Menu Text']}</a>
        </li>
      </ul>
      <p class="footer">${siteConfigObj['Footer Text']}</p>
    </nav>

    <div class="navigation__icon">
      <a target="_blank" href=${siteConfigObj['First Social Link']}>
        <img alt="Telegram" src="${siteConfigObj['First Social Icon']}" />
      </a>
      <a target="_blank" href=${siteConfigObj['Second Social Link']}>
        <img alt="Twitter" src="${siteConfigObj['Second Social Icon']}" />
      </a>
      <a target="_blank" href=${siteConfigObj['Third Social Link']}>
        <img alt="Giithub" src="${siteConfigObj['Third Social Icon']}" />
      </a>
    </div>

  </div>
  `

  const response = await fetch(craftUrl)
  const originResText = await response.text()
  const modifyResText = originResText
    .replace('<meta name="robots" content="noindex">', '')
    .replace(
      '<link rel="icon" href="/share/static/favicon.ico">',
      '<link rel="icon" href="/favicon.svg">'
    )
    .replace(
      '<link rel="apple-touch-icon" href="/share/static/logo-192.png">',
      '<link rel="apple-touch-icon" href="/favicon.png">'
    )
    .replace(
      '<link href="https://fonts.googleapis.com/css?family=Roboto+Mono:300,300i,400,400i,500,500i,700,700i&amp;display=swap" rel="stylesheet"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap" rel="stylesheet">',
      ''
    )
    .replace(
      '<meta name="luki:api-endpoint" content="https://www.craft.do/api">',
      '<meta name="luki:api-endpoint" content="/api">'
    )
    .replace(
      '<script async src="https://www.craft.do/assets/js/analytics2.js"></script>',
      ''
    )
    .replace('</head><body', headStr + '</head><body')
    .replace('</body></html>', bodyStr + '</body></html>')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(modifyResText)
}

const headStr = `
  <style>
    .navigation {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 99;
    }
    .navigation__checkbox {
      display: none;
    }

    .navigation__button {
      position: absolute;
      top: 0.5rem;
      right: 1.25rem;
      padding-top: 0.4rem;
      height: 2rem;
      width: 2rem;
      text-align: center;
      border-radius: 50%;
      z-index: 98;
      cursor: pointer;
    }
    .navigation__logo:hover {
      color: blue;
    }
    .navigation__title {
      position: fixed;
      top: 0.5rem;
      right: 3rem;
      visibility: hidden;
      margin: 0.2rem 1rem;
      color: gray;
      font-size: 1rem;
      z-index: 98;
      transition: all 200ms ease-out;
    }

    .navigation__background {
      position: fixed;
      top: 0.65rem;
      right: 1.25rem;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      z-index: 97;
      transition: all 400ms cubic-bezier(0.86, 0, 0.07, 1);
    }
    .navigation__nav {
      position: fixed;
      top: 0;
      right: 0;
      opacity: 0;
      width: 100%;
      visibility: hidden;
      z-index: 97;
      transition: all 400ms ease-in;
    }

    .navigation__list {
      position: absolute;
      top: 4rem;
      right: 1rem;
      list-style: none;
    }
    .navigation__item {
      margin: 0.5rem;
      text-align: right;
    }

    .navigation__link:link,
    .navigation__link:visited {
      display: inline-block;
      padding: 0.5rem 1rem;
      color: #494b4e;
      font-size: 1.2rem;
      text-decoration: none;
      transition: all 0.2s;
    }
    .navigation__link:hover {
      color: #494b4e;
      transform: scale(1.2);
    }

    .navigation__icon {
      position: fixed;
      top: 15rem;
      right: 0;
      visibility: hidden;
      margin: 0.8rem 2rem;
      z-index: 98;
      transition: all 200ms ease-out;
    }
    .navigation__icon a {
      top: 0;
      right: 0;
      display: inline-block;
      opacity: 0.3;
      width: 1rem;
      margin: 0.5rem;
      z-index: 98;
    }
    .navigation__icon a:hover {
      opacity: 0.5;
    }

    .navigation__checkbox:checked ~ .navigation__background {
      background: #F6F8FA;
      transform: rotate(45deg) translateY(12px) translateX(12px);
      box-shadow: 0 0 20px rgb(0 0 0 / 20%);
      height: 500px;
      width: 500px;
      right: -160px;
      top: -160px;
      border-radius: 50%;
    }
    .navigation__checkbox:checked ~ .navigation__title {
      visibility: visible;
      opacity: 1;
    }
    .navigation__checkbox:checked ~ .navigation__icon {
      visibility: visible;
      opacity: 1;
    }
    .navigation__checkbox:checked ~ .navigation__nav {
      width: 100%;
      visibility: visible;
      opacity: 1;
    }

    .logo {
      width: 1.3em;
    }
    .footer {
      position: absolute;
      top: 18rem;
      right: 2rem;
      color: #b7c0c3;
      font-size: 0.8rem;
    }
  </style>
`
