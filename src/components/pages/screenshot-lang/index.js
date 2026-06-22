import { layout, colors, theme, borders } from 'theme'
import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Check as CheckIcon, X as XIcon } from 'react-feather'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Terminal from 'components/elements/Terminal/Terminal'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { withTitle } from 'helpers/hoc/with-title'
import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

// Shared layout tokens — mirrors the main /screenshot page so both feel of a
// piece (section rhythm, two-column hero proportions).
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]
const CONTENT_MAX_WIDTH = [
  '100%',
  '100%',
  '100%',
  `calc(${layout.large} * 1.7)`
]
const MAIN_WIDTH = '55%'
const SECONDARY_WIDTH = '45%'
const COLUMN_GAP = [1, 1, 1, 5]

const CODE_FULL_WIDTH = {
  '& > div, & > div > div:first-child': { width: '100%' }
}

const CodeBlock = ({ code, ...props }) => (
  <Box css={[theme({ width: '100%' }), CODE_FULL_WIDTH]} {...props}>
    <CodeEditor autoHeight language={code.language} title={code.title}>
      {code.source}
    </CodeEditor>
  </Box>
)

// ── Hero interactive demo ────────────────────────────────────────────────────
// A code block whose URL string is typed live, kept in sync with a screenshot
// that cycles through the configured hosts. Colors mirror the site's syntax
// theme (keyword → secondary, identifier → link, string/sign → gray9).
const SH_COLOR = {
  kw: colors.secondary,
  fn: colors.link,
  str: colors.gray9,
  sign: colors.gray9,
  url: colors.gray9
}

const caretBlink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`
const Caret = styled('span')`
  color: ${colors.gray6};
  font-weight: 400;
  animation: ${caretBlink} 1.05s steps(1, start) infinite;
`

const TYPE_MS = 90
const DELETE_MS = 45
const HOLD_MS = 2200
const BLANK_MS = 360

const screenshotSrc = host =>
  `https://api.microlink.io?url=https://${host}&screenshot&meta=false&embed=screenshot.url`

const codeToText = (lines, typed) =>
  lines
    .map(line =>
      line.map(([text, role]) => (role === 'url' ? typed : text)).join('')
    )
    .join('\n')

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const HeroDemo = ({ code, demo }) => {
  const hosts = demo.hosts
  const [index, setIndex] = useState(0)
  const [typed, setTyped] = useState(hosts[0].host)
  const [deleting, setDeleting] = useState(false)
  const [shownIndex, setShownIndex] = useState(0)

  // Typewriter: type the host, hold, delete, advance to the next host.
  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const target = hosts[index].host
    const typedFull = !deleting && typed === target
    // Stop for good once the final host is fully typed — no loop back.
    if (typedFull && index === hosts.length - 1) return undefined
    const deletedAll = deleting && typed === ''
    const delay = typedFull
      ? HOLD_MS
      : deletedAll
        ? BLANK_MS
        : deleting
          ? DELETE_MS
          : TYPE_MS

    const id = setTimeout(() => {
      if (typedFull) return setDeleting(true)
      if (deletedAll) {
        setDeleting(false)
        return setIndex(i => (i + 1) % hosts.length)
      }
      setTyped(prev =>
        deleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1)
      )
    }, delay)
    return () => clearTimeout(id)
  }, [typed, deleting, index, hosts])

  // Swap the screenshot the moment its URL is fully typed.
  useEffect(() => {
    if (!deleting && typed === hosts[index].host) setShownIndex(index)
  }, [typed, deleting, index, hosts])

  const plainText = codeToText(code.lines, typed)

  return (
    <>
      <Box css={[theme({ width: '100%' }), CODE_FULL_WIDTH]}>
        <Terminal
          title={code.title}
          text={plainText}
          blinkCursor={false}
          autoHeight
        >
          <code style={{ fontFamily: 'inherit' }}>
            {code.lines.map((line, li) => (
              <span key={li} style={{ display: 'block' }}>
                {line.length === 0
                  ? ' '
                  : line.map(([text, role], ti) =>
                    role === 'url'
                      ? (
                        <React.Fragment key={ti}>
                          <span style={{ color: SH_COLOR.url }}>{typed}</span>
                          <Caret aria-hidden='true'>|</Caret>
                        </React.Fragment>
                        )
                      : (
                        <span
                          key={ti}
                          style={{ color: SH_COLOR[role] || colors.gray9 }}
                        >
                          {text}
                        </span>
                        )
                  )}
              </span>
            ))}
          </code>
        </Terminal>
      </Box>
      <Box
        css={[
          theme({
            position: 'relative',
            width: '100%',
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: `0 16px 48px ${colors.black20}, 0 4px 12px ${colors.black10}`,
            bg: 'gray1'
          }),
          { aspectRatio: '16 / 10' }
        ]}
      >
        {hosts.map((item, i) => (
          <img
            key={item.host}
            src={screenshotSrc(item.host)}
            alt={item.alt}
            aria-hidden={shownIndex !== i}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              opacity: shownIndex === i ? 1 : 0,
              transition: 'opacity 350ms ease'
            }}
          />
        ))}
      </Box>
    </>
  )
}

