// @flow

type Bar = {type: 'bar'}
type Line = {type: 'line'}
type Data = Bar | Line

type Margin = {
  top: number,
  left: number,
  right: number,
  bottom: number
}

type Layout = {
  title?: string,
  showLegend: boolean,
  margin: Margin
}

export type Chart = {
  _id: string,
  _rev: string,
  type: 'chart',
  id: string,
  data: Data[],
  layout: Layout
}

export type Create = {
  type: 'chart/CREATE',
  id: string,
  data: Chart
}

export type LoadAll = {
  type: 'chart/LOAD_ALL'
}

export type LoadAllSuccess = {
  type: 'chart/LOAD_ALL_SUCCESS',
  ids: string[]
}

export type Load = {
  type: 'chart/LOAD',
  id: string
}

export type LoadSuccess = {
  type: 'chart/LOAD_SUCCESS',
  chart: Chart
}

export type LoadError = {
  type: 'chart/LOAD_ERROR',
  error: string
}

export type Action =
  | Create
  | LoadAll
  | LoadAllSuccess
  | Load
  | LoadSuccess
  | LoadError

export type State = {
  ids: string[],
  current: Chart | null
}
