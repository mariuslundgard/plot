// @flow

/** @jsx h */

import {h} from 'preact'
import './index.css'

type Props = {}

function XAxis (props: Props) {
  const {cross, height, ticks, scale} = props
  return (
    <g class='x-axis' transform={`translate(0, ${height})`}>
      {ticks.map((tick, idx) => (
        <g transform={`translate(${scale(tick)}, 0)`}>
          {cross ? (
            <path d={`M 0 ${0 - height - 20} L 0 20`} />
          ) : (
            <path d={`M 0 4 L 0 20`} />
          )}
          <text x='0' y='33'>
            {tick}
          </text>
        </g>
      ))}
    </g>
  )
}

export default XAxis
