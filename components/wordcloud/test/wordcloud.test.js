'use strict';
var React = require('react/addons'),
  TestUtils = React.addons.TestUtils,
  _ = require('lodash'),
  propsBase = require('./fixtures/propsBase.js'),//no topics
  topics = require('./fixtures/topics.json.js'),
  Immutable = require('immutable'),
  WordCloud = require('../wordcloud.js'),
  WordCloudChart = require('../wordcloudchart.js'),
  WordCloudTable = require('../wordcloudtable.js'),
  propsTopics = _.clone(propsBase, true);

propsTopics.topics = new Immutable.List(topics.topics);//topics loaded

var layoutCompleteSpy = sinon.spy(WordCloud.prototype.__reactAutoBindMap, 'layoutComplete'),
  handleClickSpy = sinon.spy(WordCloud.prototype.__reactAutoBindMap, 'handleClick');

describe('WordCloud rendering', function (){
  var wordCloud;

  //Testing rendering without topics and with topics
  [propsBase, propsTopics].map(function (props){
    wordCloud = TestUtils.renderIntoDocument(<WordCloud {...props} />);

    it('loads without error', function (){
      should.exist(wordCloud);
    });

    it('renders container div', function (){
      var node = React.findDOMNode(wordCloud);

      node.tagName.toLowerCase().should.be.equal('div');
      node.getAttribute('class').should.be.equal('word-cloud');
    });

    it('renders title', function (){
      var title = TestUtils.findRenderedDOMComponentWithClass(wordCloud, 'title'),
        node = React.findDOMNode(title);

      node.textContent.should.be.equal(props.title);
      node.tagName.toLowerCase().should.be.equal('span');
    });

    it('renders chart', function (){
      var wordCloudChart = TestUtils.findRenderedComponentWithType(wordCloud, WordCloudChart);

      should.exist(wordCloudChart);
      TestUtils.isCompositeComponent(wordCloudChart).should.be.true;
    });

    it('renders table', function (){
      var wordCloudTable = TestUtils.findRenderedComponentWithType(wordCloud, WordCloudTable);

      should.exist(wordCloudTable);
      TestUtils.isCompositeComponent(wordCloudTable).should.be.true;
    });

  });

  it('it calls layoutComplete', function (){
    layoutCompleteSpy.should.have.been.calledOnce;
  });

  it('it renders text', function (){
    var g = TestUtils.findRenderedDOMComponentWithTag(wordCloud, 'g');

    should.exist(g);

    var strings = React.findDOMNode(g).childNodes;

    strings.length.should.equal(30);
    _.map(strings, function (text){
      text.tagName.should.be.equal('text');
      should.exist(text.textContent);

    });
    // topics must be ordered
    strings[0].textContent.should.be.equal(topics.topics[0].label);
  });

  it('handles click on text', function (){
    var gComp = TestUtils.findRenderedDOMComponentWithTag(wordCloud, 'g');

    should.exist(gComp);

    var g = React.findDOMNode(gComp);
    TestUtils.Simulate.click(g.childNodes[0]);
    handleClickSpy.should.have.been.calledOnce;
  });

  it('loads data to table', function (){
    var wordCloudTable = TestUtils.findRenderedComponentWithType(wordCloud, WordCloudTable);

    should.exist(wordCloudTable);

    var table = React.findDOMNode(wordCloudTable).firstChild;

    // topics must be ordered
    table.rows[0].cells[1].textContent.should.be.equal('"' + topics.topics[0].label + '"');
    table.rows[1].cells[1].textContent.should.be.equal(topics.topics[0].volume.toString());
    table.rows[2].cells[1].textContent.should.be.equal(topics.topics[0].sentiment.positive.toString());
    table.rows[3].cells[1].textContent.should.be.equal(topics.topics[0].sentiment.neutral.toString());
    table.rows[4].cells[1].textContent.should.be.equal(topics.topics[0].sentiment.negative.toString());
  });
});

