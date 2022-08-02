var beautify = require("gulp-beautify");
const minify = require("gulp-minify");
// var minify = require("gulp-minifier");
var uglify = require("gulp-uglify");
const gulp = require("gulp");

var stripC = require("gulp-strip-comments");
module.exports = function (cb) {
  // del("src/**/*-min.js");
  gulp
    .src("src/**/*.js", "!src/**/*.min.js")
    // .pipe(gulpPlumber())
    // .pipe(uglify({ warnings: true }))
    // .pipe(beautify())
    .pipe(stripC())
    // .pipe(gulpPlumber.stop())
    .pipe(gulp.dest("src"));
  cb();
};
