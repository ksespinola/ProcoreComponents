'use strict';

var React = require('react');
var cx = require('classnames');
var AutocompleteSelect = require('./AutocompleteSelect.react');
var SingleToken = require('./SingleToken.react');
var If = require('../If.react');

var SingleSelect2 = React.createClass({
  propTypes: {
    collection: React.PropTypes.array,
    data: React.PropTypes.array,
    selectedTokens: React.PropTypes.array,
    placeholder: React.PropTypes.string,
    createOption: React.PropTypes.array,
    onChange: React.PropTypes.func,
    getLabel: React.PropTypes.func,
    searchField: React.PropTypes.string,
    editable: React.PropTypes.bool.isRequired,
    filterSelected: React.PropTypes.bool
  },
  getInitialState() {
    return {
      selecting: false,
      selectedTokens: this.props.selectedTokens
    };
  },
  componentWillReceiveProps(nextProps) {
    if ( this.props.selectedTokens !== nextProps.selectedTokens ) {
      this.setState({ selectedTokens: nextProps.selectedTokens });
    }
  },
  render() {
    var classes = cx({
      'pct-picker': true,
      'editable': this.props.editable,
      'selecting': (this.props.editable && this.state.selecting)
    });
    return (
      <div>
        <span className={classes}>
          {this.renderToken()}
          {this.renderAutocompleteSelect()}
        </span>
        {this.renderButtons()}
      </div>
    );
  },
  renderButtons() {
    return !this.props.onAdd ? null : (
      <button 
        className='no-style-btn mock-bttn padding'
        onClick={this._onClick}>
        <i className='fa fa-plus'/>
      </button>
    );
  },
  renderAutocompleteSelect() {
    return !this.props.editable || (this.state.selectedTokens && this.state.selectedTokens.length) ? null : (
      <AutocompleteSelect
        filterSelected={true}
        blankOption={this.props.blankOption}
        collection={this.props.collection || this.props.data}
        createOption={this.props.createOption}
        searchField={this.props.searchField}
        onFilter={this._onFilter}
        onSelect={this._onSelect}
        onBlur={this._blur}
        onAdd={this.props.onAdd}
        onCreate={this.props.onCreate}
        onSpecialKey={this._onSpecialKey}
        onResults={this._onResults}
        getLabel={this.props.getLabel}
        placeholder={this.props.placeholder}/>
    );
  },
  renderCloser() {
    return !this.state.selecting ? null : (
      <div onClick={this._blur} className='pickerCloser'/>
    );
  },
  renderToken() {
    var tokens = this.state.selectedTokens;
    var token = (tokens && tokens[0]) || {};
    var icon = (this.state.selecting) ? 'fa fa-caret-up' : 'fa fa-caret-down';
    return (
      <SingleToken
        token={token}
        getLabel={this.props.getTokenLabel}
        onClick={this._toggleSelect}
        icon={icon}
        selecting={this.state.selecting}
        onRemove={this.onRemove}
        parseLabel={this.props.getLabel}/>
    );
  },
  onRemove(item) {
    if (this.props.onRemove) {
      (this.props.onRemove(item));
    }
    this.setState({ 
      selectedTokens: [],
      selecting: false
     });
  },
  _blur(){
    this.setState({selecting: false});
  },
  _toggleSelect() {
    this.setState({selecting: !this.state.selecting});
  },
  _onResults(value) {
    this.setState({
      value: value
    });
  },
  _onClick() {
    if(this.state.value) { this.props.onAdd(this.state.value); }
  },
  _onSelect(item) {
    this.setState({
      selecting: false,
      selectedTokens: [item]
    });
    this.props.onSelect(item);
  },
  _onSpecialKey(key, value) {
    var func = this._specialKeys[key];
    func && func.call(this, value);
  },
  _specialKeys: {
    'Tab': function() {
      event.preventDefault();
      this._blur();
    },
    'Escape': function() {
      this._blur();
    },
  }
});

module.exports = SingleSelect2;
