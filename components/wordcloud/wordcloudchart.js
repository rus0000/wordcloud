'use strict';
var React = require('react');
require('./css/wordcloudchart.css');

module.exports = React.createClass({
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    topicsList: React.PropTypes.arrayOf(React.PropTypes.object),
    random: React.PropTypes.bool
  },

  render: function (){
    var width = this.props.width,
      height = this.props.height;
    return (
      <svg className="word-cloud-chart" width={width} height={height}>
        <rect x="0" y="0" width={width} height={height} />
        <g transform={'translate(' +width/2 + ',' + height/2 + ')'}>
          {this.props.topicsList.map(function (item, index){
            var textProps = {
              key: item.topic.id,
              textAnchor: 'middle',
              transform: 'translate(' + item.x + ',' + item.y + ')',
              className: 'grey-fill',
              style: {
                fontSize: item.fSize + 'px'
              },
              onClick: function (i){
                this.props.handleClick(i);
              }.bind(this, index)
            };
            if (item.topic.sentimentScore > 60) {
              textProps.className = 'green-fill';
            } else if (item.topic.sentimentScore < 40) {
              textProps.className = 'red-fill';
            }
            if (this.props.activeTopic >= 0 && index === this.props.activeTopic) {
              textProps.className += ' active';
            }
            return (
              <text {...textProps}>{item.text}</text>
            );
          }.bind(this))}
        </g>
      </svg>
    );
  }
});
