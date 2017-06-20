import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import Relay, {DefaultNetworkLayer} from 'react-relay/classic';
import {createStore} from 'redux';
import Feed from './Feed';
import reducers from './reducers';
const store = createStore(reducers);

const {origin} = window.location;
require('../styles/main.scss');

if (module.hot) {
  console.clear();
  module.hot.accept();
}

Relay.injectNetworkLayer(
  new DefaultNetworkLayer(`${origin}/api/graphql`)
);

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: `${origin}/api/graphql`,
  }),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Feed store={store}/>
  </ApolloProvider>,
  document.getElementById('root'),
);
