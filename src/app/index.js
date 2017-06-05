import Cycle from "@cycle/core"
import {makeDOMDriver, hJSX} from "@cycle/dom"
import App from './components/main';

if (module.hot) {
  module.hot.accept();
}

const drivers = {DOM: makeDOMDriver("#app")}

Cycle.run(App, drivers);
