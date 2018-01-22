import path from "path";
import babel from "rollup-plugin-babel";

export default {
  input: path.resolve(__dirname, "../src/index.js"),
  plugins: [
    babel({
      babelrc: false,
      exclude: "node_modules/**",
      presets: ["flow"],
      plugins: ["transform-flow-strip-types"]
    })
  ],
  output: {
    file: path.resolve(__dirname, "../dist/plot-svg.commonjs.js"),
    format: "cjs"
  }
};
