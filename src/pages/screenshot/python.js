import React from 'react'

import ScreenshotLang, { LangHead } from 'components/pages/screenshot/lang'
import python from 'components/pages/screenshot/lang/config/python'

const ScreenshotPython = () => <ScreenshotLang config={python} />

export const Head = () => <LangHead config={python} />

export default ScreenshotPython
