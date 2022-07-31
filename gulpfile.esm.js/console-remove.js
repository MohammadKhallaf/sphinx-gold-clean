import { src, dest } from "gulp";
import gulpPlumber from "gulp-plumber";
import gulpStripDebug from "gulp-strip-debug";

export default async () =>
  await src("src/**/*.js", "!src/**/*.min.js")
    .pipe(gulpPlumber())
    .pipe(gulpStripDebug())
    .pipe(dest("src"))
    .pipe(gulpPlumber.stop());
