// @flow

type Vector2D = [number, number];

export function extent(values: number[]) {
  const min = Math.min(...values);
  const max = Math.max(...values);

  return [min, max];
}

export function getDomainOffset(domain: Vector2D, value: number) {
  const [min, max] = domain;
  const range = max - min;

  return (value - min) / range;
}

// export function roundWithStep(step: number, value: number) {
//   const x = Math.round(value / step);
//   return x * step;
// }

export function linearScale(
  fromDomain: Vector2D,
  toDomain: Vector2D,
  value: number
) {
  const [toMin, toMax] = toDomain;
  const toRange = toMax - toMin;
  const fromOffset = getDomainOffset(fromDomain, value);

  return toMin + fromOffset * toRange;
}

export function range(min: number, max: number, step: number = 1) {
  const range = max - min;
  const v = Math.floor(range / step);

  return Array.from(Array(v).keys()).map((_, idx) => idx * step);
}
