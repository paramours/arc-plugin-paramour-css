import { join } from 'node:path'
import arc from '@architect/functions'
const CONFIG_FILENAME = 'config.mjs'

export const handler = arc.http.async(async function () {
  // Just return the config for now
  const configPath = join(
    process.cwd(),
    'node_modules',
    '@architect',
    'shared',
    'paramour-css',
    CONFIG_FILENAME,
  )

  const { default: config } = await import(configPath)

  // TODO: create an HTML style guide
  return { json: config }
})
