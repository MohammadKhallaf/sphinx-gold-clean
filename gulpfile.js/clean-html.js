/**
 * Clean HTML files named index, and found in direct lesson folder
 */
const { lessonsArr } = require("../helpers/find-dirs");
const gulp = require("gulp");
const cleanhtml = require("gulp-cleanhtml");
const htmlbeautify = require("gulp-html-beautify");

module.exports = function (cb) {
  lessonsArr.forEach((nameLesson) => {
    gulp
      .src(`${nameLesson}/index.html`)
      .pipe(cleanhtml())
      .pipe(htmlbeautify())
      .pipe(gulp.dest(`${nameLesson}`))
      .on("end", () => console.log(`${nameLesson}/index.html`));
  });
  cb();
};
