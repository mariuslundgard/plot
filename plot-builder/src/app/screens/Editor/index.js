// @flow

/** @jsx h */

import {Component, h} from 'preact'
import {connect} from 'preact-redux'
// import Chart from '../../components/Chart'
// import Form from '../../components/Form'
// import schema from '../../schema/chart'
import {load as loadChart} from '../../store/chart/actions'
// import {setQueryParam} from '../../store/location/actions'
import style from './index.css'

import type {State as ChartState} from '../../store/chart/types'

type Props = {
  chart: ChartState,
  params: {
    id: string
  },
  loadChart: Function
}

type State = any

class Editor extends Component<Props, State> {
  // handleFormChange = (data: any) => {
  //   this.props.setQueryParam('data', JSON.stringify(data))
  // }

  componentDidMount () {
    if (!this.props.chart || this.props.chart._id !== this.props.params.id) {
      this.props.loadChart(this.props.params.id)
    }
  }

  render () {
    const {chart} = this.props

    return (
      <div class={style.editor}>
        <div class={style.editor__form}>
          {/* <Form data={data} onChange={this.handleFormChange} schema={schema} /> */}
        </div>
        <div class={style.editor__plot}>
          {/* {chart.data && <Chart {...chart.data} />} */}
          <pre>{JSON.stringify(chart, null, 2)}</pre>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    chart: state.chart.current
  }
}

function mapDispatchToProps (dispatch) {
  return {
    loadChart: id => dispatch(loadChart(id))
    // setQueryParam: (key, value) => dispatch(setQueryParam(key, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
