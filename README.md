[![Build Status](https://travis-ci.org/rus0000/wordcloud.svg?branch=master)](http://travis-ci.org/rus0000/wordcloud)

# Word Cloud
A Word Cloud widget implemented as reusable [React](https://facebook.github.io/react/index.html) component. [Live Demo.](http://rus0000.github.io/wordcloud)

![alt Screenshot](https://github.com/rus0000/wordcloud/blob/master/doc/wordcloud.png "Screenshot")

Uses [d3-cloud](https://github.com/jasondavies/d3-cloud) layout, which itself is an extension to excellent [D3.js](https://github.com/mbostock/d3) data visualization library.

# Dependencies
[React](https://facebook.github.io/react/index.html), [D3.js](https://github.com/mbostock/d3), [d3-cloud](https://github.com/jasondavies/d3-cloud), [Immutable.js](https://github.com/facebook/immutable-js)

Demo app project uses `jquery.get()` method to fetch initial data. jQuery itself does not required.

# Motivation
Combine the power of D3 data visualization with React Components technology to create easy to use, self-contained component. Utilize power of React virtual DOM technology.

# Installation
This repo contains a simple React application project utilizing Word Cloud widget. Widget itself located in `components/wordcloud` folder.

You must have latest `node.js`, `npm` and `bower` installed.

Use `git clone` to download this repo. Change working dir.

Run `npm install` and `bower install`, to download components.

Use `npm start` to start a local http server, then open browser on [http://127.0.0.1:8090](http://127.0.0.1:8090)

To rebuild application bundle with webpack use `npm run build`. To start webpack dev server use `npm run dev`. To run Karma tests use `npm test`. Edit `karma.conf.js` and select only installed browsers.

# Implementation
This component heavily uses latest [Webpack](https://github.com/webpack/webpack) features:
- webpack dev server
- all in one packaging and bundling
- production build minification of JavaScript and CSS
- JSX and ES6 transpiling with [babel](https://github.com/babel/babel)
- CSS bundling using CommonJS standard `require()`
- CSS processing and SASSy syntax with [postcss](https://github.com/postcss/postcss)
- module hot re-loading
- karma-webpack browser testing

[d3-cloud](https://github.com/jasondavies/d3-cloud) layout library is a robust implementation of [Wordle](http://static.mrfeinberg.com/bv_ch03.pdf) word cloud layouting algorithm. It uses HTML5 canvas and sprite masks to achieve precise words placement and speed.

This component uses d3-cloud to calculate layout of words and React to render resulting DOM. Chart rendered using svg `<text>` elements.

Immutable.js is used to prevent unnecessary recalculation of words layout.

Words sorted by popularity, split into buckets corresponding to different font sizes, and placed, starting from largest, by Archimedean spiral around the chart field without rotation. Words rotation is disabled to achieve more *formal* data representation. Component support `fixed` and `random` words placement. Words colored by sentiment score to green, grey and red color.

When word is clicked, it become active. Active word displayed underlined, metadata about the topic displayed in table on right side of a widget.

# Usage and API
To successfully build and package new application containing this component, similar webpack-based environment has to be established.

To use Word Cloud widget in a new application, whole `components/wordcloud` folder has to be copied to the same location in your application.

To place Word Cloud widget in app just put `<WordCloud {...props}/>` tag in your `render` function. See [app/app.js](https://github.com/rus0000/wordcloud/blob/master/app/app.js#L46) for an example.

## Component properties
Widget supports following properties, which has to be put explicitly or using ES6 destructuring assignment `{...props}` from object, containg properties.

### topics
Type: `Immutable.List`

Optional, default: `new Immutable.List()`

Collection of `topics`. This is an Array-like object of words data. The main difference, that on every change it creates new *version* of whole object, leaving previous intact. This allows simple comparison of objects refs to detect changes.

Topic structure:

```js
{
  "id": "_1234567_",
  "label": "Topic word",
  "volume": 165,
  "sentiment": {
    "negative": 3,
    "neutral": 133,
    "positive": 29
  },
  "sentimentScore": 65
}
```

### title
Type: `String`

Optional, default: `Word Cloud`

Title of a widget

### width
Type: `Number`

Optional, default: `800`

Width of a widget in px

### height
Type: `Number`

Optional, default: `300`

Height of a widget in px

### fontName
Type: `String`

Optional, default: `Open Sans`

Name of the font of word cloud. This font should be mentioned in `wordcloudchart.css` and linked to index page.

### fontSizes
Type: `Array[Number]`

Optional, default: [10, 12, 16, 20, 30, 40]

Array of font sizes. All topics data would be spilt to `fontSizes.length` of buckets by linear mapping using popularity of topics (`volume` field).

### random
Type: `Boolean`

Optional, default: `false`

If `false`, widget places topmost topic to the center, otherwise - random position within chart area bounds

### initialHighlight
Type: `Boolean`

Optional, default: `false`

If `true`, activates topmost topic and loads its data to the table, otherwise table is empty

# License
MIT

