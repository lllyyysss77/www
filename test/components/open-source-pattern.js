import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const read = file => fs.readFileSync(path.join(process.cwd(), file), 'utf8')

const PAGES = [
  'src/pages/embed/index.js',
  'src/pages/screenshot.js',
  'src/pages/pdf.js',
  'src/pages/markdown.js',
  'src/pages/metadata.js',
  'src/pages/link-preview.js'
]

const component = read('src/components/patterns/OpenSource/OpenSource.js')

describe('OpenSource pattern', () => {
  test('exports the section component and the stars helper', () => {
    expect(component).toContain('export default OpenSource')
    expect(component).toContain('export const getRepoStarsLabel')
    expect(read('src/components/patterns/OpenSource/index.js')).toContain(
      "export { default, getRepoStarsLabel } from './OpenSource'"
    )
  })

  test('resolves live stars from data/oss.json with a static fallback', () => {
    expect(component).toContain(
      "import ossData from '../../../../data/oss.json'"
    )
    expect(component).toContain('OSS_STARS_BY_NAME.get(repo.name)')
    expect(component).toContain(': repo.stars')
  })

  test.each(PAGES)('%s renders the shared section', page => {
    const source = read(page)
    expect(source).toContain(
      "import OpenSource, { getRepoStarsLabel } from 'components/patterns/OpenSource'"
    )
    expect(source).toMatch(/<OpenSource\n/)
    expect(source).toContain('repos={REPOS}')
    expect(source).toContain('accent={')
    expect(source).toContain('caption=')
  })

  test.each(PAGES)('%s does not re-declare the pattern locally', page => {
    const source = read(page)
    for (const local of [
      'const OpenSource',
      'const RepoCard',
      'const RepoMeta',
      'const LanguageDot',
      'const GithubMarkPath',
      'const OSS_STARS_BY_NAME',
      'const COMPACT_NUMBER_FORMATTER',
      'Built on'
    ]) {
      expect(source, `${page} re-declares ${local}`).not.toContain(local)
    }
  })
})
