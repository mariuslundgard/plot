// @flow

import pathToRegexp from 'path-to-regexp'

export type RouteMap = {
  [pattern: string]: string
}

export type Route = {
  value: string,
  params: {
    [key: string]: string
  }
}

export function matchRoute (pathname: string, routes: RouteMap): Route | null {
  let match = null

  Object.keys(routes).some(pattern => {
    const keys = []
    const re = pathToRegexp(pattern, keys)
    const result = re.exec(pathname)

    if (result) {
      match = {value: routes[pattern], params: {}}
      match.params = keys.reduce((params, key, idx) => {
        params[key.name] = result[idx + 1]
        return params
      }, match.params)
      return true
    }

    return false
  })

  return match
}
