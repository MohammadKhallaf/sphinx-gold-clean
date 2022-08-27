const { src, dest } = require("gulp");
const strip = require("gulp-strip-comments");

module.exports = function (cb) {
  src("src/**/*.js", "!src/**/*.min.js","src/**/*.html").pipe(strip()).pipe(dest("src"));
  cb();
};
