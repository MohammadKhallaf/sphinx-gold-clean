const { src, series, parallel } = require("gulp");

const cleanhtml = require("./clean-html");
const cleancss = require("./clean-css");
const imagemin = require("./minify-images");
const imageclean = require("./clean-images.js");
const cleanjs = require("./clean-js");

exports.html = cleanhtml;
exports.css = cleancss;
exports.js = cleanjs;
exports.delimg = imageclean;
exports.imagemin = imagemin;

exports.default = parallel(cleancss, cleanhtml);
