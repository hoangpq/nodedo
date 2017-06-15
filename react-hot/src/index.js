import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';
import Relay, {DefaultNetworkLayer} from 'react-relay/classic';
import Tea, {TeaStoreRoute} from './TeaStore';

require('../styles/main.scss');

if (module.hot) {
  console.clear();
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

import gql from 'graphql-tag'
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import { ApolloProvider, graphql } from 'react-apollo'
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/api/graphql',
  }),
});

class Feed extends Component {

  renderItem(item, index) {
    return (<li key={index}>
      Name: {item.name}
    </li>);
  }

  componentDidMount() {
    const query = String.raw`
      query {
        store {
          teas {
            name
            steepingTime
          }
        }
      }
    `;
    fetch('/api/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log(`data requested`);
        console.log(res)
      });
  }

  render() {
    const { loading } = this.props.data;
    if (loading) {
      return <span>Loading...</span>;
    }
    const teas = this.props.data.store.teas;
    return (<div>
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
            }
        }
    }
`;

const FeedWithData = graphql(FeedQuery)(Feed);

const mountNode = document.getElementById('root');
ReactDOM.render(
  // rootComponent,
  <ApolloProvider client={client}>
    <FeedWithData />
  </ApolloProvider>,
  mountNode
);
