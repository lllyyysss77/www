/**
 * generators — turn a card `config` into copy-paste components for React,
 * TypeScript, Vue, Angular, Svelte, Astro, and Vanilla JS.
 *
 * Each generated component is ZERO-dependency: it fetches metadata from the
 * Microlink REST API itself (free `api.microlink.io`, or `pro.microlink.io`
 * when an `apiKey` is supplied) and renders the designed card.
 *
 * The TypeScript and Astro outputs reuse the same `RUNTIME_RENDERER` /
 * `FETCH_CORE` blobs as the JS ones — `toTypeScript()` derives a strict-mode
 * (`any`-annotated) variant at generation time, so there's no second copy of
 * the renderer to keep in sync.
 *
 * The card markup is produced at runtime by `RUNTIME_RENDERER` — a
 * dependency-free, ES2019-safe port of the `helpers/link-card` builders. It is
 * authored with string concatenation (no template literals / no optional
 * chaining) so it embeds cleanly into every framework and runs in older
 * browsers. A vitest test (`test/builder-generators.test.js`) asserts it stays
 * byte-identical to `buildCardHtml`, so the two never drift.
 */

import { resolveStyle } from 'helpers/link-card'

/* ─── Runtime card renderer (shipped verbatim into every snippet) ───────── */

export const RUNTIME_RENDERER = `function escA (v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function escT (v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function trunc (t, max) {
  var str = String(t == null ? '' : t)
  if (str.length <= max) return str
  var slice = str.slice(0, max - 1)
  var trimmed = slice.replace(/\\s+\\S*$/, '')
  return (trimmed || slice) + '…'
}
function fmtDate (v) {
  if (!v) return ''
  try {
    var d = new Date(v)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch (e) { return '' }
}
function fallbackBg (data) {
  return (data.image && data.image.palette && data.image.palette[0]) || 'rgba(0,0,0,0.05)'
}
function logoFallbackAttr (logoUrl) {
  return logoUrl ? 'onerror="this.onerror=null;this.src=\\'' + logoUrl.replace(/'/g, '&#39;') + '\\';this.style.objectFit=\\'contain\\';this.style.padding=\\'15%\\'" ' : ''
}
function buildMeta (data, s) {
  var pieces = []
  if (s.elements.siteIcon && data.logo && data.logo.url) {
    pieces.push('<img src="' + escA(data.logo.url) + '" alt="" style="width:' + (s.metaSize + 4) + 'px;height:' + (s.metaSize + 4) + 'px;border-radius:4px;flex-shrink:0" />')
  }
  if (s.elements.siteName && data.publisher) {
    pieces.push('<span style="font-size:' + s.metaSize + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.meta + ';letter-spacing:0.5px;text-transform:uppercase">' + escT(data.publisher) + '</span>')
  }
  if (s.elements.authorTopic && data.author) {
    pieces.push('<span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(data.author) + '</span>')
  }
  if (s.elements.date && data.date) {
    var dateStr = fmtDate(data.date)
    if (dateStr) {
      pieces.push('<span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(dateStr) + '</span>')
    }
  }
  if (!pieces.length) return ''
  return '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:' + (s.metaSize + 4) + 'px">' + pieces.join('') + '</div>'
}
function buildLarge (data, s) {
  var href = escA((data && data.url) || '')
  var imageUrl = (data.image && data.image.url) ? escA(data.image.url) : ''
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT(trunc((data && data.title) || '', 90))
  var description = s.elements.description ? escT(trunc((data && data.description) || '', 220)) : ''
  var bg = escA(fallbackBg(data))
  var metaHtml = buildMeta(data, s)
  var maxWidth = s.width || 460
  var mediaBox = s.mediaHeight ? 'width:100%;height:' + s.mediaHeight + 'px;background:' + bg + ';overflow:hidden' : 'width:100%;aspect-ratio:16 / 9;background:' + bg + ';overflow:hidden'
  var mediaInner = imageUrl ? '<img src="' + imageUrl + '" alt="" ' + logoFallbackAttr(logoUrl) + 'style="width:100%;height:100%;object-fit:cover;display:block" />' : ''
  var titleHtml = '<div style="font-size:' + s.headlineSize + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.headline + ';line-height:' + s.lineHeight + ';margin:0">' + title + '</div>'
  var descriptionHtml = description ? '<div style="font-size:' + s.descriptionSize + 'px;color:' + s.palette.description + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;margin:0">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaHtml + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaHtml)
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" style="display:block;text-decoration:none;color:inherit;width:100%;max-width:' + maxWidth + 'px;background:' + s.palette.background + ';border-radius:' + s.radius + ';overflow:hidden;border:' + s.border + ';box-shadow:' + s.shadow + ';font-family:' + s.fontFamily + '">\\n  <div style="' + mediaBox + '">' + mediaInner + '</div>\\n  <div style="padding:14px 16px;display:flex;flex-direction:column;gap:6px">' + body + '</div>\\n</a>'
}
function buildWide (data, s) {
  var href = escA((data && data.url) || '')
  var imageUrl = (data.image && data.image.url) ? escA(data.image.url) : ''
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT((data && data.title) || '')
  var description = s.elements.description ? escT((data && data.description) || '') : ''
  var bg = escA(fallbackBg(data))
  var metaHtml = buildMeta(data, s)
  var maxWidth = s.width || 460
  var minHeight = s.mediaHeight || 140
  var flexDirection = s.imagePosition === 'right' ? 'flex-direction:row-reverse;' : ''
  var mediaInner = imageUrl ? '<img src="' + imageUrl + '" alt="" ' + logoFallbackAttr(logoUrl) + 'style="width:100%;height:100%;object-fit:cover;display:block" />' : ''
  var titleHtml = '<div style="font-size:' + s.headlineSize + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.headline + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + title + '</div>'
  var descriptionHtml = description ? '<div style="font-size:' + s.descriptionSize + 'px;color:' + s.palette.description + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaHtml + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaHtml)
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" style="display:flex;' + flexDirection + 'text-decoration:none;color:inherit;width:100%;max-width:' + maxWidth + 'px;min-height:' + minHeight + 'px;background:' + s.palette.background + ';border-radius:' + s.radius + ';overflow:hidden;border:' + s.border + ';box-shadow:' + s.shadow + ';font-family:' + s.fontFamily + '">\\n  <div style="width:140px;flex-shrink:0;align-self:stretch;background:' + bg + ';overflow:hidden">' + mediaInner + '</div>\\n  <div style="padding:14px;display:flex;flex-direction:column;gap:4px;flex:1;min-width:0;justify-content:center">' + body + '</div>\\n</a>'
}
function buildSmall (data, s) {
  var href = escA((data && data.url) || '')
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT(trunc((data && data.title) || '', 60))
  var description = s.elements.description ? escT(trunc((data && data.description) || '', 140)) : ''
  var bg = escA(fallbackBg(data))
  var maxWidth = s.width || 380
  var iconNode = !s.elements.siteIcon ? '' : (logoUrl ? '<img src="' + logoUrl + '" alt="" style="width:36px;height:36px;border-radius:8px;flex-shrink:0" />' : '<div style="width:36px;height:36px;border-radius:8px;flex-shrink:0;background:' + bg + '"></div>')
  var publisherText = (s.elements.siteName && data.publisher) ? '<span style="font-size:' + (s.metaSize + 1) + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.meta + '">' + escT(data.publisher) + '</span>' : ''
  var authorText = (s.elements.authorTopic && data.author) ? '<span aria-hidden="true" style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">· </span><span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(data.author) + '</span>' : ''
  var dateText = (s.elements.date && data.date) ? '<span style="font-size:' + s.metaSize + 'px;color:' + s.palette.meta + '">' + escT(fmtDate(data.date)) + '</span>' : ''
  var metaRow = (publisherText || authorText) ? '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;gap:8px">\\n      <span style="display:flex;align-items:center;gap:4px;min-width:0;overflow:hidden">' + publisherText + authorText + '</span>\\n      ' + dateText + '\\n    </div>' : ''
  var titleHtml = '<div style="font-size:' + (s.headlineSize - 3) + 'px;font-weight:' + s.fontWeight + ';color:' + s.palette.headline + ';line-height:' + s.lineHeight + ';margin-bottom:2px">' + title + '</div>'
  var descriptionHtml = description ? '<div style="font-size:' + (s.descriptionSize - 1) + 'px;color:' + s.palette.description + ';line-height:' + s.lineHeight + ';display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaRow + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaRow)
  return '<a href="' + href + '" target="_blank" rel="noopener noreferrer" style="display:flex;text-decoration:none;color:inherit;gap:10px;align-items:flex-start;width:100%;max-width:' + maxWidth + 'px;padding:12px 14px;border-radius:' + s.radius + ';background:' + s.palette.background + ';border:' + s.border + ';box-shadow:' + s.shadow + ';font-family:' + s.fontFamily + '">\\n  ' + iconNode + '\\n  <div style="flex:1;min-width:0">' + body + '</div>\\n</a>'
}
function renderCard (data, s) {
  if (!data) return ''
  if (s.variant === 'small') return buildSmall(data, s)
  if (s.variant === 'wide') return buildWide(data, s)
  return buildLarge(data, s)
}`

