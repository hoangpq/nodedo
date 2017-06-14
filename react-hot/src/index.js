import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Relay, {DefaultNetworkLayer} from 'react-relay/classic';
import Tea, {TeaStoreRoute} from './TeaStore';

require('../styles/main.scss');

if (module.hot) {
  module.hot.accept();
}

Relay.injectNetworkLayer(new DefaultNetworkLayer('http://localhost:3000/api/graphql'))

const rootComponent =
  <Relay.Renderer
    environment={Relay.Store}
    Container={Tea}
    queryConfig={new TeaStoreRoute()}/>;

const mountNode = document.getElementById('root');

ReactDOM.render(rootComponent, mountNode);
