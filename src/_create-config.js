const { join } = require('node:path')

/**
 * Create configuration for Paramour CSS creation
 * @param {object} params
 * @param {object} params.arc
 * @param {object} params.inventory
 * @returns Promise<{configPath: null|string, cwd: string, stylesConfig: Object}>
 */
async function createConfig ({ arc, inventory }) {
  const { default: defaultConfig } = await import('@paramour/css/styleguide.mjs')
  const pluginConfig = Object.fromEntries(arc['paramour-css'] || [])
  const cwd = inventory.inv._project.cwd

  let configPath = null
  let stylesConfig = null

  if (pluginConfig?.config) {
    configPath = join(cwd, pluginConfig.config)
    const { default: config } = await import(`${configPath}?${Date.now()}`) // bypass module cache; this should be improved to avoid memory leaks
    stylesConfig = config
  }
  else {
    configPath = join(cwd, 'node_modules', '@paramour', 'css', 'styleguide.mjs')
    stylesConfig = defaultConfig
  }

  return {
    cwd,
    configPath,
    stylesConfig,
  }
}

module.exports = createConfig
