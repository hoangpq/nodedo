import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import Relay, {DefaultNetworkLayer} from 'react-relay/classic';
import Tea, {TeaStoreRoute} from './TeaStore';

require('../styles/main.scss');

if (module.hot) {
  module.hot.accept();
}

Relay.injectNetworkLayer(
  new DefaultNetworkLayer('http://localhost:3000/api/graphql')
);

const rootComponent = <Relay.RootContainer
  Component={Tea}
  route={new TeaStoreRoute()}
/>;

const Header = () => (
  <header className="header">
    <div className="header-item">
      <Link to='/'>Home</Link>
    </div>
  </header>
);

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={rootComponent}/>
    </Switch>
  </main>
);

const RouterApp = () => (
  <div>
    <Header/>
    <Main/>
  </div>
);

const mountNode = document.getElementById('root');
ReactDOM.render(
  rootComponent,
  mountNode
);
