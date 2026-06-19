# UseCaseStory module & registry

The use-cases section reuses the `customers` architecture with no testimonials. Everything a
page may import comes from one barrel: `components/patterns/UseCaseStory`.

## Barrel: `src/components/patterns/UseCaseStory/index.js`

```js
export { ACCENT, USE_CASES } from './use-cases'
export {
  SECTION_PX, SECTION_PY, SECTION_MAX_WIDTH,
  Section, SectionInner, Caption, Figure, FigureImage
} from 'components/patterns/CustomerStory/primitives'
export { DashedGridOverlay } from 'components/patterns/CustomerStory/DashedGridOverlay'
export { Eyebrow, StoryTag } from 'components/patterns/CustomerStory/chrome'
export { CtaSection } from 'components/patterns/CustomerStory/CtaSection'
export { WhyCard } from 'components/patterns/CustomerStory/WhyCards'
export { MoreUseCases } from './MoreUseCases'
```

Rules:

- Import these by name. **Never redefine them locally.**
- **Never edit the `CustomerStory` files** — the use-cases section borrows their accent-agnostic
  primitives, but customers and use-cases are independent.
- The only use-case-specific files are `use-cases.js` (data) and `MoreUseCases.js` (the
  "More use cases" carousel, a mirror of `MoreCustomers`).

## Export reference

| Export | Notes |
|---|---|
| `ACCENT` | `{ text: 'link', bgSoft: 'blue0', bgEdge: 'blue1', highlight: 'blue5' }`. Always blue. Pass `accent={ACCENT}` to accent-aware components. |
| `USE_CASES` | The registry array. Drives the listing grid, the (hidden) logo bar, and `MoreUseCases`. |
| `Section`, `SectionInner` | Page section wrapper + max-width container. |
| `Caption`, `Figure`, `FigureImage` | Layout primitives. `FigureImage` = rounded, shadowed, centered, `maxWidth: 600px` default. |
| `DashedGridOverlay` | Decorative background; render once per page inside `<Layout>`. |
| `Eyebrow` | Accent label. `<Eyebrow accent={ACCENT}>`. |
| `StoryTag` | Pill tag. `<StoryTag accent={ACCENT}>`. Used on the listing (hero tag + card category). |
| `CtaSection` | Shared CTA panel. Props: `accent, headlinePrefix, headlineAccent, body, href, label`, optional `mt`. Background is hardcoded `colors.link` → keep ACCENT blue. |
| `WhyCard` | Props: `accent, number, kicker, title, body`. One boxed card. |
| `MoreUseCases` | Props: `accent, currentSlug`. Filters out `currentSlug`; **self-omits when < 2 entries.** |

Note there is **no** `Testimonial` and **no** `FlowDiagram` in use-cases pages — that is
deliberate. Use code blocks (`CodeEditor`) instead of a flow diagram.

## Registry: `src/components/patterns/UseCaseStory/use-cases.js`

```js
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
    partner: 'Magnific',
    partnerUrl: 'https://magnific.com',
    blurb:
      'Extract the main image from any URL and upscale it to print-ready resolution with AI.',
    icon: '/images/use-cases/magnific.svg',
    category: 'Metadata + AI Upscaling',
    summary:
      "Microlink pulls the main image — and its real dimensions — out of any web page. When it isn't sharp enough, Magnific upscales it with AI, straight from the hosted URL."
  }
]
```

Append a new object per use case. Field usage:

- **grid card** (`index.js`) → `slug, name, blurb, icon, category`
- **logo bar** (`index.js`, currently hidden) → `slug, partner, icon`
- **`MoreUseCases`** → `slug, name, blurb, icon`
- `partnerUrl` — optional reference. `summary` — optional/legacy (the old featured hero card used
  it; that card was removed). New entries can omit `summary`.

`slug` MUST equal the page filename (`src/pages/use-cases/<slug>.js`) and the
`MoreUseCases currentSlug` on that page.

## The listing page — you don't edit it per use case

`src/pages/use-cases/index.js` is fully data-driven:

- **Hero** — centered text only (`StoryTag` "Use cases", gradient h1, subtext). No card, no link.
- **LogoBar** — "Pairs well with the tools you already use", hidden behind `const SHOW_LOGO_BAR = false`.
- **UseCaseGrid** — centered grid:
  `grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 560px)); justify-content: center;`
  One card → ~560px centered; two → side-by-side; mobile → one column. Each card: logo + name,
  blurb, category `StoryTag`, "View use case →" link to `/use-cases/<slug>`.

Adding a registry entry makes it appear in the grid (and logo bar, once shown) automatically.

## Re-enabling the logo bar

When the **second** use case ships, the logo bar becomes worth showing. Flip the flag in
`index.js`:

```js
const SHOW_LOGO_BAR = true
```

The `LogoBar` component and its styles are intentionally kept in the file for this.
