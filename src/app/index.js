import {run} from '@cycle/run';
import {makeDOMDriver} from '@cycle/dom';
import isolate from '@cycle/isolate';
import xs from 'xstream';
import {Observable} from 'rxjs';
import {html} from 'snabbdom-jsx';
// components
import Content from './components/content';
import Slider from './components/slider';

// require main style
require('./styles/main.scss');
if (module.hot) {
  // hot reload
  module.hot.accept();
  console.clear();
}

function main(sources) {

  const content$ = Content(sources);
  const slider1$ = isolate(Slider)(sources);
  const slider2$ = isolate(Slider)(sources);

  const sum$ = Observable.combineLatest(
    slider1$.value,
    slider2$.value,
    (value1, value2) => {
      console.log(value1, value2);
      return value1 + value2;
    }
  );

  sum$.subscribe(
    val => console.log(val)
  );

  const vdom$ = sum$.combineLatest(
    slider1$.DOM,
    slider2$.DOM,
    (sum, slider1VT, slider2VT) => {
      return (
        <div className="main">
          <div className="contact">
            {slider1VT}
            {slider2VT}
          </div>
          <div className="content">
            Sum: {sum}
          </div>
        </div>
      );
    }
  );

  return {
    DOM: vdom$
  };
}

const drivers = {
  props: () => xs.of({
    min: 0,
    value: 50,
    max: 200.
  }),
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
