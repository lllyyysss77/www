import React from 'react'

import ScreenshotLang, { LangHead } from 'components/pages/screenshot/lang'
import nodejs from 'components/pages/screenshot/lang/config/nodejs'

const ScreenshotNodejs = () => <ScreenshotLang config={nodejs} />

export const Head = () => <LangHead config={nodejs} />

export default ScreenshotNodejs
