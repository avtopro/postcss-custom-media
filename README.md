# PostCSS Custom Media [<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]

[PostCSS Custom Media] lets you use Custom Media Queries in CSS, following the
[CSS Media Queries] specification.

```pcss
@custom-media --small-viewport (max-width: 30em);

@media (--small-viewport) {
  /* styles for small viewport */
}

/* becomes */

@media (max-width: 30em) {
  /* styles for small viewport */
}
```

## Usage

Add [PostCSS Custom Media] to your project:

```bash
npm install postcss-custom-media --save-dev
```

Use [PostCSS Custom Media] to process your CSS:

```js
const postcssCustomMedia = require('postcss-custom-media');

postcssCustomMedia.process(YOUR_CSS /*, processOptions, pluginOptions */);
```

Or use it as a [PostCSS] plugin:

```js
const postcss = require('postcss');
const postcssCustomMedia = require('postcss-custom-media');

postcss([
  postcssCustomMedia(/* pluginOptions */)
]).process(YOUR_CSS /*, processOptions */);
```

[PostCSS Custom Media] runs in all Node environments, with special instructions for:

| [Node](INSTALL.md#node) | [PostCSS CLI](INSTALL.md#postcss-cli) | [Webpack](INSTALL.md#webpack) | [Create React App](INSTALL.md#create-react-app) | [Gulp](INSTALL.md#gulp) | [Grunt](INSTALL.md#grunt) |
| --- | --- | --- | --- | --- | --- |

## Options

### preserve

The `preserve` option determines whether custom media and atrules using custom
media should be preserved in their original form.

```pcss
@custom-media --small-viewport (max-width: 30em);

@media (--small-viewport) {
  /* styles for small viewport */
}

/* becomes */

@custom-media --small-viewport (max-width: 30em);

@media (max-width: 30em) {
  /* styles for small viewport */
}

@media (--small-viewport) {
  /* styles for small viewport */
}
```

### importFrom

The `importFrom` option specifies sources where custom media can be imported
from, which might be CSS, JS, and JSON files, functions, and directly passed
objects.

```js
postcssCustomMedia({
  importFrom: 'path/to/file.css' // => @custom-selector --small-viewport (max-width: 30em);
});
```

```pcss
@media (max-width: 30em) {
  /* styles for small viewport */
}

@media (--small-viewport) {
  /* styles for small viewport */
}
```

Multiple sources can be passed into this option, and they will be parsed in the
order they are received. JavaScript files, JSON files, functions, and objects
will need to namespace custom media using the `customMedia` or
`custom-media` key.

```js
postcssCustomMedia({
  importFrom: [
    'path/to/file.css',
    'and/then/this.js',
    'and/then/that.json',
    {
      customMedia: { '--small-viewport': '(max-width: 30em)' }
    },
    () => {
      const customMedia = { '--small-viewport': '(max-width: 30em)' };

      return { customMedia };
    }
  ]
});
```

[CSS Media Queries]: https://drafts.csswg.org/mediaqueries-5/#custom-mq
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Custom Media]: https://github.com/postcss/postcss-custom-media
