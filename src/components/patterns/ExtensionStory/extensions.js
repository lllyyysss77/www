import { Camera, FileText } from 'react-feather'

import {
  PDF_EXTENSION_URL,
  SCREENSHOT_EXTENSION_URL
} from 'components/patterns/ChromeExtensionBanner/ChromeExtensionBanner'

// Violet ties the extension pages to the install-button gradient
// used by ChromeExtensionBanner (#ec4899 → #8b5cf6).
export const ACCENT = {
  text: 'violet7',
  bgSoft: 'violet0',
  bgEdge: 'violet1',
  highlight: 'violet5'
}

// Platform groups rendered on /extensions. Add a new entry here when the
// n8n / Zapier integrations ship and their extensions get a `platform` match.
export const PLATFORMS = [
  {
    id: 'chrome',
    label: 'Chrome extensions',
    description:
      'Native side-panel extensions that bring the Microlink API into your browser — no tabs, no context switching.'
  }
]

export const EXTENSIONS = [
  {
    slug: 'chrome/website-screenshot',
    platform: 'chrome',
    name: 'Web Page Screenshots',
    fullName: 'Microlink: Web Page Screenshots',
    icon: Camera,
    category: 'Screenshot API',
    blurb:
      'Capture, annotate, and download website screenshots from Chrome’s side panel — single URLs or batches of 50, with social-ready frames.',
    href: '/extensions/chrome/website-screenshot',
    storeUrl: SCREENSHOT_EXTENSION_URL,
    apiHref: '/screenshot',
    eventName: 'screenshot extension install'
  },
  {
    slug: 'chrome/website-pdf',
    platform: 'chrome',
    name: 'Website to PDF',
    fullName: 'Microlink: Website to PDF',
    icon: FileText,
    category: 'PDF API',
    blurb:
      'Convert websites to PDF in bulk — paste up to 100 links, pick paper format and margins, and download every document as a single ZIP.',
    href: '/extensions/chrome/website-pdf',
    storeUrl: PDF_EXTENSION_URL,
    apiHref: '/pdf',
    eventName: 'pdf extension install'
  }
]
