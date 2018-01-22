// @flow

/** @jsx h */

import {Component, h} from 'preact'
import {curry} from 'ramda'
import {linearScale, range} from 'plot-fns/src'
import {line} from 'plot-svg/src'
import Legend from '../Legend'
import XAxis from '../XAxis'
import YAxis from '../YAxis'
import './index.css'

type Props = {
  header: {
    title: string,
    description: string
  }
}

type State = {
  width: number,
  height: number
}

class LineChart extends Component<Props, State> {
  contentElm: HTMLDivElement

  constructor () {
    super()
    this.state = {width: 320, height: 320 / 16 * 9}
  }

  componentDidMount () {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const rect = this.contentElm.getBoundingClientRect()
    this.setState({
      width: rect.width,
      height: rect.height
    })
  }

  render () {
    const {xAxis, yAxis, header, data} = this.props
    const {width, height} = this.state
    const margins = (this.margins = {
      left: 240,
      right: 30,
      top: 20,
      bottom: 40
    })
    const len = data[0].values.length
    const W = width - margins.left - margins.right
    const H = height - margins.top - margins.bottom
    const yScale = curry(linearScale)([0, 10 + 1], [0, H])
    const xScale = curry(linearScale)([0, len - 2], [0, W])
    const d = curry(line)(xScale, yScale)
    const yTicks = range(0, len)
    const xTicks = range(0, 10 + 1)
    const barH = yScale(0.75) / data.length

    return (
      <div class='bar-chart'>
        <header class='bar-chart__header'>
          <h3>{header.title}</h3>
          <p>{header.description}</p>
        </header>
        <Legend
          legends={data.map(row => ({
            color: row.color,
            label: row.label
          }))}
        />
        <div
          class='bar-chart__content'
          ref={contentElm => (this.contentElm = contentElm)}
        >
          <svg width={width} height={height}>
            <g transform={`translate(${margins.left}, ${margins.top})`}>
              <YAxis {...yAxis} ticks={yTicks} scale={yScale} width={W} />
              <XAxis {...xAxis} ticks={xTicks} scale={xScale} height={H} />
              <g class='bar-chart__plot-bars'>
                {data.map((row, barX) =>
                  // <path stroke={row.color} d={d(row.values)} />
                  row.values.map((x, y) => (
                    <rect
                      fill={row.color}
                      x={0}
                      y={1 + yScale(y) - barH + barX * barH}
                      width={xScale(x)}
                      height={barH - 2}
                    />
                  ))
                )}
              </g>
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

export default LineChart
