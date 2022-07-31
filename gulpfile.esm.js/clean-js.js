var beautify = require("gulp-beautify");
const minify = require("gulp-minify");
// var minify = require("gulp-minifier");
var uglify = require("gulp-uglify");
const gulp = require("gulp");
const del = require("del");
const gulpPlumber = require("gulp-plumber");

module.exports = function (cb) {
  // del("src/**/*-min.js");
  gulp
    .src("src/**/*.js")
    .pipe(gulpPlumber())
    .pipe(uglify())
    .pipe(beautify())
    .pipe(gulpPlumber.stop())
    .pipe(gulp.dest("src"));
  cb();
};
