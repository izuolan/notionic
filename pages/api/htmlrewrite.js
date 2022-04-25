import { getAllNotes } from '@/lib/craft'
import BLOG from '@/blog.config'

module.exports = async (req, res) => {
  const { pathname, slug } = req.query
  console.log('pathname: ', pathname)
  console.log('slug: ', slug)

  const noteItem = await getNoteItem(pathname)
  console.log('htmlrewrite noteItem: ', noteItem)
  if (noteItem === undefined) {
    res.statusCode = 404
    res.end(
      'Notes Not Found, Make sure you have the correct pathname and check your Craft.do setting page.'
    )
    return
  }
  const craftUrl = noteItem.link

  // console.log('htmlrewrite craftUrl: ', craftUrl)
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
      '<link rel="apple-touch-icon" href="/apple-touch-icon.png">'
    )
    .replace(
      '<link href="https://fonts.googleapis.com/css?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900|Roboto+Mono:300,300i,400,400i,500,500i,700,700i&amp;display=swap" rel="stylesheet">',
      ''
    )
    .replace(
      '<meta name="luki:api-endpoint" content="https://www.craft.do/api">',
      '<meta name="luki:api-endpoint" content="/api">'
    )
    .replace(
      '<script async="" src="https://www.craft.do/assets/js/analytics2.js"></script>',
      ''
    )
    .replace(
      'src="https://plausible.io/js/plausible.js"></script>',
      'src=""></script>'
    )
    .replace('</head><body', headStr + '</head><body')
    .replace('</body></html>', bodyStr + '</body></html>')

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.send(modifyResText)
}

async function getNoteItem(path) {
  const notesObj = await getAllNotes()
  for (let i = 0; i < notesObj.length; i++) {
    const noteItem = notesObj[i]
    console.log('getNoteItem path: ', path)
    console.log('getNoteItem noteItem: ', noteItem)
    if (path === noteItem.path) {
      return noteItem
    }
  }
}

const headStr = `
  <style>
    .header .right-side {
      padding-right: 3rem;
    }
    .header .left-side {
      padding-left: 3rem;
    }

    .navigation-logo {
      position: fixed;
      top: 0;
      left: 0;
      padding-top: 1rem;
      padding-left: 1rem;
      z-index: 99;
    }
    .logo {
      width: 1.5rem;
      height: 1.5rem;
    }

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
      height: 2rem;
      width: 2rem;
      text-align: center;
      border-radius: 50%;
      z-index: 98;
      cursor: pointer;
    }
    .navigation__logo {
      width: 1rem;
      height: 1rem;
      padding-top: 0.65rem;
    }
    .navigation__title {
      position: fixed;
      top: 0.5rem;
      right: 3rem;
      visibility: hidden;
      margin: 0.5rem 1rem;
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
      background: #EDEEEE;
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
      width: 1rem;
      margin: 0.5rem;
      z-index: 98;
    }
    .navigation__icon a:hover {
      opacity: 0.7;
    }

    .navigation__checkbox:checked ~ .navigation__background {
      background: #edeeee;
      transform: scale(20);
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

    .footer {
      position: absolute;
      top: 18rem;
      right: 2rem;
      color: #b7c0c3;
      font-size: 0.8rem;
    }
  </style>
`

