import { src, series, parallel, dest } from "gulp";
import cleanhtml from "./clean-html";
import cleancss from "./clean-css";
import imagemin from "./minify-images";
import imageclean from "./clean-images.js";
import cleanjs from "./clean-js";
import rename from "gulp-rename";
// import vinylPaths from "vinyl-paths";
import del from "del";
import _ from "lodash";
export const renameImg = async () => {
  await src("src/**/*.{jpg,jpeg,png,PNG,JPEG}")
    //Remove Space
    .pipe(
      rename(function (opt) {
        opt.basename = opt.basename.split(" ").join("");
        opt.basename = opt.basename.split("-").join("");
        opt.basename = opt.basename.split("'").join("");
        opt.basename = opt.basename.split("’").join("");
        opt.basename = opt.basename.split("_").join("");
        opt.basename = _.toLower(opt.basename);
        opt.extname = _.toLower(opt.extname);

        return opt;
      })
    )

    //Copy to destination
    .pipe(dest("dist"));
};
export const moveNotImg = (cb) => {
  src(["src/**/*", "!src/**/*.{jpg,jpeg,png,PNG,JPEG}"]).pipe(dest("dist"));
  cb();
};
export const rnmImg = series(renameImg, moveNotImg);
exports.html = cleanhtml;
exports.css = cleancss;
exports.js = cleanjs;
exports.delimg = imageclean;
exports.imagemin = imagemin;

exports.default = parallel(cleancss, cleanhtml);
