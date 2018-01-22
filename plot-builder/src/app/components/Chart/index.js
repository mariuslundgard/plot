// @flow

/** @jsx h */

import {extent} from 'plot-fns'
import {Component, h} from 'preact'
import style from './index.css'

type Props = any
type State = any

class Chart extends Component<Props, State> {
  svg: any

  constructor () {
    super()
    this.state = {width: 0, height: 0}
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    const rect = this.svg.getBoundingClientRect()

    this.setState({
      width: rect.width,
      height: rect.height
    })
  }

  renderBarPlot ({bars, maxValue}) {
    const {margin} = this.props.layout
    const W = this.state.width - margin.left - margin.right
    const groupW = W / bars[0].x.length

    return bars.map((bar, barIdx) => {
      return (
        <g>
          {bar.x.map((d, dIdx) => {
            return (
              <rect
                width={groupW * 0.5}
                height='10'
                x={dIdx * groupW + groupW * 0.25}
              />
            )
          })}
        </g>
      )
    })
  }

  renderPlot ({maxValue}) {
    const {margin} = this.props.layout
    const bars = this.props.data.filter(d => d.type === 'bar')

    return (
      <g
        class={style.chart__plot}
        transform={`translate(${margin.left}, ${margin.top})`}
      >
        {bars.length && (
          <g class={style.chart__barPlot}>
            {this.renderBarPlot({bars, maxValue})}
          </g>
        )}
      </g>
    )
  }

  render () {
    const {data, layout} = this.props
    const values = data.reduce((arr, d) => {
      return arr.concat(d.y)
    }, [])
    const maxValue = values.length > 1 ? Math.max(...values) : values[0] || 0

    return (
      <div class={style.chart}>
        <header>{layout.title || 'Untitled'}</header>
        <div class={style.chart__ratio}>
          <svg class={style.chart__canvas} ref={svg => (this.svg = svg)}>
            {this.renderPlot({maxValue})}
          </svg>
        </div>
      </div>
    )
  }
}

export default Chart
