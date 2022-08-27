import { src, dest, series } from "gulp";
import { glob } from "glob";
import gulpCheerio from "gulp-cheerio";
import debug from "gulp-debug";

export const copyFonts = function () {
  const destinationFolders = glob.sync("src/**/font*/");
  let stream = src("library/quicksand*");
  destinationFolders.forEach(function (skinFolder) {
    stream = stream.pipe(dest(skinFolder, { overwrite: true }));
    console.log(skinFolder);
  });
  return stream;
};

export const animateCopy = function () {
  const animCss = glob.sync("src/**/exercise/*/css/lib");
  let stream = src("library/animate.min.css");
  animCss.forEach(function (skinFolder) {
    stream = stream.pipe(dest(skinFolder, { overwrite: true }));
  });

  return stream;
};
export const findAnimate = (cb) => {
  src("src/**/index.html")
    .pipe(
      gulpCheerio(function ($, file, done) {
        console.log("-".repeat(7), file.path, "-".repeat(7));
        // if there is no class used
        //css
        $("link[href*='animate.min.css']").each(function () {
          $(this).attr("href", "css/lib/animate.min.css");
        });

        done();
      })
    )
    .pipe(dest("src", { overwrite: true }));
  cb();
};

export const animateLib = series(animateCopy, findAnimate);
// const destinationFolders = glob.sync("src/**/mainsite/js");
// const destinationFolders = glob.sync("src/**/exercise/*/css/lib");
// const destinationFolders = glob.sync("src/**/exercise/*/font");
// const destinationFolders = glob.sync("src/**/font*/");
// const cssFont = glob.sync("src/**/assets/mainsite/css");
// const destinationFolders = glob.sync("src/**/assets/mainsite/css");
// ,"src/**/exercise/**/js/lib"]);
// const destinationFolders = glob.sync(["src/**/mainsite/js"

const popperFolders = glob.sync("src/**/assets/mainsite/js");
export const copyPopper = function () {
  console.log("{|-- copy popper files --|}");
  let stream = src("library/popper.min.js");
  popperFolders.forEach(function (skinFolder) {
    stream = stream.pipe(dest(skinFolder, { overwrite: true }));
  });

  return stream;
};
export const findPopper = (cb) => {
  console.log("{|-- find popper cdn --|}");
  src("src/**/index.html")
    .pipe(
      gulpCheerio(function ($, file, done) {
        // if there is no class used
        console.log("-".repeat(7), file.path, "-".repeat(7));
        $("script[src*='popper']").each(function () {
          $(this).attr("src", "assets/mainsite/js/popper.min.js");
        });
        if ($("script[src='assets/mainsite/js/popper.min.js']").length > 1) {
          $("script[src='assets/mainsite/js/popper.min.js']").eq(1).remove();
        }
        done();
      })
    )
    .pipe(dest("src", { overwrite: true }));
  cb();
};

/******************* */
export const copyCssFont = function () {
  // let stream = src("library/popper.min.js");
  // let stream = src("library/animate.min.css");
  // let stream = src("library/fonts.css");
  let stream = src("library/quicksand*");

  cssFont.forEach(function (skinFolder) {
    stream = stream.pipe(dest(skinFolder, { overwrite: true }));
    console.log(skinFolder);
  });

  return stream;
};

const exFont = glob.sync("src/**/assets/mainsite/css");
// ,"src/**/exercise/**/js/lib"]);
// const destinationFolders = glob.sync(["src/**/mainsite/js"

export const copyExFont = function () {
  // let stream = src("library/popper.min.js");
  // let stream = src("library/animate.min.css");
  let stream = src("library/fonts.css");
  // let stream = src("library/quicksand*");

  exFont.forEach(function (skinFolder) {
    stream = stream.pipe(dest(skinFolder, { overwrite: true }));
    console.log(skinFolder);
  });

  return stream;
};
