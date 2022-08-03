const gulp = require("gulp");
const plumber = require("gulp-plumber");
const { lessonsArr } = require("../helpers/find-dirs");
const unusedImages = require("../helpers/unused-custom.js");

module.exports = function (cb) {
  lessonsArr.forEach((nameLesson) => {
    console.log(nameLesson);
    gulp
      .src([
        `${nameLesson}/resources/images/**/*`,
        `${nameLesson}/assets/**/*.css`,
        `${nameLesson}/*.html`,
        `!${nameLesson}/resources/exercise`
      ])
      .pipe(plumber())
      .pipe(
        unusedImages({
          log: true,
          delete: true,
        })
      )
      // .on("end", () =>
      //   console.log("-".repeat(10) + nameLesson + "-".repeat(10))
      // )
      .pipe(plumber.stop());
  });
  cb();
};
