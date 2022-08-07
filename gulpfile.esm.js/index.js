import { src, series, parallel, dest } from "gulp";
import cleanhtml from "./clean-html";
import cleancss from "./css/clean-css";
import css from "./css";
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

import debug from "gulp-debug";
export const rmEmpty = (cb) => {
  deleteEmpty("src/*/")
    .then((deleted) => console.log("->", deleted)) //=> ['foo/aa/', 'foo/a/cc/', 'foo/b/', 'foo/c/']
    .catch(console.error);
  cb();
};
export const delFolders = async () =>
  await del([
    "src/**/webfonts",
    "src/**/sass",
    "src/**/fontawesome*",
    "src/**/INFROMAN*",
    "src/**/AptiferSansLTPro*",
    "src/**/CandyShopBlack*",
    "src/**/LCALLIG*",
    // "src/**/Quicksand*", // only after renaming the fonts to lower case
    "src/**/quicksandlight*",
    "src/**/quicksandregular*",
    "src/**/quicksandsemi*",
    "src/**/Sasso*",
    "src/**/.vscode",
  ]);

export const findEXc = async (cb) => {
  src("src/**/index.html")
    .pipe(debug())
    .pipe(
      gulpCheerio(function ($, file) {
        let x = 0;
        let crnt = "";
        $("iframe[src]").each(function () {
          if ($(this).attr("src") != crnt) {
            x++;
          }
          console.log("used excercie path ->", $(this).attr("src"));
          console.log(`ex${x}->`, $(this).attr("src").split("exercise/")[1].split("/index")[0]);
          crnt = $(this).attr("src");
        });
        console.log("-".repeat(10));
      })
    );
  cb();
};
export const findAud = async (cb) => {
  src("src/**/index.html")
    .pipe(debug())
    .pipe(
      gulpCheerio(function ($, file) {
        let x = 0;
        let crnt = "";
        $("[data-audiosrc]").each(function () {
      
          console.log("used audio path ->", $(this).attr("data-audiosrc"));
          // console.log(`ex${x}->`, $(this).attr("src").split("exercise/")[1].split("/index")[0]);
        });
        console.log("-".repeat(10));
      })
    );
  cb();
};
export const renameInPath = async () =>
  await src("src/**/*.html")
    .pipe(debug())
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

exports.html = cleanhtml;
exports.css = css.clean;
exports.js = cleanjs;
exports.delimg = imageclean;
exports.imagemin = imagemin;
exports.renameImgs = renameImgs;
exports.rmCsl = consoleRemove;
exports.cssfx = css.fix;
// export const rnmImg = series(renameImgs, moveNotImg);
exports.default = parallel(cleancss, cleanhtml);
