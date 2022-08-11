import { src, dest } from "gulp";
import gulpPlumber from "gulp-plumber";
import gulpStripDebug from "gulp-strip-debug";
import debug from "gulp-debug";
export default async () =>
  await src("src/**/*.js", "!src/**/*.min.js")
    .pipe(gulpStripDebug())
    .pipe(debug())
    .pipe(dest("src"));
