import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';
import App from './components/main';

// require main style
require('./styles/main.scss');
if (module.hot) {
  // hot reload
  module.hot.accept();
  // console.clear();
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

run(App, drivers);
