const { NODE_ENV, VERSION } = process.env
const isDev = NODE_ENV === 'development'
import { globalConfig } from '@app/shared/GlobalConfig'
const { STATIC_URL, SEGMENT_KEY } = globalConfig

const __ENV__ = {
  VERSION: VERSION,
  ENV: NODE_ENV
}

export function renderHtml ({ head, bodyHtml, manifest, chunkManifest, initialState, optimizelyDatafile }) {
  let mainCss
    , mainScripts
    , optimizelyScript

  if (!isDev) {
    mainCss = `<link rel="stylesheet" href="/${manifest['main.css']}" />`
    mainScripts = `
      <script src="/${manifest['vendor.js']}" defer="defer"></script>
      <script src="/${manifest['main.js']}" defer="defer"></script>
    `
  } else {
    mainScripts = `<script src="/js/main.bundle.js"></script>`
  }

  return `
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.script.toString()}
        ${mainCss || ''}
        ${chunkManifest ? `<script>window.webpackManifest=${JSON.stringify(chunkManifest)}</script>` : ''}
        <link rel="shortcut icon" type="image/png" href="${STATIC_URL}/favicon.png" />
      </head>
      <body>
        <div id="root">${bodyHtml}</div>
        <script>window.__INITIAL_STATE__= ${JSON.stringify(initialState)}</script>
        <script>window.__ENV__= ${JSON.stringify(__ENV__)}</script>
        <script>window.__GLOBAL_CONFIG__= ${JSON.stringify(globalConfig)}</script>
        ${optimizelyDatafile ? `<script>window.__OPTIMIZELY_DATAFILE__=${JSON.stringify(optimizelyDatafile)}</script>` : ''}
        ${mainScripts || ''}
        <noscript>Stop being lame and enable Javascript!</noscript>
      </body>
    </html>
  `
}
