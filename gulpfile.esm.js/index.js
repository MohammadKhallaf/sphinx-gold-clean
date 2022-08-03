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
import deleteEmpty from "delete-empty";
export const rmEmpty = (cb) => {
  deleteEmpty("src/*/")
    .then((deleted) => console.log("->", deleted)) //=> ['foo/aa/', 'foo/a/cc/', 'foo/b/', 'foo/c/']
    .catch(console.error);
  cb();
};
export const delFolders = async () =>
  await del([
    // "src/**/webfonts",
    // "src/**/sass",
    // "src/**/fontawesome*",
    // "src/**/INFROMAN*",
    // "src/**/AptiferSansLTPro*",
    // "src/**/CandyShopBlack*",
    // "src/**/LCALLIG*",
    "src/**/Quicksand*",
    "src/**/quicksandlight*",
    "src/**/quicksandregular*",
  ]);

export const moveNotImg = (cb) => {
  src(["src/**/*", "!src/**/*.{jpg,jpeg,png,PNG,JPEG}"]).pipe(dest("dist"));
  cb();
};

export const customTask = async () =>
  await src("src/**/*.html")
    .pipe(
      gulpCheerio(function ($, file, done) {
        $("img[src]").each(function () {
          const fileName = $(this).attr("src").split("/").at(-1).split(".")[0];
          const lwrFileName = _.replace(_.lowerCase(fileName), / /g, "");
          const fileExt = $(this).attr("src").split("/").at(-1).split(".")[1];
          const lwrFileExt = _.replace(_.lowerCase(fileExt), / /g, "");
          const fullName = [fileName, fileExt].join(".");
          const lwrfullName = [lwrFileName, lwrFileExt].join(".");

          console.log("old->", fileName);
          console.log(
            "new->",
            _.replace($(this).attr("src"), fullName, lwrfullName)
          );

          $(this).attr(
            "src",
            _.replace($(this).attr("src"), fullName, lwrfullName)
          );
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
