const gulp = require("gulp");
const stripC = require("gulp-strip-comments");

module.exports = function (cb) {
  gulp
    .src("src/**/*.js", "!src/**/*.min.js")
    .pipe(stripC())
    .pipe(gulp.dest("src"));
  cb();
};
