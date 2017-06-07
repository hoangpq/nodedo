import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export default function Content(sources) {
  const state$ = xs.of(0);
  const vdom$ = state$.map(({}) => {
    return (
      <div className="content">
        Content
      </div>
    );
  });
  return {
    DOM: vdom$,
  }
}
