// @flow

/** @jsx h */

import {h} from 'preact'
import './index.css'

type Props = {
  legends: any[]
}

function Legend (props: Props) {
  const {legends} = props
  return (
    <div class='legend'>
      {legends.map(legend => (
        <div class='legend__item'>
          <span style={{background: legend.color}} /> {legend.label}
        </div>
      ))}
    </div>
  )
}

export default Legend
