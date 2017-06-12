import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {HashRouter, Switch, Route, Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="welcome">Welcome to Odoo shop</div>
    );
  }
}

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/shop" component={App} />
    </Switch>
  </main>
);

const Header = () => (
  <header className="header">
    <div className="header-item">
      <Link to='/'>Home</Link>
    </div>
    <div className="header-item">
      <Link to='/shop'>Shop</Link>
    </div>
  </header>
);

const RouterApp = () => (
  <div>
    <Header/>
    <Main/>
  </div>
);

ReactDOM.render((
  <HashRouter>
    <RouterApp/>
  </HashRouter>
), document.getElementById('root'));
