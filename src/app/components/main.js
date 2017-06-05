import {hJSX} from "@cycle/dom"

export default function main(drivers) {
  return {
    DOM: drivers.DOM.select("input").events("click")
      .map(ev => ev.target.checked)
      .startWith(false)
      .map(
        toggled =>
          <div>
            <label>{toggled ? "on" : "off"}</label>
            <input type="checkbox" /> Toggle me
            <p>{toggled ? "on" : "off"}</p>
          </div>
      )
  }
}