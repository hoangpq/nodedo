import React, {Component} from 'react';
import Relay from 'react-relay';

class TeaStore extends Component {

  render() {
    return <div>
      {JSON.stringify(this.props.teas)}
    </div>;
  }
}

TeaStore = Relay.createFragmentContainer(TeaStore, {
  fragments: {
    store: () => Relay.QL`
        fragment on Store {
            teas {
                name
                steepingTime
            }
        }
    `,
  },
});

export default (<Relay.RootContainer
  Component={TeaStore}
/>);
