const { join } = require('node:path')
const { get } = require('tiny-json-http')
const test = require('tape')
const sandbox = require('@architect/sandbox')
const xlQuery = '75em' // Configured in test/mock/config.mjs
const workingDirectory = join(process.cwd(), 'test', 'mock')
const port = 6661
const url = (path) => `http://localhost:${port}${path}`

test(`Start Arc Sandbox in ${workingDirectory}`, async t => {
  t.plan(1)
  await sandbox.start({
    quiet: true,
    cwd: workingDirectory,
    port,
  })
  t.pass('Sandbox started with Paramour CSS plugin')
})

test('Sandbox working and styles resolving', async t => {
  t.plan(6)

  const rootRequest = await get({ url: url('/') })
  const htmlBody = rootRequest?.body
  t.ok(htmlBody, 'Sandbox root works')
  t.ok(htmlBody.indexOf('<head><style>') > 0, 'Inline style tag is present')
  t.ok(htmlBody.indexOf('/* Paramour placeholder */') < 0, 'Placeholder CSS not present')

  const cssRequest = await get({ url: url('/paramour.css') })
  const css = cssRequest.body
  t.ok(css, '.css available via HTTP')
  t.ok(css.indexOf(`@media (min-width: ${xlQuery})`) > 0, 'Styles configured.')

  const styleGuideRequest = await get({ url: url('/_styleguide') })
  const styleGuide = styleGuideRequest.body
  t.ok(styleGuide, 'Style guide is available.')
})

test('Shut down Sandbox', async t => {
  t.plan(1)
  await sandbox.end()
  t.pass('Shut down Sandbox')
})
