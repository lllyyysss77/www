# Use-Case Page Template

Canonical structure extracted from `src/pages/use-cases/upscale-extracted-images.js`. Copy this,
replace every `{{TOKEN}}`, and delete any section a specific use case genuinely doesn't need
(rare — keep the order). Lint with `npx standard` after writing. Never run a formatter.

Tokens:

- `{{SLUG}}` — topic slug, matches the filename and the registry. Never the brand.
- `{{PARTNER}}` — partner brand name (e.g. `Magnific`).
- `{{PARTNER_URL}}` — partner homepage (e.g. `https://magnific.com`).
- `{{PARTNER_LOGO}}` — logo filename in `static/images/use-cases/` (e.g. `magnific.svg`).
- `{{SCREENSHOT}}` / `{{SCREENSHOT_W}}` / `{{SCREENSHOT_H}}` — screenshot filename + real pixel size.
- `{{COMPONENT}}` — PascalCase page component name, topic-based (e.g. `UseCaseUpscaleImagesPage`).
- `{{MICROLINK_PRODUCT_HREF}}` — `/metadata`, `/screenshot`, `/pdf`, or `/embed` (see CTA routing).
- `{{H1}}`, `{{HERO_INTRO}}`, etc. — copy. Keep it plain and dev-honest; no marketing fluff.

```jsx
import { layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'

import ArrowLink from 'components/patterns/ArrowLink'
import {
  ACCENT,
  CtaSection,
  DashedGridOverlay,
  Eyebrow,
  Figure,
  FigureImage,
  MoreUseCases,
  Section,
  SectionInner,
  WhyCard
} from 'components/patterns/UseCaseStory'
import Layout from 'components/patterns/Layout'

import { cdnUrl } from 'helpers/cdn-url'

/* ─── Inline link to the partner ─────────────────────────────────────────── */

const InlineLink = styled('a')`
  ${theme({ color: 'link', fontWeight: 'bold' })}
  text-decoration: underline;
`

/* ─── Code blocks (verified against the partner API — see skill reference) ── */

// IMPORTANT: confirm every endpoint/header/field/response against the partner docs
// before writing these. See references/partner-api-verification.md.
const STEP_ONE_SNIPPET = `{{CODE_SNIPPET_1}}`

const STEP_TWO_SNIPPET = `{{CODE_SNIPPET_2}}`

const CodeStep = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const CodeBlock = ({ step, children }) => (
  <Box css={theme({ width: '100%', minWidth: 0 })}>
    <CodeStep css={theme({ color: ACCENT.text, pb: 2, display: 'block' })}>
      {step}
    </CodeStep>
    <CodeEditor
      language='js'
      autoHeight
      showFade={false}
      css={theme({ width: '100%', maxWidth: '100%' })}
    >
      {children}
    </CodeEditor>
  </Box>
)

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <Flex css={theme({ alignItems: 'center', gap: 2, pb: [3, 3, 4, 4] })}>
        <img
          src='/images/use-cases/{{PARTNER_LOGO}}'
          alt=''
          width='40'
          height='40'
          css={theme({
            display: 'block',
            borderRadius: 2,
            width: '40px',
            height: '40px'
          })}
          style={{ objectFit: 'cover' }}
          decoding='async'
        />
        <Text
          css={theme({
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1
          })}
        >
          Microlink + {{PARTNER}}
        </Text>
      </Flex>
      <Text
        as='h1'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontSize: ['32px', '40px', '52px', '60px'],
          textAlign: 'left',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          m: 0,
          scrollMarginTop: 4
        })}
      >
        {{H1}}
      </Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        {{HERO_INTRO}}
      </Text>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <ArrowLink
          href='{{MICROLINK_PRODUCT_HREF}}'
          css={theme({
            color: 'link',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3]
          })}
        >
          {{HERO_CTA_LABEL}}
        </ArrowLink>
      </Box>
    </SectionInner>
  </Section>
)

/* ─── What it does ───────────────────────────────────────────────────────── */

const WhatItDoes = () => (
  <Section css={theme({ pt: [3, 3, 4, 4], pb: 0 })}>
    <SectionInner>
      <Figure css={theme({ pt: 0, pb: 5 })}>
        <FigureImage
          src='/images/use-cases/{{SCREENSHOT}}'
          alt='{{SCREENSHOT_ALT}}'
          width='{{SCREENSHOT_W}}'
          height='{{SCREENSHOT_H}}'
          loading='eager'
          decoding='async'
          css={theme({ maxWidth: '800px' })}
        />
      </Figure>
      <Eyebrow accent={ACCENT} css={theme({ pb: 3, display: 'block' })}>
        What it does
      </Eyebrow>
      <Text as='h2' css={theme({ pb: [3, 3, 4, 4] })}>
        {{WHAT_H2}}
      </Text>
      <Text as='p' css={theme({ pb: 4 })}>
        {{WHAT_P1_BEFORE_LINK}}{' '}
        <InlineLink href='{{PARTNER_URL}}' target='_blank' rel='noopener'>
          {{PARTNER}}
        </InlineLink>{' '}
        {{WHAT_P1_AFTER_LINK}}
      </Text>
      <Text as='p'>
        {{WHAT_P2}}
      </Text>
    </SectionInner>
  </Section>
)

/* ─── Why it works (box / text / box / text rhythm) ──────────────────────── */

const UseCaseItem = styled(Text).attrs({ as: 'p' })`
  ${theme({ color: 'black70', lineHeight: 2 })}
