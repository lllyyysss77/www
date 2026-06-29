import React from 'react'

import ScreenshotLang, { LangHead } from 'components/pages/screenshot/lang'
import php from 'components/pages/screenshot/lang/config/php'

const ScreenshotPhp = () => <ScreenshotLang config={php} />

export const Head = () => <LangHead config={php} />

export default ScreenshotPhp
