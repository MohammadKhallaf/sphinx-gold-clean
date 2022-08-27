import { src, dest } from "gulp";
import debug from "gulp-debug";
import gulpCheerio from "gulp-cheerio";
import path from "path";

export const findEXc = (cb) => {
  src("src/**/index.html")
    .pipe(debug())
    .pipe(
      gulpCheerio(
        function ($, file, done) {
          let x = 0;
          let crnt = "";
          $("iframe[src]").each(function () {
            if ($(this).attr("src") != crnt) {
              x++;
            }
            console.log("used excercie path ->", $(this).attr("src"));
            console.log(
              `ex${x}->`,
              $(this).attr("src").split("exercise/")[1].split("/index")[0]
            );
            console.log(path.resolve(file.dirname, $(this).attr("src")));

            crnt = $(this).attr("src");
          });
          console.log("-".repeat(10));
          done();
        },
        { decodeEntities: false }
      )
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

export const findLight = (cb) => {
  console.log("{|-- lightbox --|}");
  src("src/**/index.html")
    .pipe(
      gulpCheerio(function ($, file, done) {
        console.log("-".repeat(7), file.path, "-".repeat(7));
        // if there is no class used
        if ($(".iframe-lightbox").length < 1) {
          $("script[src$='lightbox.min.js']").remove();
          $("link[href$='lightbox.css']").each(function () {
            $(this).remove();
            console.log("lighbox removed");
          });
        }
        done();
      })
    )
    .pipe(dest("src", { overwrite: true }));
  cb();
};

export const rmMath = (cb) => {
  console.log("{|-- math --|}");
  src("src/**/index.html")
    // .pipe(debug())
    .pipe(
      gulpCheerio(function ($, file, done) {
        console.log("-".repeat(7), file.path, "-".repeat(7));
        $("script[src*='mathjax']").each(function () {
          $(this).remove();
        });
        done();
      })
    )
    .pipe(dest("src", { overwrite: true }));
  cb();
};

export const fixCssAtr = (cb) => {
  src("src/**/index.html")
    .pipe(debug())
    .pipe(
      gulpCheerio(function ($, file, done) {
        // if there is no class used
        //css
        $("link[href*='_']").each(function () {
          const oldRef = $(this).attr("href");
          const newRef = oldRef.replaceAll("_", "");
          if (oldRef !== newRef) {
            $(this).attr("href", newRef);
            console.log("done");
          }
        });
        //js
        // $("script[src*='_']").each(function () {
        //   const oldRef = $(this).attr("src");
        //   const newRef = oldRef.replaceAll("_", "");
        //   if (oldRef !== newRef) {
        //     $(this).attr("src", newRef);
        //     console.log("done");
        //   }
        // });
        $("iframe[src]").each(function () {
          const oldRef = $(this).attr("src");
          const newRef = oldRef.replaceAll("_", "").replaceAll("-", "");
          if (oldRef !== newRef) {
            $(this).attr("src", newRef);
            console.log("done");
          }
        });

        done();
      })
    )
    .pipe(dest("src", { overwrite: true }));
  cb();
};

export const findAudio = (cb) => {
  console.log("{|-- audio --|}");
  // const source = glob.sync("src/**/*.html")
  // console.log(source)
  src("src/**/exercise/*/index.html")
    // .pipe(debug())
    .pipe(
      gulpCheerio(function ($, file, done) {
        console.log("#-".repeat(7), file.path.split("/").at(-1), "-".repeat(7));
        $("[data-audiosrc]").each(function (idx, element) {
          console.log(idx);
          console.log($(this).data("audioSrc") || $(this).data("audiosrc"));
          console.log("---".repeat(10));
        });
        done();
      })
    );
  // .pipe(dest("src", { overwrite: true }));
  cb();
};
