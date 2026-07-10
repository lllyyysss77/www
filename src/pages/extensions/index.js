import { breakpoints, colors, textGradient, theme } from 'theme'
import { Chrome } from 'react-feather'
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
  DashedGridOverlay,
  EXTENSIONS,
  Eyebrow,
  PLATFORMS,
  Section,
  SectionInner,
  StoryTag
} from 'components/patterns/ExtensionStory'
import {
  PdfPanelMockup,
  ScreenshotPanelMockup
} from 'components/patterns/ChromeExtensionBanner/ChromeExtensionBanner'
import Layout from 'components/patterns/Layout'

const HeroGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: start;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: 2fr 3fr;
    align-items: center;
  }
`

const MockupsRow = styled(Flex)`
  ${theme({
    gap: [3, 3, 4, 4],
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  })}

  > * {
    width: 280px;
    flex: 0 0 auto;
  }
`

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <HeroGrid>
        <Box>
          <StoryTag
            accent={ACCENT}
            css={theme({ mb: [3, 3, 4, 4], display: 'inline-flex' })}
          >
            Extensions
          </StoryTag>
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
            Microlink, <LineBreak />
            <span css={textGradient}>right where you work.</span>
          </Text>
          <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
            Screenshots and PDFs without leaving your browser. Every extension
            runs on the same Microlink API that processes millions of requests
            per week — free to install, no account needed.
          </Text>
          <Box css={theme({ pt: [3, 3, 4, 4] })}>
            <Text
              as='a'
              href='#extensions'
              css={theme({
                color: 'link',
                fontWeight: 'bold',
                fontSize: [1, 2, 2, 2],
                textDecoration: 'none'
              })}
            >
              Browse extensions →
            </Text>
          </Box>
        </Box>

        <MockupsRow aria-hidden='true'>
          <ScreenshotPanelMockup />
          <PdfPanelMockup />
        </MockupsRow>
      </HeroGrid>
    </SectionInner>
  </Section>
)

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
  }
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

const IconCircle = styled(Flex)`
  ${theme({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })}
`

const ExtensionName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 2,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const CardLink = styled(Link)`
  ${theme({
    fontWeight: 'bold',
    fontSize: [0, 1, 1, 1]
  })}
  margin-top: auto;
`

const PlatformBadge = () => (
  <Flex css={theme({ alignItems: 'center', gap: 1, color: 'black60' })}>
    <Chrome size={14} color={colors.black60} />
    <Text as='span' css={theme({ fontSize: 0, color: 'black60' })}>
      Chrome
    </Text>
  </Flex>
)

const ExtensionsGrid = () => (
  <Section id='extensions' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      {PLATFORMS.map(platform => {
        const list = EXTENSIONS.filter(
          extension => extension.platform === platform.id
        )
        if (list.length === 0) return null
        return (
          <Box key={platform.id}>
            <Eyebrow accent={ACCENT} css={theme({ pb: 2, display: 'block' })}>
              {platform.label}
            </Eyebrow>
            <Text
              as='p'
              css={theme({
                color: 'black70',
                fontSize: 1,
                lineHeight: 2,
                pb: [3, 3, 4, 4]
              })}
            >
              {platform.description}
            </Text>
            <Grid>
              {list.map(({ slug, name, blurb, icon: Icon, category, href }) => (
                <Card key={slug}>
                  <Flex
                    css={theme({
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 2
                    })}
                  >
                    <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                      <IconCircle css={theme({ bg: ACCENT.bgSoft })}>
                        <Icon size={20} color={colors[ACCENT.text]} />
                      </IconCircle>
                      <ExtensionName>{name}</ExtensionName>
                    </Flex>
                    <PlatformBadge />
                  </Flex>
                  <Text
                    css={theme({
                      color: 'black70',
                      fontSize: 1,
                      lineHeight: 2
                    })}
                  >
                    {blurb}
                  </Text>
                  <StoryTag
                    accent={ACCENT}
                    css={theme({ alignSelf: 'flex-start' })}
                  >
                    {category}
                  </StoryTag>
                  <CardLink href={href} css={theme({ color: ACCENT.text })}>
                    View extension →
                  </CardLink>
                </Card>
              ))}
            </Grid>
          </Box>
        )
      })}
    </SectionInner>
  </Section>
)

const ExtensionsIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <ExtensionsGrid />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Extensions: Microlink in your browser'
    description='Official Microlink browser extensions — capture website screenshots and convert web pages to PDF in bulk, straight from Chrome’s side panel.'
    schemaType='WebPage'
  />
)

export default ExtensionsIndexPage