/* ─── Shared fetch core (shipped verbatim into every snippet) ──────────── */

export const FETCH_CORE = `function withProtocol (url) {
  var str = String(url == null ? '' : url).trim()
  if (!str || /^https?:\\/\\//i.test(str)) return str
  var normalized = 'https://' + str.replace(/^\\/+/, '')
  console.warn('[microlink] "' + str + '" has no protocol — assuming "' + normalized + '". Pass a full URL with an explicit https:// (or http://) to avoid this.')
  return normalized
}
function microlinkFetch (url, apiKey) {
  var endpoint = apiKey ? 'https://pro.microlink.io/' : 'https://api.microlink.io/'
  var qs = new URLSearchParams({ url: withProtocol(url), palette: 'true' }).toString()
  var headers = apiKey ? { 'x-api-key': apiKey } : {}
  return fetch(endpoint + '?' + qs, { headers: headers })
    .then(function (r) { return r.ok ? r.json() : null })
    .then(function (res) { return res && res.data })
    .catch(function () { return null })
}`

/* ─── Tailwind runtime renderer (shipped when the Tailwind option is on) ─── */

// Same structure as RUNTIME_RENDERER, but every element reads its class string
// from the baked STYLE object instead of carrying inline styles. The class
// strings are precomputed at generation time (see `tailwindStyle`) so they
// appear verbatim in the output file — which is what lets Tailwind's JIT
// compiler discover them. Only data-driven backgrounds (the image palette
// fallback) stay as inline styles, since they cannot be a static class.
export const RUNTIME_RENDERER_TW = `function escA (v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function escT (v) {
  return String(v == null ? '' : v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function trunc (t, max) {
  var str = String(t == null ? '' : t)
  if (!max || str.length <= max) return str
  var slice = str.slice(0, max - 1)
  var trimmed = slice.replace(/\\s+\\S*$/, '')
  return (trimmed || slice) + '…'
}
function fmtDate (v) {
  if (!v) return ''
  try {
    var d = new Date(v)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch (e) { return '' }
}
function fallbackBg (data) {
  return (data.image && data.image.palette && data.image.palette[0]) || 'rgba(0,0,0,0.05)'
}
function logoFallbackAttr (logoUrl) {
  return logoUrl ? 'onerror="this.onerror=null;this.src=\\'' + logoUrl.replace(/'/g, '&#39;') + '\\';this.style.objectFit=\\'contain\\';this.style.padding=\\'15%\\'" ' : ''
}
function buildMeta (data, s) {
  var pieces = []
  if (s.elements.siteIcon && data.logo && data.logo.url) {
    pieces.push('<img class="' + s.metaIconClass + '" src="' + escA(data.logo.url) + '" alt="" />')
  }
  if (s.elements.siteName && data.publisher) {
    pieces.push('<span class="' + s.metaNameClass + '">' + escT(data.publisher) + '</span>')
  }
  if (s.elements.authorTopic && data.author) {
    pieces.push('<span class="' + s.metaAuthorClass + '">' + escT(data.author) + '</span>')
  }
  if (s.elements.date && data.date) {
    var dateStr = fmtDate(data.date)
    if (dateStr) {
      pieces.push('<span class="' + s.metaDateClass + '">' + escT(dateStr) + '</span>')
    }
  }
  if (!pieces.length) return ''
  return '<div class="' + s.metaWrapClass + '">' + pieces.join('') + '</div>'
}
function buildStandard (data, s) {
  var href = escA((data && data.url) || '')
  var imageUrl = (data.image && data.image.url) ? escA(data.image.url) : ''
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT(trunc((data && data.title) || '', s.titleLimit))
  var description = s.elements.description ? escT(trunc((data && data.description) || '', s.descLimit)) : ''
  var bg = escA(fallbackBg(data))
  var metaHtml = buildMeta(data, s)
  var mediaInner = imageUrl ? '<img class="w-full h-full object-cover block" src="' + imageUrl + '" alt="" ' + logoFallbackAttr(logoUrl) + '/>' : ''
  var titleHtml = '<div class="' + s.titleClass + '">' + title + '</div>'
  var descriptionHtml = description ? '<div class="' + s.descriptionClass + '">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaHtml + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaHtml)
  return '<a class="' + s.frameClass + '" href="' + href + '" target="_blank" rel="noopener noreferrer">' +
    '<div class="' + s.mediaBoxClass + '" style="background:' + bg + '">' + mediaInner + '</div>' +
    '<div class="' + s.bodyClass + '">' + body + '</div></a>'
}
function buildSmall (data, s) {
  var href = escA((data && data.url) || '')
  var logoUrl = (data.logo && data.logo.url) ? escA(data.logo.url) : ''
  var title = escT(trunc((data && data.title) || '', s.titleLimit))
  var description = s.elements.description ? escT(trunc((data && data.description) || '', s.descLimit)) : ''
  var bg = escA(fallbackBg(data))
  var iconNode = !s.elements.siteIcon ? '' : (logoUrl ? '<img class="' + s.iconClass + '" src="' + logoUrl + '" alt="" />' : '<div class="' + s.iconBoxClass + '" style="background:' + bg + '"></div>')
  var publisherText = (s.elements.siteName && data.publisher) ? '<span class="' + s.publisherClass + '">' + escT(data.publisher) + '</span>' : ''
  var authorText = (s.elements.authorTopic && data.author) ? '<span aria-hidden="true" class="' + s.authorDotClass + '">· </span><span class="' + s.authorClass + '">' + escT(data.author) + '</span>' : ''
  var dateText = (s.elements.date && data.date) ? '<span class="' + s.dateClass + '">' + escT(fmtDate(data.date)) + '</span>' : ''
  var metaRow = (publisherText || authorText) ? '<div class="' + s.metaRowClass + '"><span class="' + s.metaInnerClass + '">' + publisherText + authorText + '</span>' + dateText + '</div>' : ''
  var titleHtml = '<div class="' + s.titleClass + '">' + title + '</div>'
  var descriptionHtml = description ? '<div class="' + s.descriptionClass + '">' + description + '</div>' : ''
  var body = s.metaBefore ? (metaRow + titleHtml + descriptionHtml) : (titleHtml + descriptionHtml + metaRow)
  return '<a class="' + s.frameClass + '" href="' + href + '" target="_blank" rel="noopener noreferrer">' + iconNode + '<div class="' + s.contentClass + '">' + body + '</div></a>'
}
function renderCard (data, s) {
  if (!data) return ''
  if (s.variant === 'small') return buildSmall(data, s)
  return buildStandard(data, s)
}`

