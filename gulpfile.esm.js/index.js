import { src, dest, series } from "gulp";
import html from "./html";
import css from "./css";
import js from "./js";
import files from "./files";
import del from "del";
import imagemin from "./minify-images";
import imageclean from "./clean-images.js";
import renameImgs from "./files/rename-images";
import consoleRemove from "./js/console-remove";
import libs from "./libs";
import gulpCheerio from "gulp-cheerio";
import _ from "lodash";
import purgecss from "gulp-purgecss";
import { fixCssAtr, rmMath } from "./html/find-elements";
import debug from "gulp-debug";
import { copyFonts } from "./libs/copy-files";

import { animateLib } from "./libs/copy-files";

/**
 * Steps:
 * 1- rename files and folders
 * 2- rename pathes in code (js | html | css)
 *
 * 3- fix css {|_|}
 * 4- clean html, css, js
 * 5- clean font files
 *
 */

export const renameInPath = async () =>
  await src("src/**/*.html")
    // .pipe(debug())
    .pipe(
      gulpCheerio(function ($, file, done) {
        console.log("_".repeat(10), file.path, "_".repeat(10));
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

exports.cpFonts = series(
  copyFonts,
  async () =>
    await del.sync([
      "src/**/webfonts",
      "src/**/sass",
      "src/**/fontawesome*",
      "src/**/INFROMAN*",
      "src/**/AptiferSansLTPro*",
      "src/**/CandyShopBlack*",
      "src/**/LCALLIG*",
      "src/**/Quicksand*", // only after renaming the fonts to lower case
      "src/**/quicksandlight*",
      "src/**/quicksandregular*",
      "src/**/quicksandsemi*",
      "src/**/Sasso*",
      "src/**/.vscode",
    ])
);

exports.html = html.clean;
exports.css = css.clean;
exports.cssfx = css.fix;
exports.js = js.clean;
exports.delimg = imageclean;
exports.imagemin = imagemin;
exports.renameImgs = renameImgs;
exports.rmCsl = consoleRemove;
exports.renameDirs = files.rename.dirs;
exports.delFiles = files.delete;

exports.cp = libs.extFont;
exports.animate = animateLib;
exports.find = html.find.lightBox;
exports.cssAtr = fixCssAtr;
exports.math = rmMath;
const popper = series(libs.popper.copy, libs.popper.find);

exports.cdn = series(
  html.del.math,
  html.find.lightBox,
  libs.popper.all,
  libs.animate
);
// export const rnmImg = series(renameImgs, moveNotImg);
// exports.default = parallel(cleancss, cleanhtml);
