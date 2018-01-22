// @flow

/** @jsx h */

import {Component, h} from 'preact'
import {connect} from 'preact-redux'
import screens from './screens'
// import style from './index.css'

import type {Route} from 'route'

type Props = {
  path: string,
  route: Route | null
}

const mapStateToProps = state => ({
  path: state.location.path,
  route: state.location.route
})

class Root extends Component<Props> {
  render () {
    const {path} = this.props
    const route = this.props.route
    const Screen = route ? screens[route.value] : null

    if (route && Screen) return <Screen params={route.params} />

    return <div>Fant ikke siden: {path}</div>
  }
}

export default connect(mapStateToProps)(Root)
