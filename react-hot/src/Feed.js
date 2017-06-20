import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Utils from './utils/Utils';
import * as Actions from './consts';

class Feed extends Component {

  _renderItem(item, index) {
    return (<div key={index} className="item">
      <span>Name: {item.name}</span>
      <span>SteepingTime: {item.steepingTime}</span>
    </div>);
  }

  _renderContent() {
    const teas = this.props.teas;
    return teas.map(this._renderItem);
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

const FeedQuery = gql`
    query {
        store {
            teas {
                name
                steepingTime
            }
        }
    }
`;

const mapStateToProps = state => {
  return {
    teas: state.teas.teas
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      Utils.query(String.raw`
        query {
          store {
            teas {
              name
              steepingTime
              relate {
                name
                steepingTime
              }
            }
          }
        }
      `)
        .then(res => dispatch({
          type: Actions.DATA_LOADED,
          payload: res.data
        }));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(FeedQuery)(Feed));