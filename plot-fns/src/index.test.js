import { extent, linearScale } from "./";

describe("plot-fns/extent", () => {
  it("should", () => {
    expect(extent([0, 1, 2, 3, 4])).toEqual([0, 4]);
  });
});

describe("plot-fns/linearScale", () => {
  it("should", () => {
    expect(linearScale([0, 200], [-100, 100], 100)).toEqual(0);
  });
});
