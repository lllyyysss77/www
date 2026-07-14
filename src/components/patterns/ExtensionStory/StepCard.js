import { breakpoints, colors, shadows, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

const Card = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    minWidth: 0
  })}
  box-shadow: ${shadows[1]};
`

const Grid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}
  align-items: center;

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
`

const Kicker = styled(Text)`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  })}
`

const Title = styled(Text)`
  ${theme({
    fontSize: 2,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 1
  })}
`

const Body = styled(Text)`
  ${theme({
    fontSize: 1,
    lineHeight: 2,
    color: 'black70'
  })}
`

const VisualWell = styled(Flex)`
  align-items: center;
  justify-content: center;
  ${theme({ borderRadius: 2, p: 3, width: '100%' })}
  border: 1px solid ${colors.black05};
`

export const StepCard = ({ accent, number, kicker, title, body, visual }) => {
  const num = String(number).padStart(2, '0')
  return (
    <Card>
      <Grid>
        <Flex css={theme({ flexDirection: 'column', gap: 2 })}>
          <Kicker css={theme({ color: accent.text })}>
            {num} · {kicker}
          </Kicker>
          <Title>{title}</Title>
          <Body>{body}</Body>
        </Flex>
        <VisualWell
          aria-hidden='true'
          style={{
            background: `linear-gradient(135deg, ${
              colors[accent.bgSoft]
            } 0%, #ffffff 85%)`
          }}
        >
          {visual}
        </VisualWell>
      </Grid>
    </Card>
  )
}
