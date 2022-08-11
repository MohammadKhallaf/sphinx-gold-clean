import { src, dest } from "gulp";
import rename from "gulp-rename";
import _ from "lodash";
import debug from "gulp-debug";
import path from "path";
import del from "del";
export default (done) => {
  src(["src/**/*.{jpg,jpeg,png,PNG,JPEG,svg}", "src/**/fonts/*"])
    .pipe(debug())
    .pipe(
      rename((opt) => {
        // console.log(opt);
        let oldDirName = path.join(opt.dirname, opt.basename + opt.extname);
       
        console.log(oldDirName);
      
        opt.basename = _.replace(_.lowerCase(opt.basename), / /g, "");
        opt.basename = opt.basename.toLowerCase();
        opt.extname = _.toLower(opt.extname);

        let newDirName = path.join(opt.dirname, opt.basename + opt.extname);

        // if false -> delete the old one
        if (oldDirName !== newDirName) {
          const deletedFilePaths = del(path.join("src", oldDirName)).then(
            (paths) => {
              console.log("Deleted files:\n", paths.join("\n"));
            }
          );
        }
        return opt;
      })
    )
    .pipe(dest("src", { overwrite: true }));
  done();
};
