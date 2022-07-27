const { lessonsArr } = require("../helpers/find-dirs");
const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
module.exports = function (cb) {
  lessonsArr.forEach((nameLesson) => {
    gulp
      .src(`${nameLesson}/resources/images/**/*`)
      .pipe(imagemin())
      .pipe(gulp.dest(`${nameLesson}/resources/images`, { overwrite: true }))
      .on("end", () => console.log(`${nameLesson} Image Min. Done`));
  });

  cb();
};
