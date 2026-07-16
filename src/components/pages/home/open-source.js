import { colors } from 'theme'
import React from 'react'

import OpenSourcePattern, { OSS_STATS } from 'components/patterns/OpenSource'

const OpenSource = () => (
  <OpenSourcePattern
    repos={['metascraper', 'browserless', 'unavatar']}
    accent={colors.link}
    caption={`Every Microlink API is powered by open source: ${OSS_STATS.repos} repositories and ${OSS_STATS.stars} stars on GitHub. Read the source, contribute, or run it yourself.`}
    ctaHref='/oss'
    ctaLabel='Explore our open source'
  />
)

export default OpenSource
