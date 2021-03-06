"use strict";

var React = require('react');
var sa = require('superagent');

var Ajaxer = React.createClass({
  propTypes: {
    endpoint: React.PropTypes.string.isRequired
  },
  componentWillMount() {
    sa
    .get(this.props.endpoint)
    .end(function(error, res) {
      if (error) {
        console.log(error);
        return;
      }
      this.setState({data: JSON.parse(res.text)});
    }.bind(this));
  },
  getInitialState() {
    return { data: [] }
  },
  render() {
    var child = React.cloneElement(React.Children.only(this.props.children), {data: this.state.data}, this.context);
    return (
      <div>
        {child}
      </div>
    );
  }
});

module.exports = Ajaxer;
