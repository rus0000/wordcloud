'use strict';
var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  _ = require('lodash'),
  WordCloud = require('../wordcloud.js'),
  WordCloudChart = require('../wordcloudchart.js'),
  propsBase = require('./fixtures/propsBase'),
  topics = require('./fixtures/topics.json.js');

describe('WordCloudChart rendering', function (){
  var props = propsBase,
    wordCloud = TestUtils.renderIntoDocument(<WordCloud {...props} />),
    wordCloudChart,
    node;

  it('loads without error', function (){
    should.exist(wordCloud);
    wordCloudChart = TestUtils.findRenderedComponentWithType(wordCloud, WordCloudChart);
    should.exist(wordCloudChart);
  });

  it('renders svg', function (){
    node = React.findDOMNode(wordCloudChart);

    node.tagName.toLowerCase().should.be.equal('svg');
    node.getAttribute('class').should.be.equal('word-cloud-chart');
  });

  it('renders background rect', function (){
    node.firstChild.tagName.toLowerCase().should.be.equal('rect');
  });

  it('renders group', function (){
    node.firstChild.nextSibling.tagName.toLowerCase().should.be.equal('g');
  });

  it('renders no text', function (){
    should.not.exist(node.firstChild.nextSibling.firstChild);
  });

});