/* ─── Helpers ──────────────────────────────────────────────────────────── */

// The serialized, runtime style object baked into each component. Includes the
// resolved `variant` so the renderer can pick the right layout.
const serializeStyle = config => {
  const style = { ...resolveStyle(config), variant: config.variant }
  return JSON.stringify(style, null, 2)
}

/* ─── Tailwind class builder (generation-time) ─────────────────────────── */

// The builder offers three font families and four weights — both map cleanly to
// Tailwind's own utilities, so we avoid arbitrary font-family/weight values.
const TW_FONT = { sans: 'font-sans', serif: 'font-serif', mono: 'font-mono' }
const TW_WEIGHT = {
  light: 'font-light',
  regular: 'font-normal',
  medium: 'font-medium',
  bold: 'font-bold'
}

// A box-shadow becomes an arbitrary `shadow-[...]` utility; Tailwind requires
// spaces inside arbitrary values to be underscores.
const twShadow = shadow =>
  shadow === 'none' ? 'shadow-none' : `shadow-[${shadow.replace(/ /g, '_')}]`

// Precompute every element's complete Tailwind class string for the resolved
// card. The design (colors, sizes, radius, shadow, font) is baked into
// arbitrary-value utilities here, at generation time, so the strings land
// verbatim in the output file and Tailwind's JIT can find them.
const tailwindStyle = config => {
  const r = resolveStyle(config)
  const p = r.palette
  const variant = config.variant
  const font = TW_FONT[config.fontBase] || 'font-sans'
  const weight = TW_WEIGHT[config.fontWeight] || 'font-normal'
  const shadow = twShadow(r.shadow)
  const border = `border-[${config.border}px] border-solid border-[${p.border}]`
  const radius = `rounded-[${config.radius}px]`
  const bg = `bg-[${p.background}]`
  const lh = `leading-[${r.lineHeight}]`
  const headline = `text-[${p.headline}]`
  const desc = `text-[${p.description}]`
  const meta = `text-[${p.meta}]`
  const H = r.headlineSize
  const D = r.descriptionSize
  const M = r.metaSize
  const width = config.width || (variant === 'small' ? 380 : 460)

  const base = {
    variant,
    elements: r.elements,
    metaBefore: r.metaBefore
  }

  const metaShared = {
    metaWrapClass: `flex items-center gap-[8px] flex-wrap min-h-[${M + 4}px]`,
    metaIconClass: `w-[${M + 4}px] h-[${M + 4}px] rounded-[4px] shrink-0`,
    metaNameClass: `text-[${M}px] ${weight} ${meta} tracking-[0.5px] uppercase`,
    metaAuthorClass: `text-[${M}px] ${meta}`,
    metaDateClass: `text-[${M}px] ${meta}`
  }

  if (variant === 'small') {
    return {
      ...base,
      titleLimit: 60,
      descLimit: 140,
      frameClass: `flex no-underline text-inherit gap-[10px] items-start w-full max-w-[${width}px] px-[14px] py-[12px] ${radius} ${bg} ${border} ${shadow} ${font}`,
      iconClass: 'w-[36px] h-[36px] rounded-[8px] shrink-0',
      iconBoxClass: 'w-[36px] h-[36px] rounded-[8px] shrink-0',
      contentClass: 'flex-1 min-w-0',
      metaRowClass: 'flex items-center justify-between mb-[2px] gap-[8px]',
      metaInnerClass: 'flex items-center gap-[4px] min-w-0 overflow-hidden',
      publisherClass: `text-[${M + 1}px] ${weight} ${meta}`,
      authorDotClass: `text-[${M}px] ${meta}`,
      authorClass: `text-[${M}px] ${meta}`,
      dateClass: `text-[${M}px] ${meta}`,
      titleClass: `text-[${H - 3}px] ${weight} ${headline} ${lh} mb-[2px]`,
      descriptionClass: `text-[${D - 1}px] ${desc} ${lh} line-clamp-2`
    }
  }

  if (variant === 'wide') {
    const minHeight = config.height || 140
    const rowReverse =
      config.imagePosition === 'right' ? 'flex-row-reverse ' : ''
    return {
      ...base,
      titleLimit: 0,
      descLimit: 0,
      frameClass: `flex ${rowReverse}no-underline text-inherit w-full max-w-[${width}px] min-h-[${minHeight}px] ${bg} ${radius} overflow-hidden ${border} ${shadow} ${font}`,
      mediaBoxClass: 'w-[140px] shrink-0 self-stretch overflow-hidden',
      bodyClass:
        'p-[14px] flex flex-col gap-[4px] flex-1 min-w-0 justify-center',
      titleClass: `text-[${H}px] ${weight} ${headline} ${lh} line-clamp-2`,
      descriptionClass: `text-[${D}px] ${desc} ${lh} line-clamp-2`,
      ...metaShared
    }
  }

  // large (standard cover)
  const mediaBoxClass = config.height
    ? `w-full h-[${config.height}px] overflow-hidden`
    : 'w-full aspect-[16/9] overflow-hidden'
  return {
    ...base,
    titleLimit: 90,
    descLimit: 220,
    frameClass: `block no-underline text-inherit w-full max-w-[${width}px] ${bg} ${radius} overflow-hidden ${border} ${shadow} ${font}`,
    mediaBoxClass,
    bodyClass: 'px-[16px] py-[14px] flex flex-col gap-[6px]',
    titleClass: `text-[${H}px] ${weight} ${headline} ${lh} m-0`,
    descriptionClass: `text-[${D}px] ${desc} ${lh} line-clamp-3 m-0`,
    ...metaShared
  }
}

