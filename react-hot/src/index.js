import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider} from 'react-apollo';
import Relay, {DefaultNetworkLayer} from 'react-relay/classic';
import Tea, {TeaStoreRoute} from './TeaStore';
import Feed from './Feed';

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

const rootComponent = <Relay.RootContainer
  Component={Tea}
  route={new TeaStoreRoute()}
/>;

const mountNode = document.getElementById('root');
ReactDOM.render(
  <ApolloProvider client={client}>
    <Feed/>
  </ApolloProvider>,
  mountNode
);
