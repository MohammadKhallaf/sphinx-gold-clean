const gulp = require("gulp");
const plumber = require("gulp-plumber");
const { lessonsArr } = require("../helpers/find-dirs");
const unusedImages = require("../helpers/unused-custom.js");
const gulpDebug = require("gulp-debug");
module.exports = function (cb) {
  lessonsArr.forEach((nameLesson) => {
    console.log(nameLesson);
    gulp
      // .src([
      //   `${nameLesson}/resources/images/**/*`,
      //   `${nameLesson}/assets/**/*.css`,
      //   `${nameLesson}/index.html`,
      //   `!${nameLesson}/resources/exercise`,
      // ])
      .src([
        `${nameLesson}/resources/exercise/**/*(*.css|index.html|assets)/**`,
        // `${nameLesson}/resources/exercise/**/*.css`,
        // `${nameLesson}/resources/exercise/**/index.html`,
        `!${nameLesson}/**/audio/**`,
      ])
      .pipe(gulpDebug())

      .pipe(plumber())
      .pipe(
        unusedImages({
          log: true,
          delete: true,
        })
      )
      .on("end", () =>
        console.log("-".repeat(10) + nameLesson + "-".repeat(10))
      )
      .pipe(plumber.stop());
  });

  // gulp
  //   .src([
  //     `src/**/images/`,
  //     `src/**/*.css`,
  //     `src/ch1/**/resources/exercise/*/index.html`,

  //   ])
  //   // .pipe(plumber())
  //   .pipe(gulpDebug())
  //   .pipe(
  //     unusedImages({
  //       log: true,
  //       delete: true,
  //     })
  //   )
  // .pipe(plumber.stop());

  cb();
};
