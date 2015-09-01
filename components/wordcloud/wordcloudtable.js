'use strict';
var React = require('react');
require('./css/wordcloudtable.css');

module.exports = React.createClass({
  propTypes: {
    activeTopic: React.PropTypes.object
  },

  getDefaultProps: function (){
    return {
      activeTopic: {}
    };
  },

  truncString: function (str, max, add){
    add = add || '...';
    return (typeof str === 'string' && str.length > max ? str.substring(0, max) + add : str);
  },

  render: function (){
    var {label, volume} = this.props.activeTopic,
      sentiment = this.props.activeTopic.sentiment || {},
      {positive, neutral, negative} = sentiment,
      isTopicLoaded = volume > 0 ? 0 : '';// Not display zeros when no data loaded on initial render

    //add quotes and truncate if data loaded
    label = volume > 0 ? '"' + this.truncString(label, 60) + '"' : '';

    return (
      <div className="word-cloud-table">
        <table>
          <tbody>
            <tr>
              <td>Information on topic</td>
              <td className="label">{label}</td>
            </tr>
            <tr>
              <td className="total">Total Mentions</td>
              <td className="stats">{volume}</td>
            </tr>
            <tr>
              <td>Positive Mentions</td>
              <td className="stats green-color">{positive || isTopicLoaded}</td>
            </tr>
            <tr>
              <td>Neutral Mentions</td>
              <td className="stats">{neutral || volume > isTopicLoaded}</td>
            </tr>
            <tr>
              <td>Negative Mentions</td>
              <td className="stats red-color">{negative || isTopicLoaded}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
});
