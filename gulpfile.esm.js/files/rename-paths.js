import { src, dest } from "gulp";
import gulpCheerio from "gulp-cheerio";
import _ from "lodash";

export default (cb) => {
  src("src/**/*.html")
    // .pipe(debug())
    .pipe(
      gulpCheerio(function ($, file, done) {
        console.log("_".repeat(10), file.path, "_".repeat(10));
        $("[src]").each(function () {
          const srcPath = $(this).attr("src");
          const newPath = _.toLower(srcPath).replaceAll(/_|-| /g, "");
          $(this).attr("src", newPath);
        });
        
        $("img[src]").each(function () {
          const srcPath = $(this).attr("bgimgpath");
          const srcDataHover = $(this).attr("data-hover");
          const srcDataNormal = $(this).attr("data-normal");

          if (srcPath) {
            const newPath = _.toLower(srcPath).replaceAll(/_|-| /g, "");
            $(this).attr("bgimgpath", newPath);
          }

          if (srcDataHover) {
            const newPath = _.toLower(srcDataHover).replaceAll(/_|-| /g, "");
            $(this).attr("data-hover", newPath);
          }

          if (srcDataNormal) {
            const newPath = _.toLower(srcDataNormal).replaceAll(/_|-| /g, "");
            $(this).attr("data-normal", newPath);
          }
        });
        $("[href]").each(function () {
          const srcPath = $(this).attr("href");
          const newPath = _.toLower(srcPath).replaceAll(/_|-| /g, "");
          $(this).attr("href", newPath);
        });
        done();
      })
    )
    .pipe(dest("src"));
  cb();
};
