import { colors, fonts, theme } from 'theme'
import { Archive, ChevronDown, X } from 'react-feather'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import MicrolinkLogo from 'components/logos/Microlink'

/* ─── Extension panel mockups ────────────────────────────
   Stylized but faithful replicas of the real side-panel
   UIs (see MICROLINK/extensions repo): light panel, white
   cards, dark pill toggles, uppercase field labels, and
   the pink → violet "Generate" button. Purely decorative —
   every instance renders inside an aria-hidden container. */

const PanelFrame = styled(Box)`
  ${theme({ width: '100%', borderRadius: 3, overflow: 'hidden' })}
  /* No global body font on this site: typography normally comes from the
     Text element, so raw divs (toggles, buttons, chips) must inherit the
     sans stack from the frame or they fall back to the browser serif. */
  font-family: ${fonts.sans};
  background: ${colors.gray0};
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.04);
`

const Titlebar = ({ title }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      gap: 2,
      px: '10px',
      py: '8px',
      bg: 'white',
      borderBottom: 1,
      borderColor: 'black05'
    })}
  >
    <Box css={theme({ width: '14px', height: '14px', flexShrink: 0 })}>
      <MicrolinkLogo />
    </Box>
    <Text
      css={theme({
        fontSize: '11px',
        fontWeight: 'bold',
        color: 'black80',
        lineHeight: 1
      })}
    >
      {title}
    </Text>
    <X
      size={12}
      color={colors.black40}
      style={{ marginLeft: 'auto', flexShrink: 0 }}
    />
  </Flex>
)

const PanelBody = styled(Flex)`
  ${theme({ flexDirection: 'column', gap: '8px', p: '10px' })}
`

const PanelCard = styled(Box)`
  ${theme({ bg: 'white', borderRadius: 2, p: '8px' })}
  border: 1px solid rgba(0, 0, 0, 0.05);
`

const FieldLabel = styled(Text)`
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  line-height: 1;
  color: ${props => props.$color};
`

const Hint = styled(Text)`
  font-size: 9px;
  line-height: 1.4;
  color: ${colors.black40};
`

const ToggleGroup = styled(Flex)`
  ${theme({ bg: 'gray1', borderRadius: 2, p: '2px', gap: '2px' })}
`

const ToggleOption = styled(Flex)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  white-space: nowrap;
  ${props =>
    props.$active
      ? `background: ${colors.gray9}; color: ${colors.white};`
      : `color: ${colors.black60};`}
`

const InputBox = styled(Box)`
  ${theme({ border: 1, borderColor: 'black10', borderRadius: 2, bg: 'white' })}
  padding: 6px 8px;
  font-size: 10px;
  line-height: 1.4;
  color: ${colors.black80};
`

const MonoLine = styled(Text)`
  font-family: ${fonts.mono};
  font-size: 9px;
  line-height: 1.7;
  color: ${colors.black60};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const MiniChip = styled(Box)`
  ${theme({ border: 1, borderColor: 'black10', borderRadius: 2, bg: 'white' })}
  padding: 3px 6px;
  font-size: 9px;
  font-weight: 700;
  line-height: 1;
  color: ${colors.black70};
  white-space: nowrap;
`

const SelectChip = ({ children, ...props }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 1,
      border: 1,
      borderColor: 'black10',
      borderRadius: 2,
      bg: 'white',
      px: '8px',
      py: '5px'
    })}
    {...props}
  >
    <Text
      css={theme({
        fontSize: '10px',
        fontWeight: 'bold',
        color: 'black80',
        lineHeight: 1
      })}
    >
      {children}
    </Text>
    <ChevronDown size={10} color={colors.black40} style={{ flexShrink: 0 }} />
  </Flex>
)

const GradientButton = styled(Flex)`
  align-items: center;
  justify-content: center;
  ${theme({ borderRadius: 2 })}
  padding: 7px 0;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: ${colors.white};
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
`

/* ─── Website to PDF ─────────────────────────────────────
   Signature features: bulk URL textarea, paper format and
   orientation options, everything bundled into one ZIP. */

