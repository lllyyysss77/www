import { colors, layout, theme, transition } from 'theme'
import { Archive, Check, Chrome } from 'react-feather'
import styled, { css } from 'styled-components'
import React from 'react'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { trackEvent } from 'helpers/plausible'

export const PDF_EXTENSION_URL =
  'https://chromewebstore.google.com/detail/microlink-website-to-pdf/ljffiabcijcclcicihhjmoibjjnlkdon'

const cardBase = css`
  ${theme({
    width: '100%',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    overflow: 'hidden'
  })}
  background: linear-gradient(120deg, #ffffff 0%, #fdfaff 60%, #fff5fa 100%);
  transition: box-shadow ${transition.medium}, transform ${transition.medium};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`

const PromoCard = styled(Flex)`
  ${cardBase}
  ${theme({ flexDirection: 'column', p: [3, 3, 4, 4] })}
`

const CompactCard = styled(Flex)`
  ${cardBase}
  ${theme({
    flexDirection: ['column', 'column', 'row', 'row'],
    alignItems: ['flex-start', 'flex-start', 'center', 'center'],
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 3,
    p: [3, 3, 4, 4]
  })}
`

const ChromeChip = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 2,
    py: 1,
    px: 2,
    border: 1,
    borderColor: 'black10',
    borderRadius: 2,
    bg: 'white',
    width: 'fit-content'
  })}
`

const installButtonBase = css`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    py: '12px',
    px: 4,
    borderRadius: 2,
    fontSize: 1,
    fontFamily: 'sans',
    fontWeight: 'bold'
  })}
  box-sizing: border-box;
  color: white;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  box-shadow: 0 4px 14px 0 rgba(236, 72, 153, 0.39);
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity ${transition.medium}, transform ${transition.short},
    box-shadow ${transition.medium};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px 0 rgba(236, 72, 153, 0.45);
    color: white;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px 0 rgba(236, 72, 153, 0.3);
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const InstallButton = styled('a')`
  ${installButtonBase}
  width: 100%;
`

const InstallButtonInline = styled('a')`
  ${installButtonBase}
  flex-shrink: 0;
`

/* ─── Side panel mockup ──────────────────────────────────
   Stylized preview of the extension running in Chrome's
   side panel: a batch of converted URLs plus the final
   ZIP download row. Purely decorative. */

const PanelFrame = styled(Box)`
  ${theme({
    width: '100%',
    borderRadius: 3,
    bg: 'white',
    p: 3
  })}
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.04);
`

const SkeletonBar = styled(Box)`
  ${theme({
    height: '8px',
    borderRadius: 2,
    bg: 'black05'
  })}
`

const PanelRow = ({ width }) => (
  <Flex css={theme({ alignItems: 'center', gap: 2, py: 2 })}>
    <Box
      css={theme({
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        flexShrink: 0
      })}
      style={{ background: colors.black10 }}
    />
    <SkeletonBar css={{ width }} />
    <Check
      size={14}
      color={colors.close}
      style={{ marginLeft: 'auto', flexShrink: 0 }}
    />
  </Flex>
)

const PanelMockup = () => (
  <PanelFrame aria-hidden='true'>
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        pb: 2,
        borderBottom: 1,
        borderColor: 'black05'
      })}
    >
      <Chrome size={14} color={colors.black60} />
      <Caps css={theme({ fontSize: 0, color: 'black60' })}>Side panel</Caps>
      <Caps css={theme({ fontSize: 0, color: 'black40', ml: 'auto' })}>
        100 of 100
      </Caps>
    </Flex>
    <Box css={theme({ py: 1 })}>
      <PanelRow width='72%' />
      <PanelRow width='55%' />
      <PanelRow width='64%' />
    </Box>
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        mt: 1,
        py: 2,
        px: 2,
        borderRadius: 2
      })}
      style={{ background: colors.pinkest }}
    >
      <Archive size={14} color={colors.black80} />
      <Text css={theme({ fontSize: 0, fontWeight: 'bold', color: 'black80' })}>
        website-pdfs.zip
      </Text>
      <Text css={theme({ fontSize: 0, color: 'black60', ml: 'auto' })}>
        100 PDFs
      </Text>
    </Flex>
  </PanelFrame>
)

const DEFAULT_TITLE = 'Convert websites to PDF right from Chrome'

const DEFAULT_HIGHLIGHTS = [
  'Up to 100 URLs per batch',
  'PDFs bundled in one ZIP',
  '24-hour PDF history',
  'No account needed'
]

