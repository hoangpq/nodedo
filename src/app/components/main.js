import xs from 'xstream';
import {html} from 'snabbdom-jsx';

export default function Calculator(sources) {

  const changeNum1$ = sources.DOM
    .select('#input1')
    .events('input')
    .map(ev => +ev.target.value);

  const changeNum2$ = sources.DOM
    .select('#input2')
    .events('input')
    .map(ev => +ev.target.value);

  const buttonHandler$ = sources.DOM
    .select('#handler')
    .events('click')
    .map(ev => ev.target.value);

  buttonHandler$.subscribe(() => {
    console.log('Subscriber');

    changeNum1$.next(10);
  });

  const state$ = xs.combine(
    changeNum1$.startWith(0),
    changeNum2$.startWith(0)
  )
    .map(([num1, num2]) => {
      const result = num1 + num2;
      return { num1, num2, result }
    });

  const vdom$ = state$.map(({ num1, num2, result }) => {
    return (<div className="content">
      <div className="box">
        <label className="label">Number1:</label>
        <input type="number" className="input" id="input1" min={0} value={num1}/>
      </div>
      <div className="box">
        <label className="label">Number2:</label>
        <input type="number" className="input" id="input2" min={0} value={num2}/>
      </div>
      <div className="box result">
        <label className="label">Result</label>
        <input type="number" className="input" disabled={true} value={result}/>
      </div>
      <div className="box">
        <button id="handler">Set Value</button>
      </div>
    </div>);
  });

  return {
    DOM: vdom$,
  }

}
