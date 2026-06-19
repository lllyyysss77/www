import { colors, layout, textGradient, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'

import {
  ACCENT,
  USE_CASES,
  DashedGridOverlay,
  Eyebrow,
  Section,
  SectionInner,
  StoryTag
} from 'components/patterns/UseCaseStory'
import Layout from 'components/patterns/Layout'

import { cdnUrl } from 'helpers/cdn-url'

const CompanyName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const CompanyLogo = styled('img')`
  ${theme({
    display: 'block',
    borderRadius: 2
  })}
  object-fit: cover;
`

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner css={theme({ textAlign: 'center' })}>
      <StoryTag
        accent={ACCENT}
        css={theme({ mb: [3, 3, 4, 4], display: 'inline-flex' })}
      >
        Use cases
      </StoryTag>
      <Text
        as='h1'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontSize: ['32px', '40px', '52px', '60px'],
          textAlign: 'center',
          letterSpacing: '-0.01em',
          lineHeight: 0,
          m: 0,
          scrollMarginTop: 4
        })}
      >
        Ways to build <LineBreak />
        with <span css={textGradient}>Microlink.</span>
      </Text>
      <Text
        as='p'
        css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small, mx: 'auto' })}
      >
        Practical, copy-pasteable recipes for getting more out of Microlink —
        often paired with other APIs. Not testimonials: real workflows you can
        ship today.
      </Text>
    </SectionInner>
  </Section>
)

const LogoBarSection = styled(Section)`
  ${theme({
    borderTop: 1,
    borderBottom: 1,
    borderColor: 'black10',
    py: [3, 3, 4, 4]
  })}
`

const LogoItem = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 2,
    flex: '0 0 auto'
  })}
`

const LogoBar = () => (
  <LogoBarSection>
    <SectionInner>
      <Eyebrow
        accent={ACCENT}
        css={theme({ pb: [3, 3, 4, 4], display: 'block', textAlign: 'center' })}
      >
        Pairs well with the tools you already use
      </Eyebrow>
      <Flex
        css={theme({
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: [4, 4, 5, 5]
        })}
      >
        {USE_CASES.map(({ slug, partner, icon }) => (
          <LogoItem key={slug}>
            <CompanyLogo
              src={icon}
              alt=''
              width='32'
              height='32'
              loading='lazy'
              decoding='async'
              css={theme({ width: '32px', height: '32px' })}
            />
            <CompanyName>{partner}</CompanyName>
          </LogoItem>
        ))}
      </Flex>
    </SectionInner>
  </LogoBarSection>
)

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 560px));
  ${theme({ gap: [3, 3, 4, 4] })}
  justify-content: center;
`

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const CardLink = styled(Link)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const UseCaseGrid = () => (
  <Section id='use-cases' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      <Eyebrow
        accent={ACCENT}
        css={theme({ pb: [3, 3, 4, 4], display: 'block', textAlign: 'center' })}
      >
        Use cases
      </Eyebrow>

      <Grid>
        {USE_CASES.map(({ slug, name, blurb, icon, category }) => (
          <Card key={slug}>
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <CompanyLogo
                src={icon}
                alt=''
                width='40'
                height='40'
                loading='lazy'
                decoding='async'
                css={theme({ width: '40px', height: '40px' })}
              />
              <CompanyName>{name}</CompanyName>
            </Flex>
            <Text css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}>
              {blurb}
            </Text>
            <StoryTag accent={ACCENT} css={theme({ alignSelf: 'flex-start' })}>
              {category}
            </StoryTag>
            <CardLink
              href={`/use-cases/${slug}`}
              css={theme({ color: 'link' })}
            >
              View use case →
            </CardLink>
          </Card>
        ))}
      </Grid>
    </SectionInner>
  </Section>
)

// The "Pairs well with the tools you already use" logo bar is hidden until
// there are more use cases to feature. Flip SHOW_LOGO_BAR to true to bring it
// back — the LogoBar component is intentionally kept below.
const SHOW_LOGO_BAR = false

const UseCasesIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      {SHOW_LOGO_BAR && <LogoBar />}
      <UseCaseGrid />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Use cases: practical ways to build with Microlink'
    description='Copy-pasteable recipes for getting more out of Microlink — often paired with other APIs. Real workflows you can ship today.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='WebPage'
  />
)

export default UseCasesIndexPage