const ChromeExtensionBanner = ({
  title = DEFAULT_TITLE,
  description,
  highlights = DEFAULT_HIGHLIGHTS,
  eventName = 'pdf extension install',
  ...props
}) => (
  <Container
    as='section'
    id='chrome-extension'
    css={theme({
      maxWidth: layout.normal,
      px: [3, 3, 0, 0],
      pt: [3, 3, 4, 4],
      pb: [2, 2, 3, 3]
    })}
    {...props}
  >
    <PromoCard>
      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['flex-start', 'flex-start', 'center', 'center'],
          gap: [3, 3, 4, 5]
        })}
      >
        <Box css={{ flex: 1, minWidth: 0 }}>
          <ChromeChip>
            <Chrome size={14} color={colors.black80} />
            <Caps css={theme({ fontSize: 0, fontWeight: 'bold' })}>
              Chrome extension
            </Caps>
          </ChromeChip>
          <Text
            as='h2'
            css={theme({
              fontSize: [3, 3, '24px', '24px'],
              fontWeight: 'bold',
              color: 'black',
              pt: 3
            })}
          >
            {title}
          </Text>
          <Text
            css={theme({
              fontSize: '16px',
              color: 'black80',
              lineHeight: 2,
              pt: 2
            })}
          >
            {description}
          </Text>
          <Box
            css={theme({
              display: 'grid',
              gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr'],
              gap: [2, 2, 2, 2],
              pt: 3
            })}
          >
            {highlights.map(highlight => (
              <Flex
                key={highlight}
                css={theme({ alignItems: 'center', gap: 1 })}
              >
                <Check
                  size={14}
                  color={colors.close}
                  style={{ flexShrink: 0 }}
                />
                <Text css={theme({ fontSize: 0, color: 'black80' })}>
                  {highlight}
                </Text>
              </Flex>
            ))}
          </Box>
        </Box>
        <Flex
          css={theme({
            flexShrink: 0,
            flexDirection: 'column',
            gap: 3,
            width: ['100%', '100%', '280px', '280px']
          })}
        >
          <Box css={theme({ display: ['none', 'none', 'block', 'block'] })}>
            <PanelMockup />
          </Box>
          <InstallButton
            href={PDF_EXTENSION_URL}
            target='_blank'
            rel='nofollow noopener noreferrer'
            onClick={() => trackEvent(eventName)}
          >
            <Chrome size={18} style={{ flexShrink: 0 }} />
            Add to Chrome — it&apos;s free
          </InstallButton>
        </Flex>
      </Flex>
      <Box
        css={theme({
          mt: [3, 3, 4, 4],
          pt: [3, 3, 4, 4],
          borderTop: 1,
          borderColor: 'black10'
        })}
      >
        <Text
          css={theme({
            fontSize: [0, 0, 1, 1],
            color: 'black60',
            lineHeight: 2,
            textAlign: 'center'
          })}
        >
          25 conversions/day included — need serious volume?
          <br />
          <Link href='/pdf#pricing'>
            Upgrade for up to 46,000 conversions per month
          </Link>
          .
        </Text>
      </Box>
    </PromoCard>
  </Container>
)

/* ─── Compact variant ────────────────────────────────────
   Slim, single-row version of the banner for spots that
   already sit inside a busy section (e.g. the /pdf
   playground). Shares the card, chip, and gradient button
   with the full banner, without the mockup, highlights, or
   pricing footer. */

const COMPACT_DEFAULT_TITLE = 'Also available as a Chrome extension'

const COMPACT_DEFAULT_DESCRIPTION = (
  <>
    Bulk convert up to 100&nbsp;URLs into PDFs from Chrome&apos;s side panel —
    every file bundled in one ZIP.
  </>
)

export const ChromeExtensionBannerCompact = ({
  title = COMPACT_DEFAULT_TITLE,
  description = COMPACT_DEFAULT_DESCRIPTION,
  buttonLabel = "Add to Chrome — it's free",
  eventName = 'pdf extension install',
  ...props
}) => (
  <CompactCard {...props}>
    <Box css={{ flex: 1, minWidth: '260px' }}>
      <Text
        css={theme({
          fontSize: [2, 2, '20px', '20px'],
          fontWeight: 'bold',
          color: 'black'
        })}
      >
        {title}
      </Text>
      <Text
        css={theme({
          fontSize: '16px',
          color: 'black80',
          lineHeight: 2,
          pt: 1
        })}
      >
        {description}
      </Text>
    </Box>
    <InstallButtonInline
      href={PDF_EXTENSION_URL}
      target='_blank'
      rel='nofollow noopener noreferrer'
      onClick={() => trackEvent(eventName)}
    >
      <Chrome size={18} style={{ flexShrink: 0 }} />
      {buttonLabel}
    </InstallButtonInline>
  </CompactCard>
)

export default ChromeExtensionBanner