export const PdfExtensionMockup = () => (
  <PanelFrame aria-hidden='true'>
    <Titlebar title='Microlink: Website to PDF' />
    <PanelBody>
      <PanelCard>
        <FieldLabel $color={colors.violet7}>Target URLs</FieldLabel>
        <InputBox css={theme({ mt: '6px' })}>
          <MonoLine>https://microlink.io</MonoLine>
          <MonoLine>https://github.com</MonoLine>
          <MonoLine>https://stripe.com</MonoLine>
        </InputBox>
        <Flex
          css={theme({
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: '6px'
          })}
        >
          <Hint>One URL per line · Max 100</Hint>
          <Hint
            css={`
              color: ${colors.violet7};
              font-weight: 700;
            `}
          >
            3/100
          </Hint>
        </Flex>
      </PanelCard>
      <PanelCard>
        <FieldLabel $color={colors.violet7}>PDF options</FieldLabel>
        <Flex css={theme({ alignItems: 'stretch', gap: '6px', mt: '6px' })}>
          <SelectChip css={{ flex: 1 }}>A4</SelectChip>
          <ToggleGroup css={{ flex: 2 }}>
            <ToggleOption $active>Portrait</ToggleOption>
            <ToggleOption>Landscape</ToggleOption>
          </ToggleGroup>
        </Flex>
      </PanelCard>
      <GradientButton>Generate PDFs</GradientButton>
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 2,
          borderRadius: 2,
          bg: 'violet0',
          px: '8px',
          py: '6px'
        })}
      >
        <Archive size={12} color={colors.violet7} style={{ flexShrink: 0 }} />
        <Text
          css={theme({
            fontSize: '10px',
            fontWeight: 'bold',
            color: 'black80',
            lineHeight: 1
          })}
        >
          website-pdfs.zip
        </Text>
        <Hint css='margin-left: auto;'>3 PDFs</Hint>
      </Flex>
    </PanelBody>
  </PanelFrame>
)

/* ─── Web Page Screenshots ───────────────────────────────
   Signature features: Capture vs Social Sharing modes,
   current-tab suggestion, and the gradient backgrounds
   behind the browser frame. */

const GRADIENT_DOTS = [
  'linear-gradient(135deg, #a855f7, #6b21a8)',
  'linear-gradient(135deg, #1e3a8a, #0f172a)',
  'linear-gradient(135deg, #fbbf24, #f59e0b)',
  'linear-gradient(135deg, #5eead4, #14b8a6)',
  'linear-gradient(135deg, #f472b6, #ec4899)',
  'linear-gradient(135deg, #93c5fd, #3b82f6)',
  'linear-gradient(135deg, #a78bfa, #7c3aed)'
]

const GradientDot = styled(Box)`
  width: 14px;
  height: 14px;
  border-radius: 50%;
  flex-shrink: 0;
  ${props =>
    props.$selected &&
    `box-shadow: 0 0 0 2px ${colors.white}, 0 0 0 3.5px ${colors.pink5};`}
`

export const ScreenshotExtensionMockup = () => (
  <PanelFrame aria-hidden='true'>
    <Titlebar title='Microlink: Web Page Screenshots' />
    <PanelBody>
      <ToggleGroup>
        <ToggleOption>Capture</ToggleOption>
        <ToggleOption $active>Social Sharing</ToggleOption>
      </ToggleGroup>
      <PanelCard>
        <FieldLabel $color={colors.pink7}>Target URL</FieldLabel>
        <InputBox css={theme({ mt: '6px' })}>github.com</InputBox>
        <Flex
          css={theme({
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            mt: '6px'
          })}
        >
          <Hint>https://github.com/</Hint>
          <MiniChip>Use current tab</MiniChip>
        </Flex>
      </PanelCard>
      <PanelCard>
        <FieldLabel $color={colors.pink7}>Background gradient</FieldLabel>
        <Flex css={theme({ alignItems: 'center', gap: '6px', mt: '8px' })}>
          {GRADIENT_DOTS.map((gradient, index) => (
            <GradientDot
              key={gradient}
              $selected={index === 0}
              style={{ background: gradient }}
            />
          ))}
        </Flex>
        <Flex
          css={theme({
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: '8px'
          })}
        >
          <Hint>Browser frame</Hint>
          <SelectChip>Dark</SelectChip>
        </Flex>
      </PanelCard>
      <GradientButton>Generate Screenshot</GradientButton>
    </PanelBody>
  </PanelFrame>
)
