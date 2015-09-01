'use strict';
var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  _ = require('lodash'),
  WordCloud = require('../wordcloud.js'),
  WordCloudTable = require('../wordcloudtable.js'),
  propsBase = require('./fixtures/propsBase.js'),
  topics = require('./fixtures/topics.json.js');

describe('WordCloudTable rendering', function (){
  var props = propsBase,
    wordCloud = TestUtils.renderIntoDocument(<WordCloud {...props} />),
    wordCloudTable,
    node;

  it('loads without error', function (){
    should.exist(wordCloud);
    wordCloudTable = TestUtils.findRenderedComponentWithType(wordCloud, WordCloudTable);
    should.exist(wordCloudTable);
  });

  it('renders div', function (){
    node = React.findDOMNode(wordCloudTable);

    node.tagName.toLowerCase().should.be.equal('div');
    node.getAttribute('class').should.be.equal('word-cloud-table');
  });

  it('renders table', function (){
    var table = node.firstChild;

    table.tagName.toLowerCase().should.be.equal('table');
  });

  it('renders table body', function (){
    var tbody = node.firstChild.firstChild;

    tbody.tagName.toLowerCase().should.be.equal('tbody');
  });

  it('renders rows and table divs', function (){
    var rows = node.firstChild.firstChild.childNodes;

    should.exist(rows);
    rows.length.should.be.equal(5);
    _.map(rows, function (row){
      row.tagName.toLowerCase().should.be.equal('tr');
      should.exist(row.childNodes);
      row.childNodes.length.should.be.equal(2);
      row.childNodes[0].tagName.toLowerCase().should.be.equal('td');
      row.childNodes[1].tagName.toLowerCase().should.be.equal('td');
    });
  });
});
