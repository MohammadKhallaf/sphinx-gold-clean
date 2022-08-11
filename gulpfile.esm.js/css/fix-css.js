import { src, dest } from "gulp";

export default () => {
  const postcss = require("gulp-postcss");
  return src(["src/**/*.css", "!src/**/*.min.css"])
    .pipe(postcss([require("postcss-safe-parser")]))
    .pipe(dest("src"));
};
