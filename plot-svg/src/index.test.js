import { curry } from "ramda";
import { linearScale } from "plot-fns";
import { line } from "./";

describe("plot-svg/line", () => {
  it("should", () => {
    const xScale = curry(linearScale)([0, 4], [0, 100]);
    const yScale = curry(linearScale)([0, 10], [0, 100]);
    const d = curry(line)(xScale, yScale);

    expect(d([0, 2, 4, 8, 10])).toEqual(
      "M 0 0 L 25 20 L 50 40 L 75 80 L 100 100"
    );
  });
});
