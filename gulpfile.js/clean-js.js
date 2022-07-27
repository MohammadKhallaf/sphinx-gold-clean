var beautify = require("gulp-beautify");
const minify = require("gulp-minify");
// var minify = require("gulp-minifier");
var uglify = require("gulp-uglify");
const gulp = require("gulp");
const del = require("del");

module.exports = function (cb) {
  // del("src/**/*-min.js");
  gulp
    .src("src/**/*.js")
    .pipe(uglify())
    .pipe(beautify())
    .pipe(gulp.dest("src"));
  cb();
};
