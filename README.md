# `@paramour/arc-plugin-paramour-css`

Plugin for generating [parametric CSS with Paramour](https://paramour.style) in an [Architect](https://arc.codes) app.

## Install

```
npm i @paramour/arc-plugin-paramour-css
```

## Usage

### Setup

In your `app.arc` file:

```arc
@app
my-arc-app

# Define your plugins pragma and add the Paramour plugin
@plugins
paramour/arc-plugin-paramour-css

# Enable the plugin
@paramour-css
# with an optional configuration file:
config ./paramour.js
```

### Utility functions

Utility functions are provided to access your generated stylesheet:

```js
import { getStyles } from '@paramour/arc-plugin-paramour-css'

getStyles.linkTag()   // a <link rel="stylesheet"> tag
getStyles.styleTag()  // a <style> tag for inline styles
getStyles.path()      // root-relative path to the .css file
```

`getAll()` is also available to create an object with each result:

```js
import { getStyles } from '@paramour/arc-plugin-paramour-css'

const styles = getStyles.all()
styles.link    // a <link rel="stylesheet"> tag
styles.style   // a <style> tag for inline styles
styles.path    // root-relative path to the .css file
```

