import { src, series, parallel, dest } from "gulp";
import cleanhtml from "./clean-html";
import cleancss from "./clean-css";
import imagemin from "./minify-images";
import imageclean from "./clean-images.js";
import cleanjs from "./clean-js";
import renameImgs from "./rename-images";
// import vinylPaths from "vinyl-paths";
import del from "del";

export const moveNotImg = (cb) => {
  src(["src/**/*", "!src/**/*.{jpg,jpeg,png,PNG,JPEG}"]).pipe(dest("dist"));
  cb();
};
exports.html = cleanhtml;
exports.css = cleancss;
exports.js = cleanjs;
exports.delimg = imageclean;
exports.imagemin = imagemin;
exports.renameImgs = renameImgs;

export const rnmImg = series(renameImgs, moveNotImg);
exports.default = parallel(cleancss, cleanhtml);
