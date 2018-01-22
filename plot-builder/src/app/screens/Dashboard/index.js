// @flow

/** @jsx h */

import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import {createChart, loadAll as loadAllCharts} from '../../store/chart/actions'
import {pushState} from '../../store/location/actions'
import style from './index.css'

type Props = any
type State = any

class Dashboard extends Component<Props, State> {
  componentDidMount () {
    this.props.loadAllCharts()
  }

  handleCreateClick = evt => {
    evt.preventDefault()
    this.props.createChart()
  }

  render () {
    return (
      <div class={style.editor}>
        <h1>Dashboard</h1>
        <a href='/chart/create' onClick={this.handleCreateClick}>
          Create chart
        </a>
        {this.props.chartIds.map(chartId => (
          <div>
            <a
              href={`/chart/${chartId}/edit`}
              onClick={evt => {
                evt.preventDefault()
                this.props.openChart(chartId)
              }}
            >
              {chartId}
            </a>
          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    chartIds: state.chart.ids
  }
}

function mapDispatchToProps (dispatch) {
  return {
    createChart: () => dispatch(createChart()),
    openChart: (id: string) => dispatch(pushState(`/chart/${id}/edit`)),
    loadAllCharts: () => dispatch(loadAllCharts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