const serializeTailwindStyle = config =>
  JSON.stringify(tailwindStyle(config), null, 2)

// Picks the renderer + serialized style for a snippet. With Tailwind on, the
// component carries Tailwind classes instead of inline styles.
const rendererFor = (config, { typescript = false, tailwind } = {}) => {
  const useTw = tailwind === undefined ? !!config.tailwind : tailwind
  const base = useTw ? RUNTIME_RENDERER_TW : RUNTIME_RENDERER
  return {
    useTw,
    STYLE: useTw ? serializeTailwindStyle(config) : serializeStyle(config),
    RENDERER: typescript ? toTypeScript(base) : base
  }
}

// A note added to the generated file header when Tailwind mode is on. `prefix`
// is the per-line comment marker (` * ` for block comments, `  ` for the HTML
// comments used by the Vue/Svelte headers).
const twHeaderNote = (useTw, prefix = ' * ') =>
  useTw
    ? `\n${prefix}Styled with Tailwind CSS — include this file in your Tailwind 'content'\n${prefix}config (Tailwind v3.3+) so the classes below are generated.`
    : ''

const indent = (src, pad) =>
  src
    .split('\n')
    .map(line => (line ? pad + line : line))
    .join('\n')

// Derive a strict-mode-clean TypeScript variant of a shared JS blob by typing
// every `function` parameter as `any`. The blobs only declare plain functions
// (no destructuring/defaults) and never contain the word `function` inside a
// string literal, so this stays a safe, mechanical transform.
const toTypeScript = src =>
  src.replace(
    /function(\s+[A-Za-z0-9_$]+)?\s*\(([^)]*)\)/g,
    (match, name, params) => {
      const typed = params
        .split(',')
        .map(param => param.trim())
        .filter(Boolean)
        .map(param => `${param}: any`)
        .join(', ')
      return `function${name || ''} (${typed})`
    }
  )

