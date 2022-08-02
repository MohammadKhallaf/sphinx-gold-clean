const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");

module.exports = async () =>
  await gulp
    .src(`src/**/*.css`)
    .pipe(
      cleanCSS({ format: "beautify", debug: true }, (details) => {
        // console.log(`${details.name}: ${details.stats.originalSize}`);
        // console.log(`${details.name}: ${details.stats.minifiedSize}`);
        console.log(`${details.name}: ERR ${details.errors}`);
        console.log(`${details.name}: WRN ${details.warnings}`);
      })
    )
    .pipe(gulp.dest(`src`));
