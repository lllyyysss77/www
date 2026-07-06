// Features mirror the use-case data shape, but describe API capabilities —
// proxy, caching, headers, data extraction — rather than customer outcomes.
// There is no quote / author / role here on purpose.

// pink / secondary / pinky / pinkest — reserved for `src/pages/features/*.js`.
export const ACCENT = {
  text: 'secondary',
  bgSoft: 'pinky',
  bgEdge: 'pinkest',
  highlight: 'pink5'
}

export const FEATURES = [
  {
    slug: 'scraping',
    name: 'Data Extraction',
    footerLabel: 'Web scraping',
    tag: 'Free + Pro',
    category: 'Scraping',
    param: 'data',
    oneLiner:
      'Turn any URL into structured JSON with CSS selectors — no headless browser to run.',
    snippet: "data: { headline: { selector: '.titleline > a', attr: 'text' } }"
  },
  {
    slug: 'proxy',
    name: 'Automatic Proxy Resolution',
    footerLabel: 'Proxy resolution',
    tag: 'Pro',
    category: 'Anti-bot & unblocking',
    param: 'proxy',
    oneLiner:
      'Bypass Cloudflare, DataDome, and Akamai antibots with zero configuration.',
    snippet: 'x-fetch-mode: fetch-proxy'
  },
  {
    slug: 'ttl',
    name: 'Configurable TTL',
    footerLabel: 'Configurable TTL',
    tag: 'Pro',
    category: 'Performance & caching',
    param: 'ttl',
    oneLiner:
      'Cache hits never count against your quota — tune lifetime per request, from 1 minute to 31 days.',
    snippet: "ttl: '1d', staleTtl: '12h'"
  },
  {
    slug: 'headers',
    name: 'Custom HTTP Headers',
    footerLabel: 'Custom headers',
    tag: 'Pro',
    category: 'Authentication & access',
    param: 'headers',
    oneLiner:
      'Forward cookies, tokens, and any header to the target page — secrets never touch the URL.',
    snippet: "headers: { 'x-api-header-cookie': 'session=…' }"
  }
]
