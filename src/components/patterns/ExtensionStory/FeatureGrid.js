import { breakpoints, colors, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

export const FeatureGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(3, 1fr);
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
    gap: 2
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
    flexShrink: 0,
    mb: 1
  })}
`

export const FeatureCard = ({ accent, icon: Icon, title, body }) => (
  <Card>
    <IconCircle css={theme({ bg: accent.bgSoft })}>
      <Icon size={20} color={colors[accent.text]} />
    </IconCircle>
    <Text
      as='h3'
      css={theme({
        color: 'black',
        fontSize: 2,
        fontWeight: 'bold',
        lineHeight: 1,
        m: 0
      })}
    >
      {title}
    </Text>
    <Text css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}>
      {body}
    </Text>
  </Card>
)
