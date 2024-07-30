const createConfig = require('./_create-config')
const generateAndSave = require('./_generate')
const { getStyles, getLinkTag, getPath, getStyleTag } = require('./get-styles')
const TEMP_DIR_NAME = '.paramour'

const hydrate = {
  async copy ({ arc, copy, inventory }) {
    const params = { arc, inventory }

    const config = await createConfig(params)
    await generateAndSave(config)

    await copy({
      source: TEMP_DIR_NAME, // relative to the project root
      target: '@architect/shared/paramour-css',
    })
  },
}

const sandbox = {
  async watcher (params) {
    const { filename } = params
    const config = await createConfig(params)

    if (config.configPath && config.configPath === filename) {
      console.log('  Paramour: CSS config changed, rebuilding.')
      await generateAndSave(config)
    }
  },
}

const set = {
  http () {
    return [
      {
        method: 'get',
        path: '/paramour.css',
        src: `${__dirname}/handlers/css`,
        config: { views: false },
      },
      {
        method: 'get',
        path: '/_styleguide',
        src: `${__dirname}/handlers/guide`,
        config: { views: false },
      },
    ]
  },
}

// main Arc plugin interface
module.exports = {
  hydrate,
  sandbox,
  set,
}

// export interface for helpers
exports = module.exports // shenanigans
exports.getStyles = { // named export for ESM
  all: getStyles,
  linkTag: getLinkTag,
  styleTag: getStyleTag,
  path: getPath,
}
