import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, test } from 'vitest'

const source = fs.readFileSync(
  path.join(process.cwd(), 'src/components/pages/home/output.js'),
  'utf8'
)

describe('home output renders profiling memory as bytes', () => {
  test('memory goes through the byte formatter', () => {
    expect(source).toContain("<Stat label='Memory' value={fmtBytes(memory)} />")
  })

  test('no formatter treats the raw value as megabytes', () => {
    expect(source).not.toContain('fmtMb')
  })

  test('the byte formatter scales by 1 MiB before labelling MB', () => {
    expect(source).toContain('const fmtBytes = bytes => {')
    expect(source).toContain('bytes >= 1048576')
    expect(source).toContain('(bytes / 1048576).toFixed(1)')
  })
})
