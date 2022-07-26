const { lessonsArr } = require("../helpers/find-dirs");
const gulp = require("gulp");

module.exports = function (cb) {
  lessonsArr.forEach((nameLesson) => {
    gulp
      .src(`${nameLesson}/assets/main_site/css/*.css`)
      .pipe(cleanCSS({ format: "beautify" }))
      .pipe(gulp.dest(`${nameLesson}/assets/main_site/css`))
      .on("end", () => console.log(`${nameLesson} css Clean Done`));
  });

  cb();
};
