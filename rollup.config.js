import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import scss from "rollup-plugin-scss";
import builtins from "rollup-plugin-node-builtins";
import globals from "rollup-plugin-node-globals";
import copy from "rollup-plugin-copy";

const umdGlobals = {
  react: "React",
  "prop-types": "PropTypes",
  Blob: "Blob",
  URL: "URL",
  Worker: "Worker",
  FileReader: "FileReader",
  Uint8Array: "Uint8Array"
};

export default {
  input: "./src/index.js",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "reactVideoTrimmer",
    globals: umdGlobals,
    sourcemap: "inline",
    exports: "named"
  },
  external: Object.keys(umdGlobals),
  plugins: [
    babel({
      exclude: "node_modules/**"
    }),
    resolve({ preferBuiltins: true }),
    globals(),
    builtins(),
    commonjs(),
    scss({
      output: "./dist/style.css",
      failOnError: true
    }),
    copy({
      targets: [{ src: "src/styles/*", dest: "dist/es/styles" }]
    }),
    uglify()
  ]
};
