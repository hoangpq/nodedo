import {html} from 'snabbdom-jsx';

export default function Slider(sources) {

  const props$ = sources.props;

  const newValue$ = sources.DOM
    .select('#slider')
    .events('input')
    .map(e => +e.target.value);

  const state$ = props$
    .map(props => newValue$
      .map(val => ({
        min: props.min,
        value: val,
        max: props.max
      }))
      .startWith(props)
    )
    .flatten()
    .remember();

  const vdom$ = state$
    .map(state =>
      <div>
        <input type="range"
               id="slider"
               value={state.value}
               min={state.min}
               max={state.max}/>
        <label>{state.value}</label>
      </div>
    );

  return {
    DOM: vdom$,
    value: state$.map(state => state.value),
  }

}