/* ─── Per-framework generators ─────────────────────────────────────────── */

export const generateReact = config => {
  const { STYLE, RENDERER, useTw } = rendererFor(config)
  return `/*
 * Link preview — generated by microlink.io/integrations/builder
 * Zero dependencies. Drop this file in and render it with a url.${twHeaderNote(
   useTw
 )}
 *
 *   import LinkPreview from './LinkPreview'
 *
 *   <LinkPreview url='https://github.com' />
 *   <LinkPreview url='https://github.com' apiKey='YOUR_KEY' />   // Pro
 */
import { useEffect, useState } from 'react'

const STYLE = ${STYLE}

${RENDERER}

${FETCH_CORE}

export default function LinkPreview ({ url, apiKey }) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    let active = true
    microlinkFetch(url, apiKey).then(data => {
      if (active && data) setHtml(renderCard(data, STYLE))
    })
    return () => { active = false }
  }, [url, apiKey])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
`
}

export const generateTypeScript = config => {
  const { STYLE, RENDERER, useTw } = rendererFor(config, { typescript: true })
  return `/*
 * Link preview — generated by microlink.io/integrations/builder
 * Zero dependencies, fully typed. Drop this file in and render it with a url.${twHeaderNote(
   useTw
 )}
 *
 *   import LinkPreview from './LinkPreview'
 *
 *   <LinkPreview url='https://github.com' />
 *   <LinkPreview url='https://github.com' apiKey='YOUR_KEY' />   // Pro
 */
import { useEffect, useState } from 'react'

type LinkPreviewProps = {
  url: string
  apiKey?: string
}

const STYLE = ${STYLE}

${RENDERER}

${toTypeScript(FETCH_CORE)}

export default function LinkPreview ({ url, apiKey }: LinkPreviewProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    let active = true
    microlinkFetch(url, apiKey).then(data => {
      if (active && data) setHtml(renderCard(data, STYLE))
    })
    return () => { active = false }
  }, [url, apiKey])

  return <div dangerouslySetInnerHTML={{ __html: html }} />
}
`
}

