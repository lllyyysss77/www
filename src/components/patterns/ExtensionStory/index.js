// Extension landings reuse the accent-agnostic primitives from the
// CustomerStory pattern so /extensions stays visually consistent with
// /use-cases. Only the extension registry and the "More extensions"
// section live here.

export { ACCENT, EXTENSIONS, PLATFORMS } from './extensions'
export {
  SECTION_PX,
  SECTION_PY,
  SECTION_MAX_WIDTH,
  Section,
  SectionInner,
  Caption,
  Figure,
  FigureImage
} from 'components/patterns/CustomerStory/primitives'
export { DashedGridOverlay } from 'components/patterns/CustomerStory/DashedGridOverlay'
export { Eyebrow, StoryTag } from 'components/patterns/CustomerStory/chrome'
export { CtaSection } from 'components/patterns/CustomerStory/CtaSection'
export { WhyCard } from 'components/patterns/CustomerStory/WhyCards'
export { FeatureCard, FeatureGrid } from './FeatureGrid'
export { MoreExtensions } from './MoreExtensions'
