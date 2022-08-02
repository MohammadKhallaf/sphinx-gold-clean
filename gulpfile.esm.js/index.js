import { src, series, parallel, dest } from "gulp";
import cleanhtml from "./clean-html";
import cleancss from "./clean-css";
import imagemin from "./minify-images";
import imageclean from "./clean-images.js";
import cleanjs from "./clean-js";
import renameImgs from "./rename-images";
import consoleRemove from "./console-remove";
// import vinylPaths from "vinyl-paths";
import del from "del";
import gulpStripDebug from "gulp-strip-debug";
import gulpPlumber from "gulp-plumber";
import gulpCheerio from "gulp-cheerio";
import _ from "lodash";
import { each } from "lodash";
import purgecss from "gulp-purgecss";
export const moveNotImg = (cb) => {
  src(["src/**/*", "!src/**/*.{jpg,jpeg,png,PNG,JPEG}"]).pipe(dest("dist"));
  cb();
};

export const customTask = async () =>
  await src("src/**/*.html")
    .pipe(
      gulpCheerio(function ($, file, done) {
        // console.log($("[src]"));
        $("[src]").each(function () {
          // lowercase all path
          const lastfileName = $(this).attr("src").split("/").at(-1);
          const srcText = _.replace(_.lowerCase(fileName), / /g, "");
          console.log(srcText);
          // console.log(srcText.split("/").at(-1));
          // srcText.split("/").at(-1)
          // $(this).attr("src", srcText);
        });
        done();
      })
    )
    .pipe(dest("src"));
export const cssPrg = () =>
  src(["src/**/*.css", "!src/**/*.min.css"])
    .pipe(
      purgecss({
        content: ["src/**/index.html", "src/**/*.js"],
      })
    )
    .pipe(dest("src"));
export const cssfx = () => {
  const postcss = require("gulp-postcss");
  const postparser = require("postcss-safe-parser");

  return (
    src(["src/**/*.css", "!src/**/*.min.css"])
      // .pipe( sourcemaps.init() )
      .pipe(postcss([require("postcss-safe-parser")]))
      // .pipe( sourcemaps.write('.') )
      .pipe(dest("src"))
  );
};
exports.html = cleanhtml;
exports.css = cleancss;
exports.js = cleanjs;
exports.delimg = imageclean;
exports.imagemin = imagemin;
exports.renameImgs = renameImgs;
exports.rmCsl = consoleRemove;

export const rnmImg = series(renameImgs, moveNotImg);
exports.default = parallel(cleancss, cleanhtml);
