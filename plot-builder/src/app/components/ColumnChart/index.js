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

class ColumnChart extends Component<Props, State> {
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
      left: 40,
      right: 30,
      top: 20,
      bottom: 40
    })
    const len = data[0].values.length
    const W = width - margins.left - margins.right
    const H = height - margins.top - margins.bottom
    const xScale = curry(linearScale)([0, len - 1], [0, W])
    const yScale = curry(linearScale)([0, 5], [H, 0])
    const d = curry(line)(xScale, yScale)
    const yTicks = range(0, 11)
    const xTicks = range(0, len)
    const columnW = Math.floor(xScale(0.75) / data.length)

    return (
      <div class='column-chart'>
        <header class='column-chart__header'>
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
          class='column-chart__content'
          ref={contentElm => (this.contentElm = contentElm)}
        >
          <svg width={width} height={height}>
            <g transform={`translate(${margins.left}, ${margins.top})`}>
              <YAxis {...yAxis} ticks={yTicks} scale={yScale} width={W} />
              <XAxis {...xAxis} ticks={xTicks} scale={xScale} height={H} />
              <g class='column-chart__plot-columns'>
                {data.map((row, columnX) =>
                  // <path stroke={row.color} d={d(row.values)} />
                  row.values.map((y, x) => (
                    <rect
                      fill={row.color}
                      x={1 + xScale(x) - columnW + columnX * columnW}
                      y={yScale(y)}
                      width={columnW - 2}
                      height={H - yScale(y)}
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

export default ColumnChart
