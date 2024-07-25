const { join } = require('node:path')
const { readFileSync } = require('node:fs')
const CSS_FILENAME = 'paramour.generated.css'
const CSS_PATH = '/paramour.css'
let css = null

/**
 * Utility for plugin consumers to grab a link tag or inline styles
 * @returns {{style: string, link: string, path: string}}
 */
function getStyles () {
  return {
    style: getStyleTag(),
    link: getLinkTag(),
    path: getPath(),
  }
}

/** @returns {string} <style> tag with all generated utility classes */
function getStyleTag () {
  if (!css) {
    const stylesFilePath = join(
      process.cwd(),
      'node_modules',
      '@architect',
      'shared',
      'paramour-css',
      CSS_FILENAME,
    )

    try {
      css = readFileSync(stylesFilePath, 'utf-8')
    }
    catch (error) {
      console.debug(`Unable to read ${CSS_FILENAME}`)
    }
  }

  return `<style>${css || '/* Paramour placeholder */'}</style>`
}

/** @returns {string} <link> tag with reference to generated stylesheet */
function getLinkTag () {
  return `<link rel="stylesheet" href="${CSS_PATH}">`
}

/** @returns {string} root-relative path to stylesheet */
function getPath () {
  return CSS_PATH
}

module.exports = getStyles // legacy
// this is the main interface:
module.exports.getStyles = getStyles
module.exports.getStyleTag = getStyleTag
module.exports.getLinkTag = getLinkTag
module.exports.getPath = getPath
