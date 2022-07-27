/**
 * Clean HTML files
 */
const { src, dest } = require("gulp");
const cleanhtml = require("gulp-cleanhtml");
const htmlbeautify = require("gulp-html-beautify");

module.exports = async () =>
  await src(`src/**/index.html`)
    .pipe(cleanhtml())
    .pipe(htmlbeautify())
    .pipe(dest(`src`));
