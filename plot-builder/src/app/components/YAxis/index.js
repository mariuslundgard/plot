// @flow

/** @jsx h */

import {h} from 'preact'
import './index.css'

type Props = {}

function formatTickValue (type, value, category) {
  switch (type) {
    case 'date':
      return new Date(Date.parse(category)).toString()

    default:
      return value
  }

  // console.log("formatTickValue", type, value, category);
  // return value;
}

function YAxis (props: Props) {
  // console.log(props);
  const {categories, cross, width, ticks, scale} = props
  return (
    <g class='y-axis'>
      {ticks.map((tick, idx) => (
        <g transform={`translate(0, ${scale(tick)})`}>
          {cross ? (
            <path d={`M -20 0 L ${width + 30} 0`} />
          ) : (
            <path d={`M -20 0 L -4 0`} />
          )}
          <text x='-24' y='3'>
            {formatTickValue(props.type, tick, categories && categories[idx])}
          </text>
        </g>
      ))}
    </g>
  )
}

export default YAxis
