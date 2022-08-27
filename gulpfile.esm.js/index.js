import { src, dest, series } from "gulp";
import { glob } from "glob";
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
import _ from "lodash";
import { findEXc, fixCssAtr, rmMath } from "./html/find-elements";
import { copyFonts } from "./libs/copy-files";

import { animateLib } from "./libs/copy-files";
import { findAudio } from "./html/find-elements";
/**
 * Steps:
 * 0-
 * 1- rename files and folders
 * 2- rename pathes in code (js | html | css)
 *
 * 3- fix css {|_|}
 * 4- clean html, css, console then js
 * 5- clean font files
 *
 */

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
exports.delFF = async () => await del.sync(["src/**/font/*", "src/**/fonts/*"]);
exports.capFF = function () {
  const destinationFolders = glob.sync("src/**/font*/");
  let stream = src("library/Quicksand*");
  destinationFolders.forEach(function (skinFolder) {
    stream = stream.pipe(dest(skinFolder, { overwrite: true }));
    console.log(skinFolder);
  });
  return stream;
};
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
exports.renameFiles = files.rename.files;
exports.renameFiles = files.rename.files;

exports.animate = animateLib;
exports.find = html.find.lightBox;
exports.cssAtr = fixCssAtr;
exports.math = rmMath;

exports.font = series(libs.extFont, copyFonts);

exports.cdn = series(
  html.del.math,
  html.find.lightBox,
  libs.popper.all,
  libs.animate
);
exports.popper = libs.popper.copy;
exports.cleanToFiles = series(
  files.delete,
  files.rename.dirs,
  files.rename.files,
  files.rename.paths
);
// export const rnmImg = series(renameImgs, moveNotImg);
// exports.default = parallel(cleancss, cleanhtml);
exports.findAudio = findAudio;
exports.exercise = findEXc;