`

const WhyItWorks = () => (
  <Section>
    <SectionInner>
      <Box css={theme({ pb: [4, 4, 5, 5], maxWidth: layout.large })}>
        <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
          Why it works
        </Eyebrow>
        <Text as='h2'>{{WHY_H2}}</Text>
        <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
          {{WHY_LEAD}}
        </Text>
      </Box>

      <Flex
        css={theme({
          gap: [3, 3, 4, 4],
          flexDirection: 'column',
          alignItems: 'stretch'
        })}
      >
        <WhyCard
          accent={ACCENT}
          number={1}
          kicker='{{WHY_1_KICKER}}'
          title='{{WHY_1_TITLE}}'
          body='{{WHY_1_BODY}}'
        />
        <UseCaseItem>{{WHY_1_PROSE}}</UseCaseItem>

        <WhyCard
          accent={ACCENT}
          number={2}
          kicker='{{WHY_2_KICKER}}'
          title='{{WHY_2_TITLE}}'
          body='{{WHY_2_BODY}}'
        />
        <UseCaseItem>{{WHY_2_PROSE}}</UseCaseItem>

        <WhyCard
          accent={ACCENT}
          number={3}
          kicker='{{WHY_3_KICKER}}'
          title='{{WHY_3_TITLE}}'
          body='{{WHY_3_BODY}}'
        />
        <UseCaseItem>{{WHY_3_PROSE}}</UseCaseItem>
      </Flex>
    </SectionInner>
  </Section>
)

/* ─── How it works ───────────────────────────────────────────────────────── */

const HowItWorks = () => (
  <Section id='how-it-works' css={theme({ pb: 0, scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        How it works
      </Eyebrow>
      <Text as='h2'>{{HOW_H2}}</Text>
      <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
        {{HOW_INTRO}}
      </Text>
      <Figure>
        <Flex
          css={theme({
            flexDirection: 'column',
            gap: [3, 3, 4, 4],
            alignItems: 'stretch'
          })}
        >
          <CodeBlock step='{{STEP_1_LABEL}}'>{STEP_ONE_SNIPPET}</CodeBlock>
          <CodeBlock step='{{STEP_2_LABEL}}'>{STEP_TWO_SNIPPET}</CodeBlock>
        </Flex>
      </Figure>
    </SectionInner>
  </Section>
)

/* ─── Learn more ─────────────────────────────────────────────────────────── */

const ResourceLink = ({ href, children }) => {
  const isExternal = href.startsWith('http')
  return (
    <ArrowLink
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener' : undefined}
      css={theme({ color: 'link', fontWeight: 'bold', fontSize: [1, 2, 2, 2] })}
    >
      {children}
    </ArrowLink>
  )
}

const LearnMore = () => (
  <Section css={theme({ pt: 0 })}>
    <SectionInner>
      <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
        Learn more
      </Eyebrow>
      <Text as='h2' css={theme({ pb: [3, 3, 4, 4] })}>
        Docs and resources
      </Text>
      <Flex css={theme({ flexDirection: 'column', gap: 3 })}>
        {/* Microlink links first (internal, stay in-tab) */}
        <ResourceLink href='{{MICROLINK_PRODUCT_HREF}}'>{{MICROLINK_PRODUCT_LABEL}}</ResourceLink>
        <ResourceLink href='/docs'>Microlink docs</ResourceLink>
        {/* Partner links after (external, open in new tab) */}
        <ResourceLink href='{{PARTNER_API_URL}}'>{{PARTNER}} API</ResourceLink>
        <ResourceLink href='{{PARTNER_DOCS_URL}}'>{{PARTNER}} docs</ResourceLink>
      </Flex>
    </SectionInner>
  </Section>
)

const {{COMPONENT}} = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <WhatItDoes />
      <WhyItWorks />
      <HowItWorks />
      <LearnMore />
      <CtaSection
        accent={ACCENT}
        headlinePrefix='{{CTA_PREFIX}}'
        headlineAccent='{{CTA_ACCENT}}'
        body='{{CTA_BODY}}'
        href='{{MICROLINK_PRODUCT_HREF}}'
        label='{{CTA_LABEL}}'
      />
      <MoreUseCases accent={ACCENT} currentSlug='{{SLUG}}' />
    </Box>
  </Layout>
)

/* ─── Head / SEO ─────────────────────────────────────────────────────────── */

export const Head = () => (
  <Meta
    title='{{HEAD_TITLE}}'
    description='{{HEAD_DESCRIPTION}}'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default {{COMPONENT}}
```

## Copy guidance

- **Hero CTA label ≠ bottom CTA label.** Both route to `{{MICROLINK_PRODUCT_HREF}}` but read differently.
- **`Head` title is topic-based, no brand suffix** — `Meta` appends ` — Microlink` automatically.
- **Why it works = box/text/box/text/box/text.** Each `WhyCard` (box) is followed by a prose
  `UseCaseItem` (text). Use the three cards for the technical edges (the URL/integration benefit,
  a real decision heuristic with numbers, and a fidelity/quality point), and the prose lines to
  weave in the concrete *use cases* and an honest *when it doesn't make sense* note.
- **JSX string attrs:** single quotes unless the string has an apostrophe — then double quotes
  (`title="Microlink's output URL is the partner's input."`).
- **Code blocks:** keep them short and copy-pasteable, no noisy comments, real schema only.