export const generateVue = config => {
  const { STYLE, RENDERER, useTw } = rendererFor(config)
  return `<!--
  Link preview — generated by microlink.io/integrations/builder
  Zero dependencies. Drop this file in and render it with a url.${twHeaderNote(
    useTw,
    '  '
  )}

    import LinkPreview from './LinkPreview.vue'

    <LinkPreview url="https://github.com" />
    <LinkPreview url="https://github.com" api-key="YOUR_KEY" />   (api-key = Pro)
-->
<template>
  <div v-html="html"></div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const props = defineProps({ url: String, apiKey: String })

const STYLE = ${indent(STYLE, '')}

${RENDERER}

${FETCH_CORE}

const html = ref('')

watchEffect(onCleanup => {
  if (!props.url) return
  let active = true
  onCleanup(() => { active = false })
  microlinkFetch(props.url, props.apiKey).then(data => {
    if (active && data) html.value = renderCard(data, STYLE)
  })
})
</script>
`
}

export const generateAngular = config => {
  const { STYLE, RENDERER, useTw } = rendererFor(config)
  return `/*
 * Link preview — generated by microlink.io/integrations/builder
 * Zero dependencies, standalone. Add LinkPreviewComponent to your component
 * imports, then use the <link-preview> element.${twHeaderNote(useTw)}
 *
 *   import { LinkPreviewComponent } from './link-preview.component'
 *
 *   <link-preview url="https://github.com"></link-preview>
 *   <link-preview url="https://github.com" apiKey="YOUR_KEY"></link-preview>
 */
import { Component, Input, OnChanges } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

const STYLE = ${STYLE}

${RENDERER}

${FETCH_CORE}

@Component({
  selector: 'link-preview',
  standalone: true,
  template: '<div [innerHTML]="html"></div>'
})
export class LinkPreviewComponent implements OnChanges {
  @Input() url!: string
  @Input() apiKey?: string
  html: SafeHtml = ''
  private token = 0

  constructor (private sanitizer: DomSanitizer) {}

  ngOnChanges () {
    if (!this.url) return
    const current = ++this.token
    microlinkFetch(this.url, this.apiKey).then(data => {
      // Ignore a slow earlier response once a newer url is in flight.
      if (current === this.token && data) this.html = this.sanitizer.bypassSecurityTrustHtml(renderCard(data, STYLE))
    })
  }
}
`
}

