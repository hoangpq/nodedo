import React, {Component} from 'react';
import Relay from 'react-relay/classic';

class Tea extends Component {

  constructor(props) {
    super(props);
    this.teas = props.store && props.store.teas ? props.store.teas : [];
  }

  renderStore(tea, index) {

    const sleepTimeStyle = {
      color: '#9f9f9f',
    };

    return (<div key={index} className="item">
      <span>Name: {tea.name}</span>
      <span style={sleepTimeStyle}>Sleeping Time: {tea.steepingTime}</span>
    </div>)
  }

  render() {
    return (
      <div className="content-holder">
        {this.teas.map(this.renderStore)}
      </div>
    );
  }
}

export default Relay.createContainer(Tea, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
          teas {
              name
              steepingTime
          }
      }
    `
  }
});

export class TeaStoreRoute extends Relay.Route {
  static queries = {
    store: (Component) => Relay.QL`
      query {
        store {
            ${Component.getFragment('store')}
        }
      },
    `
  };
  static routeName = 'TeaStoreRoute';
}
