import { src, dest } from "gulp";

export default () => {
  const postcss = require("gulp-postcss");
  const postparser = require("postcss-safe-parser");

  return (
    src(["src/**/*.css", "!src/**/*.min.css"])
      // .pipe( sourcemaps.init() )
      .pipe(postcss([require("postcss-safe-parser")]))
      // .pipe( sourcemaps.write('.') )
      .pipe(dest("src"))
  );
};
