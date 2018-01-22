// @flow

type ScaleFn = (input: any) => number;

export function line(xScale: ScaleFn, yScale: ScaleFn, values: any[]) {
  return "M " + values.map((y, x) => `${xScale(x)} ${yScale(y)}`).join(" L ");
}

export function spline() {
  //
}
