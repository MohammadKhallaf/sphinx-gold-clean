const { lessonsArr } = require("../helpers/find-dirs");
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");

module.exports = async () =>
  await gulp
    .src(`src/**/*.css`)
    .pipe(cleanCSS({ format: "beautify" }))
    .pipe(gulp.dest(`src`));
