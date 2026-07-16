import React from 'react'
import styled from 'styled-components'
import { Star as StarIcon } from 'react-feather'

import {
  theme,
  borders,
  colors,
  fontSizes,
  layout,
  radii,
  shadows,
  transition,
  SECTION_VERTICAL_SPACING
} from 'theme'

import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'

import { withTitle } from 'helpers/hoc/with-title'

import ossData from '../../../../data/oss.json'

const Caption = withTitle(CaptionBase)

const LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [3, 3, 4, 5]
}

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})

const formatCompactCount = number =>
  COMPACT_NUMBER_FORMATTER.format(number).toLowerCase()

const OSS_STARS_BY_NAME = new Map(
  ossData.map(({ name, stars }) => [name, stars])
)

export const getRepoStarsLabel = (repo, asNumber = false) => {
  const liveStars = OSS_STARS_BY_NAME.get(repo.name)
  if (asNumber) return liveStars
  return typeof liveStars === 'number'
    ? formatCompactCount(liveStars)
    : repo.stars
}

const RepoCard = styled('a')`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    borderRadius: 4,
    bg: 'white'
  })};
  border: ${borders[1]} ${colors.black10};
  text-decoration: none;
  color: inherit;
  transition: border-color ${transition.short}, box-shadow ${transition.short},
    background ${transition.short};

  .repo-github-icon {
    transition: fill ${transition.short};
  }

  &:hover {
    border-color: ${colors.black};
    box-shadow: ${shadows[3]};

    .repo-github-icon {
      fill: ${colors.black};
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
  }
`

const RepoMeta = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3,
    fontSize: 0,
    fontFamily: 'sans',
    color: 'black60'
  })};
`

const LanguageDot = styled('span')`
  ${theme({ width: fontSizes[0], height: fontSizes[0] })};
  background: ${({ $color }) => $color};
  border-radius: 50%;
  flex-shrink: 0;
`

const GithubIcon = ({ size, fill }) => (
  <svg
    className='repo-github-icon'
    width={size}
    height={size}
    viewBox='0 0 16 16'
    fill={fill}
    aria-hidden='true'
  >
    <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
  </svg>
)

const RepoCardItem = ({ repo, primary, ...props }) => (
  <RepoCard
    href={`https://github.com/${repo.org}/${repo.name}`}
    target='_blank'
    rel='noopener noreferrer'
    {...props}
  >
    <Flex css={theme({ alignItems: 'center', gap: primary ? '10px' : 2 })}>
      <GithubIcon
        size={primary ? 20 : 16}
        fill={primary ? colors.black80 : colors.black60}
      />
      <Text
        css={theme({
          fontWeight: 'bold',
          fontSize: primary ? [2, 2, 3, 3] : 2,
          color: primary ? 'black80' : 'black'
        })}
      >
        {repo.name}
      </Text>
    </Flex>
    <Text
      css={theme({
        fontSize: primary ? [1, 1, 2, 2] : 1,
        color: 'black60',
        lineHeight: 1,
        flex: primary ? 'initial' : 1
      })}
    >
      {repo.description}
    </Text>
    <RepoMeta css={primary ? theme({ fontSize: 1 }) : undefined}>
      <Flex css={theme({ alignItems: 'center', gap: 1 })}>
        <LanguageDot $color={repo.languageColor} />
        {repo.language}
      </Flex>
      <Flex css={theme({ alignItems: 'center', gap: 1 })}>
        <StarIcon size={primary ? 16 : 14} aria-hidden='true' />
        {getRepoStarsLabel(repo)}
      </Flex>
    </RepoMeta>
  </RepoCard>
)

const OpenSource = ({ repos, accent, caption, ...props }) => (
  <Container
    as='section'
    id='open-source'
    css={theme({
      alignItems: 'center',
      width: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [1, 1, 5, 5]
    })}
    {...props}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: LAYOUT.gap
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', LAYOUT.mainWidth],
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Flex
          css={theme({
            width: ['100%', '100%', '85%', '100%'],
            flexDirection: 'column',
            gap: [3, 3, 4, 4]
          })}
        >
          {repos
            .filter(repo => repo.primary)
            .map(repo => (
              <RepoCardItem key={repo.name} repo={repo} primary />
            ))}
          <Flex
            css={theme({
              gap: [3, 3, 4, 4],
              flexDirection: ['column', 'column', 'row', 'row']
            })}
          >
            {repos
              .filter(repo => !repo.primary)
              .map(repo => (
                <RepoCardItem
                  key={repo.name}
                  repo={repo}
                  css={theme({ flex: 1 })}
                />
              ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', LAYOUT.secondaryWidth],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          order: [-1, -1, -1, 0]
        })}
      >
        <Subhead
          css={theme({
            textAlign: ['center', 'center', 'center', 'left'],
            width: '100%'
          })}
        >
          Built on <span css={{ color: accent }}>open source</span>,
          <br />
          trusted by developers
        </Subhead>
        <Caption
          css={theme({
            pt: [3, 3, 4, 4],
            px: [4, 4, 4, 0],
            maxWidth: [
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          {caption}
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            width: '100%',
            justifyContent: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <ArrowLink
            href='https://github.com/microlinkhq'
            css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
          >
            Explore on GitHub
          </ArrowLink>
        </Flex>
      </Flex>
    </Flex>
  </Container>
)

export default OpenSource