const bodyStr = `
  <div class="navigation-logo">
    <a href="/notes">
      <img alt="logo" class="logo" src="/favicon.svg" />
    </a>
  </div>
  <div class="navigation">
    <input type="checkbox" class="navigation__checkbox" id="nav-toggle" />
    <label for="nav-toggle" class="navigation__button">
      <a aria-label="toggle navigation menu">
        <img alt="nav" class="navigation__logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJoLTYgdy02IiBmaWxsPSJub25lIiB2aWV3Qm94PSIwIDAgMjQgMjQiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiPgogIDxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgZD0iTTQgNmgxNk00IDEyaDE2bS03IDZoNyIgLz4KICA8L3N2Zz4K" />
      </a>
    </label>
    <div class="navigation__background"></div>

    <p class="navigation__title">${BLOG.notes}</p>

    <nav class="navigation__nav" role="navigation">
      <ul class="navigation__list">
        <li class="navigation__item">
          <a href="/notes" class="navigation__link">${BLOG.notesNav.index}</a>
        </li>
        <li class="navigation__item">
          <a href="/" class="navigation__link">${BLOG.notesNav.blog}</a>
        </li>
        <li class="navigation__item">
          <a href="/contact" target="_blank" class="navigation__link">${BLOG.notesNav.contact}</a>
        </li>
      </ul>
      <p class="footer">© CC BY-NC-SA 4.0</p>
    </nav>

    <div class="navigation__icon">
      <a target="_blank" href=${BLOG.socialLink.telegram}>
        <img alt="Telegram" src="data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VGVsZWdyYW08L3RpdGxlPjxwYXRoIGZpbGw9ImdyYXkiIGQ9Ik0xMS45NDQgMEExMiAxMiAwIDAgMCAwIDEyYTEyIDEyIDAgMCAwIDEyIDEyIDEyIDEyIDAgMCAwIDEyLTEyQTEyIDEyIDAgMCAwIDEyIDBhMTIgMTIgMCAwIDAtLjA1NiAwem00Ljk2MiA3LjIyNGMuMS0uMDAyLjMyMS4wMjMuNDY1LjE0YS41MDYuNTA2IDAgMCAxIC4xNzEuMzI1Yy4wMTYuMDkzLjAzNi4zMDYuMDIuNDcyLS4xOCAxLjg5OC0uOTYyIDYuNTAyLTEuMzYgOC42MjctLjE2OC45LS40OTkgMS4yMDEtLjgyIDEuMjMtLjY5Ni4wNjUtMS4yMjUtLjQ2LTEuOS0uOTAyLTEuMDU2LS42OTMtMS42NTMtMS4xMjQtMi42NzgtMS44LTEuMTg1LS43OC0uNDE3LTEuMjEuMjU4LTEuOTEuMTc3LS4xODQgMy4yNDctMi45NzcgMy4zMDctMy4yMy4wMDctLjAzMi4wMTQtLjE1LS4wNTYtLjIxMnMtLjE3NC0uMDQxLS4yNDktLjAyNGMtLjEwNi4wMjQtMS43OTMgMS4xNC01LjA2MSAzLjM0NS0uNDguMzMtLjkxMy40OS0xLjMwMi40OC0uNDI4LS4wMDgtMS4yNTItLjI0MS0xLjg2NS0uNDQtLjc1Mi0uMjQ1LTEuMzQ5LS4zNzQtMS4yOTctLjc4OS4wMjctLjIxNi4zMjUtLjQzNy44OTMtLjY2MyAzLjQ5OC0xLjUyNCA1LjgzLTIuNTI5IDYuOTk4LTMuMDE0IDMuMzMyLTEuMzg2IDQuMDI1LTEuNjI3IDQuNDc2LTEuNjM1eiIvPjwvc3ZnPg==" />
      </a>
      <a target="_blank" href=${BLOG.socialLink.twitter}>
        <img alt="Twitter" src="data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+VHdpdHRlcjwvdGl0bGU+PHBhdGggZmlsbD0iZ3JheSIgZD0iTTIzLjk1MyA0LjU3YTEwIDEwIDAgMDEtMi44MjUuNzc1IDQuOTU4IDQuOTU4IDAgMDAyLjE2My0yLjcyM2MtLjk1MS41NTUtMi4wMDUuOTU5LTMuMTI3IDEuMTg0YTQuOTIgNC45MiAwIDAwLTguMzg0IDQuNDgyQzcuNjkgOC4wOTUgNC4wNjcgNi4xMyAxLjY0IDMuMTYyYTQuODIyIDQuODIyIDAgMDAtLjY2NiAyLjQ3NWMwIDEuNzEuODcgMy4yMTMgMi4xODggNC4wOTZhNC45MDQgNC45MDQgMCAwMS0yLjIyOC0uNjE2di4wNmE0LjkyMyA0LjkyMyAwIDAwMy45NDYgNC44MjcgNC45OTYgNC45OTYgMCAwMS0yLjIxMi4wODUgNC45MzYgNC45MzYgMCAwMDQuNjA0IDMuNDE3IDkuODY3IDkuODY3IDAgMDEtNi4xMDIgMi4xMDVjLS4zOSAwLS43NzktLjAyMy0xLjE3LS4wNjdhMTMuOTk1IDEzLjk5NSAwIDAwNy41NTcgMi4yMDljOS4wNTMgMCAxMy45OTgtNy40OTYgMTMuOTk4LTEzLjk4NSAwLS4yMSAwLS40Mi0uMDE1LS42M0E5LjkzNSA5LjkzNSAwIDAwMjQgNC41OXoiLz48L3N2Zz4=" />
      </a>
      <a target="_blank" href=${BLOG.socialLink.github}>
        <img alt="Giithub" src="data:image/svg+xml;base64,PHN2ZyByb2xlPSJpbWciIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+R2l0SHViPC90aXRsZT48cGF0aCBmaWxsPSJncmF5IiBkPSJNMTIgLjI5N2MtNi42MyAwLTEyIDUuMzczLTEyIDEyIDAgNS4zMDMgMy40MzggOS44IDguMjA1IDExLjM4NS42LjExMy44Mi0uMjU4LjgyLS41NzcgMC0uMjg1LS4wMS0xLjA0LS4wMTUtMi4wNC0zLjMzOC43MjQtNC4wNDItMS42MS00LjA0Mi0xLjYxQzQuNDIyIDE4LjA3IDMuNjMzIDE3LjcgMy42MzMgMTcuN2MtMS4wODctLjc0NC4wODQtLjcyOS4wODQtLjcyOSAxLjIwNS4wODQgMS44MzggMS4yMzYgMS44MzggMS4yMzYgMS4wNyAxLjgzNSAyLjgwOSAxLjMwNSAzLjQ5NS45OTguMTA4LS43NzYuNDE3LTEuMzA1Ljc2LTEuNjA1LTIuNjY1LS4zLTUuNDY2LTEuMzMyLTUuNDY2LTUuOTMgMC0xLjMxLjQ2NS0yLjM4IDEuMjM1LTMuMjItLjEzNS0uMzAzLS41NC0xLjUyMy4xMDUtMy4xNzYgMCAwIDEuMDA1LS4zMjIgMy4zIDEuMjMuOTYtLjI2NyAxLjk4LS4zOTkgMy0uNDA1IDEuMDIuMDA2IDIuMDQuMTM4IDMgLjQwNSAyLjI4LTEuNTUyIDMuMjg1LTEuMjMgMy4yODUtMS4yMy42NDUgMS42NTMuMjQgMi44NzMuMTIgMy4xNzYuNzY1Ljg0IDEuMjMgMS45MSAxLjIzIDMuMjIgMCA0LjYxLTIuODA1IDUuNjI1LTUuNDc1IDUuOTIuNDIuMzYuODEgMS4wOTYuODEgMi4yMiAwIDEuNjA2LS4wMTUgMi44OTYtLjAxNSAzLjI4NiAwIC4zMTUuMjEuNjkuODI1LjU3QzIwLjU2NSAyMi4wOTIgMjQgMTcuNTkyIDI0IDEyLjI5N2MwLTYuNjI3LTUuMzczLTEyLTEyLTEyIi8+PC9zdmc+" />
      </a>
    </div>

  </div>
`
