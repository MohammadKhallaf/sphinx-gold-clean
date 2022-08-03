import { src, dest } from "gulp";
import rename from "gulp-rename";
import _ from "lodash";
export default async () =>
  await src(["src/**/*.{jpg,jpeg,png,PNG,JPEG,svg}","src/**/fonts/*"])
    .pipe(
      rename((opt) => {
        opt.basename = _.replace(_.lowerCase(opt.basename), / /g, "");
        opt.basename = opt.basename.toLowerCase()
        opt.extname = _.toLower(opt.extname);
        return opt;
      })
    )
    .pipe(dest("src", { overwrite: true }));
