import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchData} from './actions';

class Feed extends Component {

  _renderItem(item, index) {
    return (<div key={index} className="item">
      <span>Name: {item.name}</span>
      <span>SteepingTime: {item.steepingTime}</span>
    </div>);
  }

  _renderContent() {
    const teas = this.props.teas;
    return teas.length ? teas.map(this._renderItem) : <span>Loading...</span>
  }

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (<div className="content-holder">
      {this._renderContent()}
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    teas: state.teas.teas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      fetchData(dispatch);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);
