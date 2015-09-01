'use strict';
var Immutable = require('immutable');
Immutable.Iterable.noLengthWarning = true;

module.exports = {
  topics: new Immutable.List(),
  title: 'Word Cloud',
  width: 800,
  height: 300,
  fontSizes: [12, 16, 20, 24, 30, 40],
  random: false,
  initialHighlight: true
};
