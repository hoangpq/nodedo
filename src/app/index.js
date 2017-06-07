import {run} from '@cycle/run';
import isolate from '@cycle/isolate';
import {makeDOMDriver} from '@cycle/dom';
import Calculator from './components/main';
import xs from 'xstream';
import {html} from 'snabbdom-jsx';

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

function main(sources) {

  const vdom$ = xs.combine(
    Calculator(sources).DOM
  )
    .map(([Calculator]) => <div>
        {Calculator}
      </div>
    );

  return {
    DOM: vdom$
  };
}

run(main, drivers);
