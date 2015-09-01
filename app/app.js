'use strict';

var React = require('react'),
  Immutable = require('immutable'),
  jquery = require('jquery'),
  WordCloud = require('wordcloud');

require('suitcss-base');
require('./app.css');

var DemoApp = React.createClass({
  getInitialState: function (){
    return {
      topics: new Immutable.List()
    };
  },

  /*
   * Using Immutable.List to avoid word layout recalculation on internal state change of WordCloud related to user interaction.
   * Sorting of topics can be avoided if will be done on server.
   * */
  componentDidMount: function (){
    $.get(this.props.source, function (data){
      this.setState({
        topics: new Immutable.List(data.topics.sort(function (a, b){
          return b.volume - a.volume;
        }))
      });
    }.bind(this))
      .fail(function (xhr, status, err){
        console.error(this.constructor.displayName, 'loading data:', this.props.source, status, err.toString());
      }.bind(this));
  },

  render: function (){
    var props = {
      topics: this.state.topics, // Immutable.List
      title: 'Word Cloud',
      width: 800, // Overall widget dims
      height: 300,
      fontName: 'Open Sans',
      fontSizes: [12, 16, 20, 24, 30, 40], // font categories
      random: false, // If false, places topmost topic to the center, otherwise - random position within chart area bounds
      initialHighlight: true // If true, activates topmost topic and loads its data to the table, otherwise table is empty
    };
    return (
      <WordCloud {...props} />
    );
  }
});

jquery(document).ready(function (){
  React.render(
    <DemoApp source="topics.json"/>,
    document.getElementById('content')
  );
});
