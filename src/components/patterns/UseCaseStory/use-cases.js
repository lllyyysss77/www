// Use cases mirror the customer-story data shape, but describe practical ways
// to build with Microlink — often combined with other APIs — rather than
// testimonials. There is no quote / author / role here on purpose.

export const ACCENT = {
  text: 'link',
  bgSoft: 'blue0',
  bgEdge: 'blue1',
  highlight: 'blue5'
}

export const USE_CASES = [
  {
    slug: 'upscale-extracted-images',
    name: 'Microlink + Magnific',
    // partner shown in the integrations bar
    partner: 'Magnific',
    partnerUrl: 'https://magnific.com',
    blurb:
      'Extract the main image from any URL and upscale it to print-ready resolution with AI.',
    // TODO: replace with the real Magnific logo asset
    icon: '/images/use-cases/magnific.svg',
    category: 'Metadata + AI Upscaling',
    summary:
      "Microlink pulls the main image — and its real dimensions — out of any web page. When it isn't sharp enough, Magnific upscales it with AI, straight from the hosted URL."
  }
]