export const generateSvelte = config => {
  const { STYLE, RENDERER, useTw } = rendererFor(config)
  return `<!--
  Link preview — generated by microlink.io/integrations/builder
  Zero dependencies. Drop this file in and render it with a url.${twHeaderNote(
    useTw,
    '  '
  )}

    import LinkPreview from './LinkPreview.svelte'

    <LinkPreview url="https://github.com" />
    <LinkPreview url="https://github.com" apiKey="YOUR_KEY" />   (apiKey = Pro)
-->
<script>
  export let url
  export let apiKey = undefined

  const STYLE = ${indent(STYLE, '  ').trimStart()}

${indent(RENDERER, '  ')}

${indent(FETCH_CORE, '  ')}

  let html = ''
  let token = 0
  $: if (url) {
    const current = ++token
    microlinkFetch(url, apiKey).then(data => {
      // Ignore a slow earlier response once a newer url is in flight.
      if (current === token && data) html = renderCard(data, STYLE)
    })
  }
</script>

<div>{@html html}</div>
`
}

export const generateVanilla = config => {
  const STYLE = serializeStyle(config)
  return `/*
 * Link preview — generated by microlink.io/integrations/builder
 * Zero dependencies. Targets ES2019+.
 *
 *   microlink('a')                              // replace every <a> with a card
 *   microlink('.link-previews')                 // replace matched elements
 *   microlink('.link-previews', { size: 'large', apiKey: 'YOUR_KEY' })
 */
;(function (global) {
  var BAKED_STYLE = ${indent(STYLE, '  ').trimStart()}

${indent(RUNTIME_RENDERER, '  ')}

${indent(FETCH_CORE, '  ')}

  function applyOptions (style, options) {
    var next = {}
    for (var k in style) next[k] = style[k]
    if (options.size === 'small') next.variant = 'small'
    else if (options.size === 'large') next.variant = 'large'
    else if (options.size === 'medium') next.variant = 'wide'
    return next
  }

  function microlink (selector, options) {
    options = options || {}
    var style = applyOptions(BAKED_STYLE, options)
    var nodes = document.querySelectorAll(selector)
    Array.prototype.forEach.call(nodes, function (el) {
      var url = el.getAttribute('href') || el.getAttribute('data-url')
      if (!url) return
      microlinkFetch(url, options.apiKey).then(function (data) {
        if (!data) return
        var wrapper = document.createElement('div')
        wrapper.innerHTML = renderCard(data, style)
        var card = wrapper.firstElementChild
        if (card) el.replaceWith(card)
      })
    })
  }

  global.microlink = microlink
})(typeof window !== 'undefined' ? window : this)
`
}

