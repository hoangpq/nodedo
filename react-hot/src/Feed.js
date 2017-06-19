import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import React, {Component} from 'react';
import * as Utils from './utils/Utils';

class Feed extends Component {

  renderItem(item, index) {
    return (<div key={index} className="item">
      <span>Name: {item.name}</span>
      <span>SteepingTime: {item.steepingTime}</span>
    </div>);
  }

  componentDidMount() {
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
    `).then(res => {
      console.log(res);
    });
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return <span>Loading...</span>;
    }
    const teas = this.props.data.store.teas;
    return (<div className="content-holder">
      {
        teas.map(this.renderItem)
      }
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

export default graphql(FeedQuery)(Feed);