const SectionEyebrow = ({ children }) => (
  <Caps
    as='p'
    css={theme({
      fontWeight: 'bold',
      fontSize: ['12px', 1, 1, 1],
      color: 'red6',
      width: '100%',
      textAlign: ['center', 'center', 'center', 'left']
    })}
  >
    {children}
  </Caps>
)

const Breadcrumb = ({ items }) => (
  <Flex
    as='nav'
    aria-label='Breadcrumb'
    css={theme({
      width: '100%',
      gap: 2,
      alignItems: 'center',
      flexWrap: 'wrap',
      fontSize: [0, 0, 1, 1],
      pb: [3, 3, 4, 4],
      justifyContent: ['center', 'center', 'center', 'flex-start']
    })}
  >
    {items.map((item, index) => (
      <Flex key={item.label} css={theme({ alignItems: 'center', gap: 2 })}>
        {index > 0 && (
          <Text as='span' css={theme({ color: 'black30' })}>
            /
          </Text>
        )}
        {item.href
          ? (
            <Link href={item.href}>{item.label}</Link>
            )
          : (
            <Text as='span' css={theme({ color: 'black60' })}>
              {item.label}
            </Text>
            )}
      </Flex>
    ))}
  </Flex>
)

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = ({ hero, breadcrumb }) => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      width: '100%',
      bg: 'white',
      px: [3, 3, 4, 5],
      pt: [4, 4, 5, 5],
      pb: SECTION_VERTICAL_SPACING
    })}
  >
    <Box
      css={theme({ width: '100%', maxWidth: CONTENT_MAX_WIDTH, mx: 'auto' })}
    >
      {breadcrumb && <Breadcrumb items={breadcrumb} />}
      <Flex
        css={theme({
          width: '100%',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: COLUMN_GAP
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', SECONDARY_WIDTH],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <SectionEyebrow>{hero.eyebrow}</SectionEyebrow>
          <Heading
            css={theme({
              pt: [3, 3, 3, 3],
              fontSize: [4, 4, 5, 5],
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            {hero.title}
          </Heading>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              fontSize: [2, 2, 3, 3],
              textAlign: ['center', 'center', 'center', 'left'],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            {hero.subtitle}
          </Caption>
          <Flex
            css={theme({
              pt: [4, 4, 5, 5],
              width: '100%',
              gap: [3, 3, 4, 4],
              fontSize: [2, 2, 3, 3],
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: 'center',
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </ArrowLink>
            <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
          </Flex>
        </Flex>
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', MAIN_WIDTH],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: [3, 3, 4, 4]
          })}
        >
          <HeroDemo code={hero.code} demo={hero.demo} />
        </Flex>
      </Flex>
    </Box>
  </Container>
)

// ── Quickstart ───────────────────────────────────────────────────────────────
const Quickstart = ({ quickstart }) => (
  <Container
    id='quickstart'
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'pinky',
      px: [3, 3, 4, 5],
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.large,
        mx: 'auto',
        width: '100%'
      })}
    >
      <Subhead
        css={theme({ fontSize: [4, 4, 5, 5], textAlign: 'center', px: 3 })}
      >
        {quickstart.title}
      </Subhead>
      <Caption
        css={theme({
          pt: [3, 3, 4, 4],
          pb: [4, 4, 5, 5],
          textAlign: 'center',
          maxWidth: layout.normal
        })}
      >
        {quickstart.caption}
      </Caption>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: '100%',
          gap: [4, 4, 5, 5]
        })}
      >
        {quickstart.steps.map((step, index) => (
          <Flex
            key={step.title}
            css={theme({
              width: '100%',
              flexDirection: [
                'column',
                'column',
                'column',
                index % 2 === 0 ? 'row' : 'row-reverse'
              ],
              alignItems: ['center', 'center', 'center', 'center'],
              gap: [3, 3, 4, 5]
            })}
          >
            <Flex
              css={theme({
                flexDirection: 'column',
                width: ['100%', '100%', '100%', SECONDARY_WIDTH],
                alignItems: ['center', 'center', 'center', 'flex-start']
              })}
            >
              <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                <Flex
                  css={theme({
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    bg: 'red6',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 1
                  })}
                >
                  {index + 1}
                </Flex>
                <Caps
                  as='h3'
                  css={theme({ fontWeight: 'bold', fontSize: [1, 1, 2, 2] })}
                >
                  {step.title}
                </Caps>
              </Flex>
              <Text
                css={theme({
                  pt: [2, 2, 3, 3],
                  fontSize: [1, 1, 2, 2],
                  color: 'black70',
                  textAlign: ['center', 'center', 'center', 'left'],
                  maxWidth: layout.small
                })}
              >
                {step.description}
              </Text>
            </Flex>
            <Box css={theme({ width: ['100%', '100%', '100%', MAIN_WIDTH] })}>
              <CodeBlock code={step.code} />
            </Box>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </Container>
)

// ── Framework integration ────────────────────────────────────────────────────
const Framework = ({ framework }) => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      width: '100%',
      bg: 'white',
      px: [3, 3, 4, 5],
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: CONTENT_MAX_WIDTH,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: COLUMN_GAP
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', SECONDARY_WIDTH],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start']
        })}
      >
        <SectionEyebrow>{framework.eyebrow}</SectionEyebrow>
        <Subhead
          css={theme({
            pt: [2, 2, 3, 3],
            fontSize: [3, 3, 4, 4],
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          {framework.title}
        </Subhead>
        <Caption
          forwardedAs='div'
          css={theme({
            pt: [3, 3, 4, 4],
            fontSize: [2, 2, 2, 2],
            textAlign: ['center', 'center', 'center', 'left'],
            maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
          })}
        >
          {framework.caption}
        </Caption>
        {framework.footnote && (
          <Text
            css={theme({
              pt: [3, 3, 4, 4],
              fontSize: [0, 0, 1, 1],
              color: 'black60',
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            {framework.footnote.text}{' '}
            <Text
              as='code'
              css={theme({ fontFamily: 'mono', color: 'black80' })}
            >
              {framework.footnote.code}
            </Text>
          </Text>
        )}
      </Flex>
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', MAIN_WIDTH],
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <CodeBlock code={framework.code} />
      </Flex>
    </Flex>
  </Container>
)

// ── Comparison ───────────────────────────────────────────────────────────────
const ComparisonColumn = ({ column }) => {
  const positive = column.tone === 'positive'
  const Icon = positive ? CheckIcon : XIcon
  const iconColor = positive ? colors.close : colors.red6
  return (
    <Box
      css={theme({
        flex: 1,
        bg: 'white',
        borderRadius: 4,
        border: `${borders[1]} ${positive ? colors.red6 : colors.black10}`,
        boxShadow: positive
          ? `0 16px 40px ${colors.black10}`
          : `0 8px 24px ${colors.black05}`,
        p: [3, 4, 4, 4]
      })}
    >
      <Caps
        as='h3'
        css={theme({
          fontWeight: 'bold',
          fontSize: [1, 1, 2, 2],
          color: positive ? 'red6' : 'black60',
          pb: 3
        })}
      >
        {column.heading}
      </Caps>
      <Flex as='ul' css={theme({ flexDirection: 'column', gap: 3, pl: 0 })}>
        {column.points.map(point => (
          <Flex
            as='li'
            key={point}
            css={theme({ alignItems: 'flex-start', gap: 2, listStyle: 'none' })}
          >
            <Box css={{ flex: 'none', lineHeight: 0, paddingTop: '2px' }}>
              <Icon size={18} color={iconColor} />
            </Box>
            <Text
              css={theme({
                fontSize: [1, 1, 2, 2],
                color: positive ? 'black80' : 'black60'
              })}
            >
              {point}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

const Comparison = ({ comparison }) => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'pinky',
      px: [3, 3, 4, 5],
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.large,
        mx: 'auto',
        width: '100%'
      })}
    >
      <SectionEyebrow>{comparison.eyebrow}</SectionEyebrow>
      <Subhead
        css={theme({
          pt: [2, 2, 3, 3],
          fontSize: [4, 4, 5, 5],
          textAlign: 'center'
        })}
      >
        {comparison.title}
      </Subhead>
      <Caption
        css={theme({
          pt: [3, 3, 4, 4],
          pb: [4, 4, 5, 5],
          textAlign: 'center',
          maxWidth: layout.normal
        })}
      >
        {comparison.caption}
      </Caption>
      <Flex
        css={theme({
          width: '100%',
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'stretch',
          gap: [3, 3, 4, 4]
        })}
      >
        {comparison.columns.map(column => (
          <ComparisonColumn key={column.heading} column={column} />
        ))}
      </Flex>
    </Flex>
  </Container>
)

// ── Try it live ──────────────────────────────────────────────────────────────
const ToolCta = ({ tool }) => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      width: '100%',
      bg: 'white',
      px: [3, 3, 4, 5],
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        mx: 'auto',
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: [3, 3, 4, 4],
        bg: 'pinky',
        border: `${borders[1]} ${colors.pinkest}`,
        borderRadius: 4,
        px: [3, 4, 5, 5],
        py: [4, 4, 5, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: ['center', 'center', 'flex-start', 'flex-start']
        })}
      >
        <SectionEyebrow>{tool.eyebrow}</SectionEyebrow>
        <Subhead
          css={theme({
            pt: [2, 2, 2, 2],
            fontSize: [3, 3, 4, 4],
            textAlign: ['center', 'center', 'left', 'left']
          })}
        >
          {tool.title}
        </Subhead>
        <Caption
          css={theme({
            pt: [2, 2, 3, 3],
            fontSize: [1, 1, 2, 2],
            textAlign: ['center', 'center', 'left', 'left']
          })}
        >
          {tool.caption}
        </Caption>
      </Flex>
      <Box css={theme({ flex: 'none', fontSize: [2, 2, 3, 3] })}>
        <ArrowLink href={tool.cta.href}>{tool.cta.label}</ArrowLink>
      </Box>
    </Flex>
  </Container>
)

// ── Final CTA ────────────────────────────────────────────────────────────────
const FinalCta = ({ cta }) => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead css={theme({ fontSize: [4, 4, 5, 5], textAlign: 'center' })}>
        {cta.title}
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center',
          fontSize: [2, 2, 3, 3]
        })}
      >
        {cta.caption}
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center',
          fontSize: ['24px', '28px', '30px', '32px']
        })}
      >
        <ArrowLink href={cta.primary.href}>{cta.primary.label}</ArrowLink>
        {cta.secondary && (
          <Box css={theme({ fontSize: [2, 2, 3, 3] })}>
            <Link href={cta.secondary.href}>{cta.secondary.label}</Link>
          </Box>
        )}
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {cta.badges.map(label => (
          <Flex
            key={label}
            css={theme({
              alignItems: 'center',
              gap: 1,
              color: 'black80',
              fontSize: [0, 0, 1, 1]
            })}
          >
            <CheckIcon size={16} color={colors.close} />
            <Text as='span'>{label}</Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </Container>
)

// ── Sibling languages ────────────────────────────────────────────────────────
const Siblings = ({ siblings, label }) => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      pb: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        maxWidth: layout.normal,
        px: 4,
        mx: 'auto'
      })}
    >
      <Caps as='p' css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}>
        Other languages
      </Caps>
      <Flex
        css={theme({
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {siblings.map(sibling => (
          <Link key={sibling.href} href={sibling.href}>
            Screenshot API for {sibling.label}
          </Link>
        ))}
      </Flex>
    </Flex>
  </Container>
)

// ── Page + Head ──────────────────────────────────────────────────────────────
const ScreenshotLang = ({ config }) => (
  <Layout>
    <Hero hero={config.hero} breadcrumb={config.breadcrumb} />
    <Quickstart quickstart={config.quickstart} />
    <Framework framework={config.framework} />
    <Comparison comparison={config.comparison} />
    <Features
      css={theme({ px: 4, pb: 5, pt: [5, 5, 6, 6], bg: 'white' })}
      title={
        <Subhead
          css={theme({
            width: '100%',
            textAlign: 'left',
            fontSize: [4, 4, 5, 5]
          })}
        >
          {config.features.title}
        </Subhead>
      }
      caption={config.features.caption}
      features={config.features.items}
    />
    <ToolCta tool={config.tool} />
    <Faq
      title={config.faq.title}
      titleSize={['40px', 4, 5, 5]}
      caption={config.faq.caption}
      css={theme({
        pb: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={config.faq.questions}
    />
    <FinalCta cta={config.cta} />
    {config.siblings && config.siblings.length > 0 && (
      <Siblings siblings={config.siblings} label={config.label} />
    )}
  </Layout>
)

export const LangHead = ({ config }) => (
  <Meta
    title={config.meta.title}
    description={config.meta.description}
    image={config.meta.image}
    structured={config.meta.structured}
  />
)

export default ScreenshotLang