export const generateAstro = config => {
  const { STYLE, RENDERER, useTw } = rendererFor(config, { typescript: true })
  return `---
/*
 * Link preview — generated by microlink.io/integrations/builder
 * Zero dependencies. Fetched on the server at render time, so the card ships as
 * static HTML — no client JS, SEO-friendly. Import it, then render with a url.${twHeaderNote(
   useTw
 )}
 *
 *   import LinkPreview from '../components/LinkPreview.astro'
 *
 *   <LinkPreview url="https://github.com" />
 *   <LinkPreview url="https://github.com" apiKey="YOUR_KEY" />   // Pro
 */
interface Props {
  url: string
  apiKey?: string
}

const { url, apiKey } = Astro.props

const STYLE = ${STYLE}

${RENDERER}

${toTypeScript(FETCH_CORE)}

const data = await microlinkFetch(url, apiKey)
const html = data ? renderCard(data, STYLE) : ''
---

<Fragment set:html={html} />
`
}

export const GENERATORS = {
  React: generateReact,
  TypeScript: generateTypeScript,
  Vue: generateVue,
  Angular: generateAngular,
  Svelte: generateSvelte,
  Astro: generateAstro,
  Vanilla: generateVanilla
}

// Filenames used by the builder's "Download" action, keyed by the labels above.
export const FILENAMES = {
  React: 'LinkPreview.jsx',
  TypeScript: 'LinkPreview.tsx',
  Vue: 'LinkPreview.vue',
  Angular: 'link-preview.component.ts',
  Svelte: 'LinkPreview.svelte',
  Astro: 'LinkPreview.astro',
  Vanilla: 'microlink.js'
}

// Syntax-highlight language per tab. Most labels highlight fine by default, but
// `Vanilla`/`Vue` are reused on other pages for HTML snippets, so the editor
// maps them to the monochrome `html` theme — we override that here, per-tab,
// without affecting those pages. `sfc` keeps colors while muting the
// `<!-- -->` usage banner; `js`/`jsx` are plain colorful code.
export const HIGHLIGHT_ALIASES = {
  Vanilla: 'js',
  Vue: 'sfc',
  Svelte: 'sfc',
  Astro: 'jsx'
}
