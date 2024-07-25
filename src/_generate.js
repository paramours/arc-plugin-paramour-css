const { readFileSync, writeFileSync, mkdirSync } = require('node:fs')
const { join } = require('node:path')
const TEMP_DIR_NAME = '.paramour'
const CSS_FILENAME = 'paramour.generated.css'
const CONFIG_FILENAME = 'config.mjs'

/**
 * Run Paramour and save result
 * @param {object} config
 * @param {string} config.cwd project working dir
 * @param {string} config.stylesConfig Paramour config object
 * @param {boolean} write should write to disk
 * @returns {Promise<{generatedStyles: string, filePath: null|string}>}
 */
async function generateAndSave ({ cwd, configPath, stylesConfig }, write = true) {
  const { default: paramourCss } = await import('@paramour/css')
  const generatedStyles = paramourCss(stylesConfig)

  let filePath = null
  if (write) {
    const outputDir = join(cwd, TEMP_DIR_NAME)
    filePath = join(outputDir, CSS_FILENAME)

    const configFile = readFileSync(configPath, 'utf-8')

    mkdirSync(outputDir, { recursive: true })
    writeFileSync(filePath, generatedStyles)
    writeFileSync(join(outputDir, CONFIG_FILENAME), configFile) // TODO: it's getting passed a js object but it needs a buffer!

  }

  return { generatedStyles, filePath }
}

module.exports = generateAndSave
