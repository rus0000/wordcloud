'use strict';
var React = require('react'),
  Immutable = require('immutable'),
  WordCloudChart = require('./wordcloudchart.js'),
  WordCloudTable = require('./wordcloudtable.js'),
  d3 = require('d3'),
  layoutCloud = require('d3-cloud/d3.layout.cloud.js'); // Using bower here, because npm verison of d3-cloud requires Canvas.js, Cairo and GTK - Too heavy
require('./css/wordcloud.css');

module.exports = React.createClass({
  tableWidth: 250,
  titleHeight: 40,

  getInitialState: function (){
    return {
      activeTopic: this.props.initialHighlight ? 0 : -1,
      topicsList: []
    };
  },

  propTypes: {
    title: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    fontName: React.PropTypes.string,
    fontSizes: React.PropTypes.arrayOf(React.PropTypes.number),
    topics: React.PropTypes.instanceOf(Immutable.List),
    random: React.PropTypes.bool,
    initialHighlight: React.PropTypes.bool
  },

  getDefaultProps: function (){
    return {
      title: 'Word Cloud',
      width: 800,
      height: 300,
      fontName: 'Open Sans',
      fontSizes: [10, 12, 16, 20, 30, 40],
      topics: new Immutable.List(),
      random: false,
      initialHighlight: false
    };
  },

  handleClick: function (index){
    this.setState({
      activeTopic: index
    });
  },

  layoutComplete: function (topicsList, bounds){
    this.setState({
      activeTopic: this.props.initialHighlight ? 0 : -1,
      topicsList: topicsList
    });
  },

  componentWillMount: function (){
    if (this.props.topics.size > 0) {
      this.layoutTopics(this.props.topics.toArray(), this.layoutComplete);
    }
  },

  /*
   * Do layoutTopics only when this.props.topics mutates
   * */
  shouldComponentUpdate: function (nextProps, nextState){
    if (!this.props.topics.equals(nextProps.topics)) {
      if (nextProps.topics.size > 0) {
        this.layoutTopics(nextProps.topics.toArray(), this.layoutComplete);
        return false;
      } else {
        this.setState(this.getInitialState());
      }
    }
    return true;
  },

  /*
   * topics must already be sorted by volume field
   * */
  layoutTopics: function (topics, fn){
    var width = this.props.width - this.tableWidth,
      height = this.props.height - this.titleHeight;

    if (!this.props.fontSizes.length || !topics.length || width <= 0 || height <= 0) {
      fn([], [0, 0]);
      return;
    }
    var random = this.props.random,
      fontSizes = this.props.fontSizes,
      binSize = (topics[0].volume - topics[topics.length - 1].volume) / (fontSizes.length - 1),
      topicsList = topics.map(function (topic){
        return {
          topic: topic,
          fSize: fontSizes[Math.floor(topic.volume / binSize)]
        };
      }),
      layout = d3.layout.cloud()
        .size([width, height])
        .words(topicsList)
        .padding(10)
        .rotate(function (){
          return 0;
        })
        .font(this.props.fontName)
        .text(function (d){
          return d.topic.label;
        })
        .random(function (){
          if (random) {
            return Math.random();
          } else {
            return 0.5;
          }
        })
        .fontSize(function (d){
          return d.fSize;
        })
        .on('end', fn);

    layout.start();
  },

  render: function (){
    var width = parseInt(this.props.width, 10),
      height = parseInt(this.props.height, 10),
      style = {
        width: width + 'px',
        height: height + 'px'
      },
      propsChart = {
        topicsList: this.state.topicsList,
        activeTopic: this.state.activeTopic,
        fontSizes: this.props.fontSizes,
        width: width - this.tableWidth,
        height: height - this.titleHeight,
        handleClick: this.handleClick,
        random: this.props.random
      };

    return (
      <div className="word-cloud" style={style}>
        <span className="title">{this.props.title}</span>
        <WordCloudChart {...propsChart}/>
        <WordCloudTable
          activeTopic={this.state.topicsList.length && this.state.activeTopic >= 0 ? this.state.topicsList[this.state.activeTopic].topic : {}}/>
      </div>
    );
  }
});
