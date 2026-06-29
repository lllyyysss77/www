// Single source of truth for the /screenshot/<lang> landing pages.
//
// Add an entry here when a new language landing ships (python, go, php, …) and
// it automatically slots into the "Use it in your language" block on the
// /screenshot product page — keeping every spoke internally linked rather than
// orphaned. Order is the display order.
export const LANG_LANDINGS = [
  { lang: 'nodejs', label: 'Node.js', href: '/screenshot/nodejs' }
]

export default LANG_LANDINGS
